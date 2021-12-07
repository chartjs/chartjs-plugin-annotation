# Basic

```js chart-editor
// <block:setup:4>
const DATA_COUNT = 12;
const MIN = 0;
const MAX = 100;

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: Utils.numbers(numberCfg),
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'label',
  backgroundColor: 'rgba(245,245,245)',
  borderWidth: 1,
  borderRadius: 6,
  xValue: 'March',
  yValue: (ctx) => yValue(ctx, 'March'),
  content: 'March is annotated',
  position: {
    x: 'center',
    y: 'end'
  },
  font: {
    size: 16
  }
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'label',
  backgroundColor: 'rgba(245,245,245)',
  borderWidth: 1,
  borderRadius: 6,
  xValue: 'June',
  yValue: (ctx) => yValue(ctx, 'June'),
  content: 'June is annotated',
  position: {
    x: 'center',
    y: 'end'
  },
  font: {
    size: 16
  }
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'label',
  backgroundColor: 'rgba(245,245,245)',
  borderWidth: 1,
  borderRadius: 6,
  xValue: 'October',
  yValue: (ctx) => yValue(ctx, 'October'),
  content: 'October is annotated',
  position: {
    x: 'center',
    y: 'end'
  },
  font: {
    size: 16
  }
};
// </block:annotation3>

/* <block:config:0> */
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      x: {
        beginAtZero: true,
        min: 0,
        max: 120
      },
      y: {
        beginAtZero: true,
        min: 0,
        max: 120
      }
    },
    plugins: {
      annotation: {
        animation: false,
        annotations: {
          annotation1,
          annotation2,
          annotation3
        }
      }
    },
  }
};
/* </block:config> */

// <block:utils:5>
function yValue(ctx, label) {
  const chart = ctx.chart;
  const dataset = chart.data.datasets[0];
  return dataset.data[chart.data.labels.indexOf(label)];
}
// </block:utils>

var actions = [
  {
    name: 'Randomize',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));
      });

      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config,
};
```
