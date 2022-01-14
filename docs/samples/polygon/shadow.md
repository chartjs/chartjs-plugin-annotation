# Shadow

```js chart-editor
// <block:setup:7>
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
  backgroundColor: 'white',
  backgroundShadowColor: 'black',
  borderColor: 'red',
  borderJoinStyle: 'round',
  borderWidth: 7,
  radius: 40,
  rotation: 180,
  shadowBlur: 3,
  shadowOffsetX: 3,
  shadowOffsetY: 10,
  xValue: (ctx) => value(ctx, 0, 2, 'x'),
  yValue: (ctx) => value(ctx, 0, 2, 'y')
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'polygon',
  backgroundColor: 'white',
  backgroundShadowColor: 'black',
  borderColor: 'red',
  borderJoinStyle: 'round',
  borderWidth: 7,
  radius: 40,
  shadowBlur: 3,
  shadowOffsetX: 3,
  shadowOffsetY: 10,
  xValue: (ctx) => value(ctx, 0, 4, 'x'),
  yValue: (ctx) => value(ctx, 0, 4, 'y')
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'label',
  color: 'black',
  content: '!',
  font: {
    size: 40,
    family: 'Arial',
    weight: 'bold'
  },
  xValue: (ctx) => value(ctx, 0, 4, 'x'),
  yValue: (ctx) => value(ctx, 0, 4, 'y')
};
// </block:annotation3>

// <block:annotation4:4>
const annotation4 = {
  type: 'polygon',
  backgroundColor: 'red',
  backgroundShadowColor: 'black',
  borderColor: 'white',
  borderWidth: 4,
  radius: 40,
  rotation: 22.5,
  shadowBlur: 3,
  shadowOffsetX: 3,
  shadowOffsetY: 10,
  sides: 8,
  xValue: (ctx) => value(ctx, 0, 6, 'x'),
  yValue: (ctx) => value(ctx, 0, 6, 'y')
};
// </block:annotation4>

// <block:annotation5:5>
const annotation5 = {
  type: 'label',
  color: 'white',
  content: 'STOP',
  font: {
    size: 24
  },
  xValue: (ctx) => value(ctx, 0, 6, 'x'),
  yValue: (ctx) => value(ctx, 0, 6, 'y')
};
// </block:annotation5>

/* <block:config:0> */
const config = {
  type: 'line',
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
          annotation3,
          annotation4,
          annotation5
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:6>
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
  }
];

module.exports = {
  actions: actions,
  config: config
};
```
