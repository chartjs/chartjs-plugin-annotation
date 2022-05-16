# Combined annotations

```js chart-editor
// <block:setup:6>
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
  type: 'line',
  borderColor: 'green',
  borderDash: [6, 6],
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'lightGreen',
    borderRadius: 0,
    color: 'green',
    content: 'Project timeline'
  },
  arrowHeads: {
    end: {
      display: true,
      fill: true,
      borderDash: [],
      borderColor: 'green'
    }
  },
  xMax: 10.5,
  xMin: 2.5,
  xScaleID: 'x',
  yMax: 110,
  yMin: 110,
  yScaleID: 'y'
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'line',
  borderColor: 'green',
  borderDash: [6, 6],
  borderWidth: 1,
  xMax: 2.5,
  xMin: 2.5,
  xScaleID: 'x',
  yMax: 0,
  yMin: 110,
  yScaleID: 'y'
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'line',
  borderColor: 'green',
  borderDash: [6, 6],
  borderWidth: 1,
  xMax: 10.5,
  xMin: 10.5,
  xScaleID: 'x',
  yMax: 0,
  yMin: 110,
  yScaleID: 'y'
};
// </block:annotation3>

// <block:annotation4:4>
const annotation4 = {
  type: 'point',
  backgroundColor: 'green',
  borderWidth: 0,
  xValue: 2.5,
  xScaleID: 'x',
  yValue: 110,
  yScaleID: 'y'
};
// </block:annotation4>

/* <block:config:0> */
const config = {
  type: 'bar',
  data,
  options: {
    scale: {
      y: {
        beginAtZero: true,
        max: 120,
        min: 0
      }
    },
    plugins: {
      annotation: {
        common: {
          drawTime: 'beforeDraw'
        },
        annotations: {
          annotation1,
          annotation2,
          annotation3,
          annotation4
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
