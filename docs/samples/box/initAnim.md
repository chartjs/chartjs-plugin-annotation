# Initial animations

```js chart-editor
// <block:setup:4>
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

// <block:annotation1:1>
const annotation1 = {
  type: 'box',
  backgroundColor: 'rgba(0, 150, 0, 0.2)',
  borderColor: 'rgba(0, 150, 0)',
  borderRadius: 4,
  borderWidth: 1,
  init: true,
  label: {
    display: true,
    content: 'Fade'
  },
  xMax: 6.5,
  xMin: 4.5,
  yMax: 60,
  yMin: 40
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'box',
  backgroundColor: 'rgba(0, 150, 0, 0.2)',
  borderColor: 'rgba(0, 150, 0)',
  borderRadius: 4,
  borderWidth: 1,
  init: () => ({y: 0, y2: 0}),
  label: {
    display: true,
    content: 'Flyin from top'
  },
  xMax: 2.5,
  xMin: 0.5,
  yMax: 30,
  yMin: 10
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'box',
  backgroundColor: 'rgba(0, 150, 0, 0.2)',
  borderColor: 'rgba(0, 150, 0)',
  borderRadius: 4,
  borderWidth: 1,
  init: () => ({x: 0, x2: 0}),
  label: {
    display: true,
    content: 'Flyin from left'
  },
  xMax: 10.5,
  xMin: 8.5,
  yMax: 90,
  yMin: 70
};
// </block:annotation3>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        min: 0
      }
    },
    plugins: {
      annotation: {
        common: {
          drawTime: 'afterDraw'
        },
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
