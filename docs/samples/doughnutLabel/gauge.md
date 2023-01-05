# Single gauge

```js chart-editor
// <block:setup:3>
const COLORS = ['rgb(140, 214, 16)', 'rgb(239, 198, 0)', 'rgb(231, 24, 49)'];
const MIN = 0;
const MAX = 100;

const value = Utils.rand(MIN, MAX);

const data = {
  datasets: [{
    data: [value, 100 - value],
    backgroundColor(ctx) {
      if (ctx.type !== 'data') {
        return;
      }
      if (ctx.index === 1) {
        return 'rgb(234, 234, 234)';
      }
      return COLORS[index(ctx.raw)];
    }
  }]
};
// </block:setup>

// <block:annotation:1>
const annotation = {
  type: 'doughnutLabel',
  content: ({chart}) => [
    chart.data.datasets[0].data[0].toFixed(2) + ' %',
    'CPU utilization',
  ],
  drawTime: 'beforeDraw',
  position: {
    y: '-50%'
  },
  font: [{size: 50, weight: 'bold'}, {size: 20}],
  color: ['grey', 'lightGrey']
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'doughnut',
  data,
  options: {
    aspectRatio: 2,
    circumference: 180,
    rotation: -90,
    plugins: {
      annotation: {
        annotations: {
          annotation
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:2>
function index(perc) {
  return perc < 70 ? 0 : perc < 90 ? 1 : 2;
}
// </block:utils>

const actions = [
  {
    name: 'Randomize',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        const perc = Utils.rand(MIN, MAX);
        dataset.data[0] = perc;
        dataset.data[1] = 100 - perc;
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
