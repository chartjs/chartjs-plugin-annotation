# Basic

```js chart-editor
// <block:setup:4>
const DATA_COUNT = 8;
const MIN = [0, 50];
const MAX = [50, 100];

Utils.srand(8);

const data = {
  datasets: [{
    data: Utils.points({count: DATA_COUNT, min: MIN[0], max: MAX[0]})
  }, {
    data: Utils.points({count: DATA_COUNT, min: MIN[1], max: MAX[1]})
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'box',
  backgroundColor: 'rgba(0, 150, 0, 0.02)',
  borderColor: 'rgba(0, 150, 0, 0.2)',
  borderRadius: 4,
  borderWidth: 1,
  xMax: (ctx) => max(ctx, 0, 'x') + 2,
  xMin: (ctx) => min(ctx, 0, 'x') - 2,
  yMax: (ctx) => max(ctx, 0, 'y') + 2,
  yMin: (ctx) => min(ctx, 0, 'y') - 2
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'box',
  backgroundColor: 'rgba(150, 0, 0, 0.02)',
  borderColor: 'rgba(150, 0, 0, 0.2)',
  borderRadius: 4,
  borderWidth: 1,
  xMax: (ctx) => max(ctx, 1, 'x') + 2,
  xMin: (ctx) => min(ctx, 1, 'x') - 2,
  yMax: (ctx) => max(ctx, 1, 'y') + 2,
  yMin: (ctx) => min(ctx, 1, 'y') - 2
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'scatter',
  data,
  options: {
    plugins: {
      annotation: {
        annotations: {
          annotation1,
          annotation2
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:3>
function min(ctx, datasetIndex, prop) {
  const dataset = ctx.chart.data.datasets[datasetIndex];
  return dataset.data.reduce((v, point) => Math.min(point[prop], v), Infinity);
}

function max(ctx, datasetIndex, prop) {
  const dataset = ctx.chart.data.datasets[datasetIndex];
  return dataset.data.reduce((v, point) => Math.max(point[prop], v), -Infinity);
}

// </block:utils>

const actions = [
  {
    name: 'Randomize',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.forEach(p => {
          p.x = Utils.rand(MIN[i], MAX[i]);
          p.y = Utils.rand(MIN[i], MAX[i]);
        });
      });
      chart.update();
    }
  },
  {
    name: 'Add data',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.push({x: Utils.rand(MIN[i], MAX[i]), y: Utils.rand(MIN[i], MAX[i])});
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
  config: config,
};
```
