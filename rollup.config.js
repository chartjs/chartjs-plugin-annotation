import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import chartjs from 'rollup-plugin-chartjs-globals';
import {name, version, homepage, main} from './package.json';

const banner = `/*!
* ${name} v${version}
* ${homepage}
 * (c) ${(new Date(process.env.SOURCE_DATE_EPOCH ? (process.env.SOURCE_DATE_EPOCH * 1000) : new Date().getTime())).getFullYear()} Chart.js Contributors
 * Released under the MIT License
 */`;

const input = 'src/index.js';
const inputESM = 'src/index.esm.js';

export default [
	{
		input,
		plugins: [
			resolve(),
			chartjs()
		],
		output: {
			name,
			file: main,
			banner,
			format: 'umd',
			indent: false
		},
		external: [
			'chart.js'
		]
	},
	{
		input,
		plugins: [
			resolve(),
			chartjs(),
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
			sourcemap: true,
			indent: false
		},
		external: [
			'chart.js'
		]
	},
	{
		input: inputESM,
		plugins: [
			resolve()
		],
		output: {
			name,
			file: main.replace('.js', '.esm.js'),
			banner,
			format: 'esm',
			indent: false
		},
		external: [
			'chart.js'
		]
	},
];
