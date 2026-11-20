// Measures every fixture's real pixel delta in each environment that matters,
// then derives tolerances from those measurements instead of guessing margins.
//
//   npm run measure-tolerances           report only
//   npm run measure-tolerances -- --apply   also write the derived tolerances
//
// Environments: the host's Chrome and Firefox, plus Linux Chrome and Firefox in
// a container reproducing the CI image. See README.md next to this file.
import fs from 'fs';
import {execFileSync} from 'child_process';
import path from 'path';
import {fileURLToPath} from 'url';
import {fixtureFiles, readTolerance, writeTolerance, forceZeroTolerance} from './prepare.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const IMAGE = 'chartjs-annotation-ci';
const REPORT = 'tolerances.report.json';

// CI is the gate, so Linux gets a real margin. macOS renders text 3-4x further
// from the reference than Linux does; giving it the same margin is what made
// tolerances loose, so it gets only enough to keep local runs green.
const LINUX_MARGIN = 1.5;
const HOST_MARGIN = 1.05;
// A fixture that is pixel-perfect everywhere asserts exactly that.
const ZERO_STAYS_ZERO = true;

const ceil = v => Math.ceil(v * 20000) / 20000;
const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, {encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024, ...opts});

function pixelCount(fixture) {
  const buf = fs.readFileSync(`${fixture.replace(/\.js$/, '')}.png`);
  return buf.readUInt32BE(16) * buf.readUInt32BE(20); // IHDR width * height
}

// karma prints `<Browser> ... /base/test/fixtures/<name>.js FAILED` and then
// `Difference: <n>px`, so deltas are read back from its output.
function parseDeltas(output) {
  const deltas = {};
  let fixture = null;
  for (const line of output.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '').split('\n')) {
    const failed = line.match(/\/base\/(test\/fixtures\/.+?\.js) FAILED/);
    if (failed) {
      fixture = failed[1];
      continue;
    }
    const diff = line.match(/Difference: (\d+)px/);
    if (diff && fixture) {
      deltas[fixture] = Math.max(deltas[fixture] || 0, Number(diff[1]));
      fixture = null;
    }
  }
  return deltas;
}

function assertFixturesClean() {
  if (run('git', ['status', '--porcelain', 'test/fixtures']).trim()) {
    throw new Error('test/fixtures has uncommitted changes; commit or stash them first ' +
      '(they would be lost when the measured fixtures are restored)');
  }
}

// A run that dies partway (karma DISCONNECTED, a crashed browser) still yields
// deltas for the specs it reached. Deriving tolerances from those would silently
// produce values that are too tight, so incomplete runs are rejected outright.
function assertComplete(output, label) {
  const clean = output.replace(/\x1b\[[0-9;]*[A-Za-z]/g, '');
  if (/DISCONNECTED/.test(clean)) {
    throw new Error(`${label}: browser disconnected, measurement incomplete`);
  }
  const executed = [...clean.matchAll(/Executed (\d+) of (\d+)/g)].pop();
  if (!executed) {
    throw new Error(`${label}: karma reported no specs`);
  }
  if (executed[1] !== executed[2]) {
    throw new Error(`${label}: only ${executed[1]} of ${executed[2]} specs ran`);
  }
}

function measureHost(browsers) {
  console.log(`measuring host (${browsers})...`);
  forceZeroTolerance();
  try {
    const out = run('npx', ['karma', 'start', './karma.conf.cjs',
      '--single-run', '--no-auto-watch', '--browsers', browsers], {stdio: 'pipe'});
    assertComplete(out, 'host');
    return parseDeltas(out);
  } catch (err) {
    // karma exits non-zero because every spec fails at tolerance 0; that is the
    // point of the run, so the deltas still have to be read out of its output.
    if (err.stdout === undefined) {
      throw err;
    }
    const out = String(err.stdout);
    assertComplete(out, 'host');
    return parseDeltas(out);
  } finally {
    run('git', ['checkout', '--', 'test/fixtures']);
  }
}

function measureLinux(browser) {
  console.log(`measuring linux ${browser} in docker (emulated; chrome takes a while)...`);
  const args = ['run', '--rm', '--platform', 'linux/amd64',
    // without this chrome hangs outright rather than running slowly
    '--shm-size=2g',
    '-v', `${process.cwd()}:/src:ro`,
    IMAGE, 'bash', '/src/scripts/measure-tolerances/in-container.sh', browser];
  try {
    return parseDeltas(run('docker', args));
  } catch (err) {
    // karma exits non-zero because every spec fails at tolerance 0; that is the
    // point of the run, so the deltas still have to be read out of its output.
    if (err.stdout === undefined) {
      throw err;
    }
    const out = String(err.stdout);
    assertComplete(out, `linux ${browser}`);
    return parseDeltas(out);
  }
}

function derive(measurements) {
  return fixtureFiles().map(file => {
    const area = pixelCount(file);
    const ratio = env => (measurements[env][file] || 0) / area;
    const linux = Math.max(ratio('linuxChrome'), ratio('linuxFirefox'));
    const host = ratio('host');
    const current = readTolerance(file);
    const proposed = (ZERO_STAYS_ZERO && linux === 0 && host === 0)
      ? 0
      : Math.max(ceil(linux * LINUX_MARGIN), ceil(host * HOST_MARGIN));
    return {file, linux, host, current, proposed};
  });
}

const args = process.argv.slice(2);
const browsers = (args.find(a => a.startsWith('--host-browsers=')) || '').split('=')[1] || 'chrome,firefox';

// Fail fast on a dirty tree before spending an hour in docker.
assertFixturesClean();
run('docker', ['build', '--platform', 'linux/amd64', '-t', IMAGE, HERE], {stdio: 'inherit'});
const measurements = {
  host: measureHost(browsers),
  linuxChrome: measureLinux('chrome'),
  linuxFirefox: measureLinux('firefox')
};

const rows = derive(measurements);
fs.writeFileSync(REPORT, JSON.stringify(rows, null, 2));

const changes = rows.filter(r => r.proposed !== r.current);
const pct = v => (v * 100).toFixed(3) + '%';
console.log(`\n${changes.length} of ${rows.length} fixtures would change:\n`);
for (const r of changes.sort((a, b) => b.proposed - a.proposed)) {
  const dir = r.proposed < r.current ? 'tighter' : 'looser ';
  console.log(`  ${dir} ${r.file.replace('test/fixtures/', '').padEnd(38)} ` +
    `${pct(r.current).padStart(8)} -> ${pct(r.proposed).padStart(8)}  ` +
    `(linux ${pct(r.linux)}, host ${pct(r.host)})`);
}
const budget = rows.reduce((sum, r) => ({
  before: sum.before + r.current * pixelCount(r.file),
  after: sum.after + r.proposed * pixelCount(r.file)
}), {before: 0, after: 0});
console.log(`\ntotal allowed differing pixels: ${Math.round(budget.before).toLocaleString('en')} -> ` +
  `${Math.round(budget.after).toLocaleString('en')}`);
console.log(`report written to ${REPORT}`);

if (args.includes('--apply')) {
  changes.forEach(r => writeTolerance(r.file, r.proposed));
  console.log(`\napplied to ${changes.length} fixtures; run the suite to confirm`);
} else if (changes.length) {
  console.log('\nre-run with --apply to write these values');
}
