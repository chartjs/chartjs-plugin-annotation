const json = require('@rollup/plugin-json');
const resolve = require('@rollup/plugin-node-resolve').default;
const terser = require('@rollup/plugin-terser').default;
const {name, version, homepage, main, module: _module} = require('./package.json');

const banner = `/*!
* ${name} v${version}
* ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} chartjs-plugin-annotation Contributors
 * Released under the MIT License
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

module.exports = [
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
      file: main.replace('.js', '.min.js'),
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
      file: _module,
      banner,
      format: 'esm',
      indent: false
    },
    external
  },
];
