# Points outside of chart area

```js chart-editor
// <block:setup:3>
const DATA_COUNT = 12;
const MIN = 10;
const MAX = 100;

Utils.srand(8);

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: Utils.numbers(numberCfg)
  }, {
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'point',
  backgroundColor: 'lime',
  borderColor: 'black',
  borderWidth: 1,
  pointStyle: 'triangle',
  radius: 15,
  xValue: 3,
  xScaleID: 'x',
  yAdjust: 5,
  yValue: 0,
  yScaleID: 'y'
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'point',
  backgroundColor: 'lime',
  borderColor: 'black',
  borderWidth: 1,
  pointStyle: 'triangle',
  radius: 15,
  rotation: 180,
  xValue: 3,
  xScaleID: 'x',
  yAdjust: -5,
  yValue: 100,
  yScaleID: 'y'
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'bar',
  data,
  options: {
    layout: {
      padding: {
        top: 16
      }
    },
    scale: {
      y: {
        beginAtZero: true,
        max: 100,
        min: 0
      }
    },
    plugins: {
      annotation: {
        clip: false,
        common: {
          drawTime: 'afterDraw'
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

const actions = [
  {
    name: 'Randomize',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));
      });
      const xValue = Utils.rand(0, DATA_COUNT - 1);
      chart.options.plugins.annotation.annotations.annotation1.xValue = xValue;
      chart.options.plugins.annotation.annotations.annotation2.xValue = xValue;
      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config,
};
```
