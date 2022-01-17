# Basic

```js chart-editor
// <block:setup:5>
const DATA_COUNT = 8;
const MIN = 10;
const MAX = 100;

Utils.srand(5);

const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push('' + i);
}

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: labels,
  datasets: [{
    data: Utils.numbers(numberCfg)
  }, {
    data: Utils.numbers(numberCfg)
  }, {
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'polygon',
  backgroundColor: 'rgba(0, 255, 255, 0.4)',
  borderColor: 'black',
  borderWidth: 3,
  radius: 25,
  scaleID: 'y',
  xValue: (ctx) => value(ctx, 0, 2, 'x'),
  yValue: (ctx) => value(ctx, 0, 2, 'y')
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'polygon',
  backgroundColor: 'transparent',
  borderColor: 'red',
  borderWidth: 5,
  radius: 25,
  scaleID: 'y',
  sides: 5,
  xValue: (ctx) => value(ctx, 1, 4, 'x'),
  yValue: (ctx) => value(ctx, 1, 4, 'y')
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'polygon',
  backgroundColor: 'transparent',
  borderColor: 'gray',
  borderWidth: 3,
  radius: 30,
  sides: 8,
  scaleID: 'y',
  xValue: (ctx) => value(ctx, 1, 6, 'x'),
  yValue: (ctx) => value(ctx, 1, 6, 'y')
};
// </block:annotation3>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
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
function value(ctx, datasetIndex, index, prop) {
  const meta = ctx.chart.getDatasetMeta(datasetIndex);
  const parsed = meta.controller.getParsed(index);
  return parsed ? parsed[prop] : NaN;
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
  },
  {
    name: 'Add data',
    handler: function(chart) {
      chart.data.labels.push(chart.data.labels.length);
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.push(Utils.rand(MIN, MAX));
      });
      chart.update();
    }
  },
  {
    name: 'Remove data',
    handler: function(chart) {
      chart.data.labels.shift();
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.shift();
      });
      chart.update();
    }
  },
  {
    name: 'Add a side to annotation 1',
    handler: function(chart) {
      chart.options.plugins.annotation.annotations.annotation1.sides++;
      chart.update();
    }
  },
  {
    name: 'Remove a side from annotation 1',
    handler: function(chart) {
      chart.options.plugins.annotation.annotations.annotation1.sides--;
      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config
};
```
