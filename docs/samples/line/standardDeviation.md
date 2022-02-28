# Standard deviation

```js chart-editor
// <block:setup:5>
const DATA_COUNT = 16;
const MIN = 10;
const MAX = 100;

Utils.srand(8);

const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push('' + i);
}

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: labels,
  datasets: [{
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'line',
  borderColor: 'rgb(100, 149, 237)',
  borderDash: [6, 6],
  borderDashOffset: 0,
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'rgb(100, 149, 237)',
    content: (ctx) => 'Average: ' + average(ctx).toFixed(2)
  },
  scaleID: 'y',
  value: (ctx) => average(ctx)
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'line',
  borderColor: 'rgba(102, 102, 102, 0.5)',
  borderDash: [6, 6],
  borderDashOffset: 0,
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'rgba(102, 102, 102, 0.5)',
    color: 'black',
    content: (ctx) => (average(ctx) + standardDeviation(ctx)).toFixed(2),
    position: 'start',
    rotation: -90,
    yAdjust: -28
  },
  scaleID: 'y',
  value: (ctx) => average(ctx) + standardDeviation(ctx)
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'line',
  borderColor: 'rgba(102, 102, 102, 0.5)',
  borderDash: [6, 6],
  borderDashOffset: 0,
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'rgba(102, 102, 102, 0.5)',
    color: 'black',
    content: (ctx) => (average(ctx) - standardDeviation(ctx)).toFixed(2),
    position: 'end',
    rotation: 90,
    yAdjust: 28
  },
  scaleID: 'y',
  value: (ctx) => average(ctx) - standardDeviation(ctx)
};
// </block:annotation3>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scale: {
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
function average(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function standardDeviation(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  const n = values.length;
  const mean = average(ctx);
  return Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
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
  config: config,
};
```
