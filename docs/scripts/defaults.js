import {defaults} from 'chart.js';

defaults.set({
  elements: {
    line: {
      tension: 0.4
    }
  },
  plugins: {
    legend: false
  },
});
