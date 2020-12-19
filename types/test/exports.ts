import { Chart } from 'chart.js';
import Plugin from '../index';

Chart.register(Plugin);
Chart.unregister(Plugin);

const chart = new Chart('id', {
	type: 'bar',
	data: {
		labels: [],
		datasets: [{
			data: []
		}]
	},
	options: {
		plugins: {
			annotation: {
				annotations: [{
					type: 'line',
					label: {
						content: ['test', 'multiple']
					}
				}, {
					type: 'box',
					backgroundColor: 'red'
				}
				]
			}
		}
	},
	plugins: [Plugin]
});
