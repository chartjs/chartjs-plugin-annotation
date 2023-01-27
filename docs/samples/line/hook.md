# Outside of chart

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
  borderColor: 'black',
  borderWidth: 3,
  scaleID: 'y',
  value: 55,
  beforeDraw: drawExtraLine
};
// </block:annotation>

// <block:utils:3>
function drawExtraLine(context) {
  const ctx = context.chart.ctx;
  const width = context.chart.canvas.width;
  const {x, y, x2, y2, options} = context.element;
  ctx.save();
  ctx.lineWidth = options.borderWidth;
  ctx.strokeStyle = options.borderColor;
  ctx.setLineDash([6, 6]);
  ctx.lineDashOffset = options.borderDashOffset;
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(x, y);
  ctx.moveTo(x2, y2);
  ctx.lineTo(width, y);
  ctx.stroke();
  ctx.restore();
  return true;
}
// </block:utils>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    layout: {
      padding: {
        right: 50
      }
    },
    scales: {
      y: {
        stacked: true
      }
    },
    plugins: {
      annotation: {
        clip: false,
        annotations: {
          annotation
        }
      }
    }
  }
};
/* </block:config> */

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
