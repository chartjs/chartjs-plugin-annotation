# Label visibility

```js chart-editor
// <block:setup:4>
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

// <block:annotation1:1>
const annotation1 = {
  type: 'line',
  borderColor: 'lightGreen',
  borderWidth: 10,
  label: {
    display: false,
    backgroundColor: 'green',
    drawTime: 'afterDatasetsDraw',
    content: (ctx) => ['Average of dataset', 'is: ' + average(ctx).toFixed(3)]
  },
  scaleID: 'y',
  value: (ctx) => average(ctx),
  // For simple property changes, you can directly modify the annotation
  // element's properties then return true to force chart re-drawing.  This is faster.
  enter({element}, event) {
    element.label.options.display = true;
    return true;
  },
  leave({element}, event) {
    element.label.options.display = false;
    return true;
  }
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'line',
  borderColor: 'lightBlue',
  borderWidth: 10,
  label: {
    display: (ctx) => ctx.hovered,
    backgroundColor: 'blue',
    drawTime: 'afterDatasetsDraw',
    content: (ctx) => ['Min of dataset', 'is: ' + min(ctx).toFixed(3)],
    position: (ctx) => ctx.hoverPosition
  },
  scaleID: 'y',
  value: (ctx) => min(ctx),
  // For more complex dynamic properties, you can store values on the persistent
  // context object then retrieve them via scriptable properties.  You'll have
  // to call chart.update() to reprocess the chart.
  enter(ctx, event) {
    ctx.hovered = true;
    ctx.hoverPosition = (event.x / ctx.chart.chartArea.width * 100) + '%';
    ctx.chart.update();
  },
  leave(ctx, event) {
    ctx.hovered = false;
    ctx.chart.update();
  }
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    plugins: {
      tooltip: {
        display: false,
      },
      annotation: {
        common: {
          drawTime: 'beforeDatasetsDraw'
        },
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
function average(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function min(ctx) {
  const values = ctx.chart.data.datasets[0].data;
  return values.reduce((a, b) => Math.min(a, b), Infinity);
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
