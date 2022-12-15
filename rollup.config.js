import {readFileSync} from 'fs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

const {name, version, homepage, main, module, jsdelivr, license} = JSON.parse(readFileSync('./package.json'));

const banner = `/*!
* ${name} v${version}
* ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} chartjs-plugin-annotation Contributors
 * Released under the ${license} license
 */`;

const input = 'src/index.js';
const inputESM = 'src/index.esm.js';
const external = [
  'chart.js',
  'chart.js/helpers'
];
const globals = {
  'chart.js': 'Chart',
  'chart.js/helpers': 'Chart.helpers'
};

export default [
  // UMD
  {
    input,
    plugins: [
      json(),
      resolve(),
    ],
    output: {
      name,
      file: main,
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  // UMD min
  {
    input,
    plugins: [
      json(),
      resolve(),
      terser({
        output: {
          preamble: banner
        }
      })
    ],
    output: {
      name,
      file: jsdelivr,
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
  // ESM
  {
    input: inputESM,
    plugins: [
      json(),
      resolve()
    ],
    output: {
      name,
      file: module,
      banner,
      format: 'esm',
      indent: false
    },
    external
  },
];
