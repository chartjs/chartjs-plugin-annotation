# Shadow

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
  borderColor: 'rgb(0, 150, 0)',
  borderRadius: {
    topLeft: 4,
    topRight: 4,
    bottomLeft: 4,
    bottomRight: 4
  },
  borderWidth: 1,
  xMax: (ctx) => max(ctx, 0, 'x') + 2,
  xMin: (ctx) => min(ctx, 0, 'x') - 2,
  yMax: (ctx) => max(ctx, 0, 'y') + 2,
  yMin: (ctx) => min(ctx, 0, 'y') - 2,
  beforeDraw: (ctx) => drawShadow(ctx)
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'box',
  backgroundColor: 'rgba(150, 0, 0, 0.02)',
  borderColor: 'rgb(150, 0, 0)',
  borderRadius: {
    topLeft: 4,
    topRight: 4,
    bottomLeft: 4,
    bottomRight: 4
  },
  borderWidth: 1,
  xMax: (ctx) => max(ctx, 1, 'x') + 2,
  xMin: (ctx) => min(ctx, 1, 'x') - 2,
  yMax: (ctx) => max(ctx, 1, 'y') + 2,
  yMin: (ctx) => min(ctx, 1, 'y') - 2,
  beforeDraw: (ctx) => drawShadow(ctx)
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
const PI = Math.PI;
const HALF_PI = PI / 2;

function min(ctx, datasetIndex, prop) {
  const dataset = ctx.chart.data.datasets[datasetIndex];
  return dataset.data.reduce((v, point) => Math.min(point[prop], v), Infinity);
}

function max(ctx, datasetIndex, prop) {
  const dataset = ctx.chart.data.datasets[datasetIndex];
  return dataset.data.reduce((v, point) => Math.max(point[prop], v), -Infinity);
}

function drawShadow(context) {
  const ctx = context.chart.ctx;
  const {x, y, width, height, options} = context.element;
  ctx.save();
  ctx.fillStyle = 'transparent';
  ctx.strokeStyle = options.borderColor;
  ctx.beginPath();
  Utils.addRoundedRect(ctx, {
    x, y, w: width, h: height,
    radius: options.borderRadius
  });
  ctx.closePath();
  ctx.fill();
  ctx.globalCompositeOperation = 'destination-over';
  ctx.shadowColor = options.borderColor;
  ctx.shadowBlur = 9;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = -5;
  ctx.stroke();
  ctx.restore();
  return true;
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
