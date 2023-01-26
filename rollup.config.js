import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import {readFileSync} from 'fs';

const {name, version, homepage, main, license, jsdelivr} = JSON.parse(readFileSync('./package.json'));

const banner = `/*!
* ${name} v${version}
* ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} chartjs-plugin-annotation Contributors
 * Released under the ${license} License
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
  {
    input,
    plugins: [
      json(),
      resolve(),
    ],
    output: {
      name,
      file: main.replace('.esm.js', '.js'),
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    external
  },
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
  {
    input: inputESM,
    plugins: [
      json(),
      resolve()
    ],
    output: {
      name,
      file: main,
      banner,
      format: 'esm',
      indent: false
    },
    external
  },
];
