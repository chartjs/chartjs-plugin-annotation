# Using images as content

```js chart-editor
// <block:setup:3>
const DATA_COUNT = 12;
const MIN = 0;
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
  type: 'label',
  drawTime: 'afterDraw',
  content: Utils.getImage(),
  width: 100,
  height: 100,
  xValue: 4,
  yValue: 30,
  xAdjust: 150,
  yAdjust: -150,
  borderWidth: 1,
  borderDash: [6, 6],
  callout: {
    display: true,
    position: 'left'
  }
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'point',
  drawTime: 'afterDraw',
  xValue: 4,
  yValue: 30,
  radius: 10
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      }
    },
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
  config: config
};
```
