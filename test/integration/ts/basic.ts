import { Chart } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';

Chart.register(Annotation);

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
        annotations: [{
          type: 'line',
          label: {
            content: ['test', 'multiple'],
            width: '100%'
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
