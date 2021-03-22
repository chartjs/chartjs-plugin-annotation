import {defaults} from 'chart.js';

defaults.set({
  elements: {
    line: {
      tension: 0.4
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  },
  plugins: {
    legend: false
  },
});
