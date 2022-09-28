# Labeling

```js chart-editor
// <block:setup:2>
const DATA_COUNT = 12;
const MIN = 10;
const MAX = 100;

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation:1>
const annotation = {
  type: 'ellipse',
  backgroundColor: 'rgba(208, 208, 208, 0.2)',
  borderWidth: 0,
  label: {
    drawTime: 'afterDatasetsDraw',
    display: true,
    color: 'rgba(208, 208, 208, 0.6)',
    content: 'whole year',
    font: {
      size: (ctx) => ctx.chart.chartArea.height / 4
    },
    position: {
      x: 'center',
      y: 'end'
    }
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
