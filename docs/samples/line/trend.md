# Trend

```js chart-editor
// <block:setup:2>
const DATA_COUNT = 6;
const MIN = 10;
const MAX = 100;

Utils.srand(8);
const jointValue = Utils.rand(MIN, MAX);

const dataCfg = Utils.numbers({count: DATA_COUNT, min: MIN, max: MAX});
dataCfg.push(jointValue, NaN, NaN, NaN, NaN, NaN, NaN);
const trendCfg = Utils.numbers({count: DATA_COUNT - 1, min: MIN, max: MAX});
trendCfg.splice(0, 0, NaN, NaN, NaN, NaN, NaN, NaN, jointValue);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    label: 'Data',
    data: dataCfg,
  }, {
    label: 'trend',
    data: trendCfg,
    borderDash: [6, 6]
  }]
};
// </block:setup>

// <block:annotation:1>
const annotation = {
  type: 'line',
  scaleID: 'x',
  display: (ctx) => ctx.chart.isDatasetVisible(1),
  borderWidth: 1,
  borderColor: 'black',
  value: 'July',
  label: {
    enabled: true,
    content: 'Now',
    position: 'start'
  }
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
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

const actions = [
  {
    name: 'Toggle trend',
    handler: function(chart) {
      const visible = chart.isDatasetVisible(1);
      if (visible) {
        chart.options.scales.x.max = 'July';
      } else {
        chart.options.scales.x.max = undefined;
      }
      chart.setDatasetVisibility(1, !visible);
      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config,
};
```
