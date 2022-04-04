import { Chart } from 'chart.js';
import Annotation from '../index';

Chart.register(Annotation);
Chart.unregister(Annotation);

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
        clip: false,
        interaction: {
          mode: 'nearest',
          axis: 'xy',
          intersect: true
        },
        annotations: [{
          type: 'line',
          label: {
            content: ['test', 'multiple']
          }
        }, {
          type: 'box',
          backgroundColor: 'red',
          borderColor: (ctx, options) => options.type === 'box' ? 'red' : 'green',
        }
        ]
      }
    }
  },
  plugins: [Annotation]
});
