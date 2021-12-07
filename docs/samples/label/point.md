# Point

```js chart-editor
// <block:setup:2>
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

// <block:annotation:1>
const annotation = {
  type: 'label',
  backgroundColor: 'rgba(245,245,245, 0.5)',
  xValue: (ctx) => maxLabel(ctx),
  yValue: (ctx) => maxValue(ctx),
  content: (ctx) => 'Maximum value is ' + maxValue(ctx).toFixed(2),
  yAdjust: -6,
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
  font: {
    size: 16
  },
  point: {
    enabled: true,
    borderColor: (ctx) => ctx.chart.data.datasets[0].borderColor,
    backgroundColor: 'transparent',
    radius: 10
  }
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 120
      }
    },
    plugins: {
      annotation: {
        clip: false,
        animation: false,
        annotations: {
          annotation
        }
      }
    },
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
