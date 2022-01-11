# Point

```js chart-editor
// <block:setup:4>
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
  backgroundColor: 'rgba(245, 245, 245, 0.5)',
  content: (ctx) => 'Maximum value is ' + maxValue(ctx).toFixed(2),
  font: {
    size: 16
  },
  padding: {
    top: 6,
    left: 6,
    right: 6,
    bottom: 12
  },
  position: {
    x: (ctx) => maxIndex(ctx) <= 3 ? 'start' : maxIndex(ctx) >= 10 ? 'end' : 'center',
    y: 'end'
  },
  xValue: (ctx) => maxLabel(ctx),
  yAdjust: -6,
  yValue: (ctx) => maxValue(ctx)
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'point',
  backgroundColor: 'transparent',
  borderColor: (ctx) => ctx.chart.data.datasets[0].borderColor,
  pointStyle: 'rectRounded',
  radius: 10,
  xValue: (ctx) => maxLabel(ctx),
  yValue: (ctx) => maxValue(ctx)
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    layout: {
      padding: {
        right: 10
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 120,
        min: 0
      }
    },
    plugins: {
      annotation: {
        clip: false,
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
function maxValue(ctx) {
  let max = 0;
  const dataset = ctx.chart.data.datasets[0];
  dataset.data.forEach(function(el) {
    max = Math.max(max, el);
  });
  return max;
}

function maxIndex(ctx) {
  const max = maxValue(ctx);
  const dataset = ctx.chart.data.datasets[0];
  return dataset.data.indexOf(max);
}

function maxLabel(ctx) {
  return ctx.chart.data.labels[maxIndex(ctx)];
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
