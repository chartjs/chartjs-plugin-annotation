import {defaults} from 'chart.js';

defaults.set({
  elements: {
    line: {
      tension: 0.4
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'xy',
    intersect: true
  },
  plugins: {
    legend: false
  },
});
