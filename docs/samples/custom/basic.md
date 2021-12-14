# Basic

```js chart-editor
// <block:setup:4>
const DATA_COUNT = 80;
const MIN = 0;
const MAX = 100;

Utils.srand(8);

const data = {
  datasets: [{
    data: Utils.points({count: DATA_COUNT, min: MIN, max: MAX}),
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'custom',
  customOptions: ['myColor'],
  myColor: () => 'rgba(255,0,0,0.8)',
  yMin: 56,
  yMax: 56,
  draw(ctx, annotation, chart) {
    ctx.setLineDash([2, 4]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = annotation.options.myColor;
    ctx.beginPath();
    ctx.moveTo(0, annotation.y);
    ctx.lineTo(chart.chartArea.right, annotation.y);
    ctx.stroke();
  }
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'custom',
  xMin: 20,
  xMax: 80,
  yMin: 20,
  yMax: 80,
  draw(ctx, annotation, chart) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'orange';
    ctx.strokeRect(annotation.x, annotation.y, annotation.width, annotation.height);
  }
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'scatter',
  data,
  options: {
    plugins: {
      annotation: {
        clip: false,
        annotations: {
          annotation1,
          annotation2
        }
      }
    },
  }
};
/* </block:config> */

module.exports = {
  config: config,
};
```
