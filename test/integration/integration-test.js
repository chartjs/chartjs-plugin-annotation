'use strict';

const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const childProcess = require('child_process');

const {describe, it} = require('mocha');

const npmVersionRegExp = new RegExp('^.*([0-9]+).([0-9]+).([0-9]+)$');
const npmMajorVersion = (version) => npmVersionRegExp.exec(version)[1];

function exec(command, options = {}) {
  const output = childProcess.execSync(command, {
    encoding: 'utf-8',
    ...options,
  });
  return output && output.trimEnd();
}

function getChartJsVersions(projectPath) {
  const mainPackageJSONPath = path.join(projectPath, 'package.json');
  const mainPackageJSON = JSON.parse(fs.readFileSync(mainPackageJSONPath, 'utf-8'));
  const dev = npmMajorVersion(mainPackageJSON.devDependencies['chart.js']);
  const peer = npmMajorVersion(mainPackageJSON.peerDependencies['chart.js']);
  const result = [];
  for (let i = peer; i <= dev; i++) {
    result.push(i + '.x.x');
  }
  return result;
}

describe('Integration Tests', () => {
  const distDir = path.resolve('./');
  const chartjsVersions = getChartJsVersions(distDir);
  const baseTmpDir = path.join(os.tmpdir(), 'chartjs-plugin-annotation-tmp');
  fs.rmSync(baseTmpDir, {recursive: true, force: true});
  fs.mkdirSync(baseTmpDir);

  chartjsVersions.forEach(function(chartjs) {
    const tmpDir = path.join(baseTmpDir, chartjs);
    fs.mkdirSync(tmpDir);

    const archiveName = exec(`npm --quiet pack ${distDir}`, {cwd: tmpDir});
    fs.renameSync(
      path.join(tmpDir, archiveName),
      path.join(tmpDir, 'plugin.tgz'),
    );

    function testOnNodeProject(projectName) {
      const projectPath = path.join(__dirname, projectName);

      const packageJSONPath = path.join(projectPath, 'package.json');
      const packageJSON = JSON.parse(fs.readFileSync(packageJSONPath, 'utf-8'));
      packageJSON.dependencies['chart.js'] = chartjs;

      const cwd = path.join(tmpDir, projectName);
      const distPackageJSONFile = path.join(cwd, 'package.json');
      fs.copySync(projectPath, cwd);
      fs.outputJson(distPackageJSONFile, packageJSON, {spaces: 2, encoding: 'utf-8'});

      it(`${packageJSON.description} on Chart.js version ${chartjs}`, () => {
        exec('npm --quiet install', {cwd, stdio: 'inherit'});
        exec('npm --quiet test', {cwd, stdio: 'inherit'});
      }).timeout(5 * 60 * 1000);

    }

    testOnNodeProject('ts');
  });
});
