# Limited lines

```js chart-editor
// <block:setup:4>
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
  borderWidth: 3,
  label: {
    display: true,
    backgroundColor: 'lightGreen',
    borderRadius: 0,
    color: 'green',
    content: 'Summer time'
  },
  arrowHeads: {
    start: {
      display: true,
      borderColor: 'green'
    },
    end: {
      display: true,
      borderColor: 'green'
    }
  },
  xMax: 8,
  xMin: 5,
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
  xMax: 5,
  xMin: 5,
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
  xMax: 8,
  xMin: 8,
  xScaleID: 'x',
  yMax: 0,
  yMin: 110,
  yScaleID: 'y'
};
// </block:annotation3>

/* <block:config:0> */
const config = {
  type: 'line',
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
