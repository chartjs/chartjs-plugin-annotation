# Label visibility

```js chart-editor
// <block:setup:2>
const DATA_COUNT = 8;
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

// <block:annotation:1>
const annotation = {
  type: 'line',
  borderColor: 'lightGreen',
  borderDashOffset: 0,
  borderWidth: 10,
  drawTime: 'beforeDatasetsDraw',
  label: {
    enabled: false,
    backgroundColor: 'green',
    borderWidth: 0,
    drawTime: 'afterDatasetsDraw',
    color: 'white',
    content: (ctx) => ['Average of dataset', 'is: ' + average(ctx).toFixed(3)],
    textAlign: 'center'
  },
  scaleID: 'y',
  value: (ctx) => average(ctx),
  enter(ctx, event) {
    toggleLabel(ctx, event);
  },
  leave(ctx, event) {
    toggleLabel(ctx, event);
  }
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    plugins: {
      tooltip: {
        enabled: false,
      },
      annotation: {
        annotations: {
          annotation
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:3>
function average(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function toggleLabel(ctx, event) {
  const oneThirdWidth = ctx.element.width / 3;
  const chart = ctx.chart;
  const annotationOpts = chart.options.plugins.annotation.annotations.annotation;
  annotationOpts.label.enabled = !annotationOpts.label.enabled;
  annotationOpts.label.position = (event.x / ctx.chart.chartArea.width * 100) + '%';
  chart.update();
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
