# Point

```js chart-editor
// <block:setup:4>
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
    data: Utils.numbers(numberCfg),
  }, {
    data: Utils.numbers(numberCfg),
  }, {
    data: Utils.numbers(numberCfg),
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'point',
  scaleID: 'y',
  borderWidth: 3,
  borderColor: 'black',
  backgroundColor: 'rgba(0,255,255,0.4)',
  xValue: (ctx) => value(ctx, 0, 2, 'x'),
  yValue: (ctx) => value(ctx, 0, 2, 'y')
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'point',
  scaleID: 'y',
  borderWidth: 5,
  borderColor: 'red',
  backgroundColor: 'transparent',
  radius: 25,
  xValue: (ctx) => value(ctx, 1, 4, 'x'),
  yValue: (ctx) => value(ctx, 1, 4, 'y')
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1,
          annotation2
        }
      }
    },
  }
};
/* </block:config> */

// <block:utils:3>
function value(ctx, datasetIndex, index, prop) {
  const meta = ctx.chart.getDatasetMeta(datasetIndex);
  const parsed = meta.controller.getParsed(index);
  return parsed ? parsed[prop] : NaN;
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
  }
];

module.exports = {
  actions: actions,
  config: config
};
```
