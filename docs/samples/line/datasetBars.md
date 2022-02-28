# Annotating dataset bars

```js chart-editor
// <block:setup:6>
const DATA_COUNT = 4;
const MIN = 20;
const MAX = 100;

Utils.srand(8);

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [{
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'line',
  borderColor: 'green',
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'green',
    borderRadius: 0,
    color: 'white',
    content: (ctx) => middleValue(ctx, 0, 0.5).toFixed(0)
  },
  xMax: indexToMax(0) + 0.05,
  xMin: indexToMin(0) - 0.05,
  xScaleID: 'x',
  yMax: (ctx) => middleValue(ctx, 0, 0.5),
  yMin: (ctx) => middleValue(ctx, 0, 0.5),
  yScaleID: 'y'
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'line',
  borderColor: 'green',
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'green',
    borderRadius: 0,
    color: 'white',
    content: (ctx) => middleValue(ctx, 1, 0.75).toFixed(0)
  },
  xMax: indexToMax(1) + 0.05,
  xMin: indexToMin(1) - 0.05,
  xScaleID: 'x',
  yMax: (ctx) => middleValue(ctx, 1, 0.75),
  yMin: (ctx) => middleValue(ctx, 1, 0.75),
  yScaleID: 'y'
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'line',
  borderColor: 'green',
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'green',
    borderRadius: 0,
    color: 'white',
    content: (ctx) => middleValue(ctx, 2, 1).toFixed(0)
  },
  xMax: indexToMax(2) + 0.05,
  xMin: indexToMin(2) - 0.05,
  xScaleID: 'x',
  yMax: (ctx) => middleValue(ctx, 2, 1),
  yMin: (ctx) => middleValue(ctx, 2, 1),
  yScaleID: 'y'
};
// </block:annotation3>

// <block:annotation4:4>
const annotation4 = {
  type: 'line',
  borderColor: 'green',
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'green',
    borderRadius: 0,
    color: 'white',
    content: (ctx) => middleValue(ctx, 3, 0.25).toFixed(0)
  },
  xMax: indexToMax(3) + 0.05,
  xMin: indexToMin(3) - 0.05,
  xScaleID: 'x',
  yMax: (ctx) => middleValue(ctx, 3, 0.25),
  yMin: (ctx) => middleValue(ctx, 3, 0.25),
  yScaleID: 'y'
};
// </block:annotation4>

/* <block:config:0> */
const config = {
  type: 'bar',
  data,
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1,
          annotation2,
          annotation3,
          annotation4
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:5>
// categoryPercentage is 0.8 by default
// barPercentage is 0.9 by default
// 1 * 0.8 * 0.9 = 0.72
// 0.72 / 2 = 0.36

function indexToMin(index) {
  return index - 0.36;
}

function indexToMax(index) {
  return index + 0.36;
}

function middleValue(ctx, index, perc) {
  const chart = ctx.chart;
  const dataset = chart.data.datasets[0];
  return dataset.data[index] * perc;
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
