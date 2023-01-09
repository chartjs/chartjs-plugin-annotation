# Basic

```js chart-editor
// <block:setup:5>
const DATA_COUNT = 12;
const MIN = 0;
const MAX = 100;

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'label',
  borderColor: (ctx) => ctx.chart.data.datasets[0].backgroundColor,
  borderRadius: 6,
  borderWidth: 1,
  content: ['March', 'annotated'],
  position: {
    x: 'center',
    y: 'end'
  },
  xValue: 'March',
  yValue: (ctx) => yValue(ctx, 'March')
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'label',
  borderColor: (ctx) => ctx.chart.data.datasets[0].backgroundColor,
  borderRadius: 6,
  borderWidth: 1,
  content: ['June', 'annotated'],
  position: {
    x: 'center',
    y: 'end'
  },
  xValue: 'June',
  yValue: (ctx) => yValue(ctx, 'June')
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'label',
  borderColor: (ctx) => ctx.chart.data.datasets[0].backgroundColor,
  borderRadius: 6,
  borderWidth: 1,
  content: ['October', 'annotated'],
  position: {
    x: 'center',
    y: 'end'
  },
  xValue: 'October',
  yValue: (ctx) => yValue(ctx, 'October')
};
// </block:annotation3>

/* <block:config:0> */
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        min: 0
      }
    },
    plugins: {
      annotation: {
        annotations: {
          annotation1,
          annotation2,
          annotation3
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:4>
function yValue(ctx, label) {
  const chart = ctx.chart;
  const dataset = chart.data.datasets[0];
  return dataset.data[chart.data.labels.indexOf(label)];
}
// </block:utils>

const actions = [
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
