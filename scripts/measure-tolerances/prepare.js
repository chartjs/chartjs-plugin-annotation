// Forces every fixture to `tolerance: 0` so each one reports its real pixel
// delta instead of just pass/fail, and relaxes karma's timeouts because an
// emulated Chrome is far slower than the 2 minute default allows.
//
// Destructive: only run directly inside the container, which works on a throwaway
// copy. measure.js imports the helpers and handles restoring the host checkout.
import fs from 'fs';
import path from 'path';
import {pathToFileURL} from 'url';

export function fixtureFiles(dir = 'test/fixtures') {
  return fs.readdirSync(dir, {withFileTypes: true}).flatMap(e => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? fixtureFiles(p) : (e.name.endsWith('.js') ? [p] : []);
  });
}

export function readTolerance(file) {
  const m = fs.readFileSync(file, 'utf-8').match(/^ {2}tolerance: ([\d.]+),$/m);
  return m ? parseFloat(m[1]) : 0.001; // chartjs-test-utils default
}

export function writeTolerance(file, value) {
  const src = fs.readFileSync(file, 'utf-8');
  const line = `  tolerance: ${String(value)},`;
  fs.writeFileSync(file, /^ {2}tolerance: [\d.]+,$/m.test(src)
    ? src.replace(/^ {2}tolerance: [\d.]+,$/m, line)
    : src.replace(/^module\.exports = \{$/m, `module.exports = {\n${line}`));
}

export function forceZeroTolerance() {
  fixtureFiles().forEach(file => writeTolerance(file, 0));
}

export function relaxKarmaTimeouts() {
  const conf = 'karma.conf.cjs';
  fs.writeFileSync(conf, fs.readFileSync(conf, 'utf-8')
    .replace(/browserNoActivityTimeout: \d+/, 'browserNoActivityTimeout: 3600000')
    .replace(/browserDisconnectTimeout: \d+/, 'browserDisconnectTimeout: 3600000')
    .replace(/captureTimeout: \d+/, 'captureTimeout: 3600000')
    // Chrome's sandbox needs user namespaces the container does not grant.
    // Verified not to affect rendering: with it, doughnutLabel/contentMultiline
    // still measures the 919px observed in CI.
    .replace("'--disable-accelerated-2d-canvas'", "'--disable-accelerated-2d-canvas', '--no-sandbox'"));
}

// Self-executes only when run as a script, never when imported.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  forceZeroTolerance();
  relaxKarmaTimeouts();
}
