# Using canvas as labels

```js chart-editor
// <block:setup:3>
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
  backgroundColor: 'rgba(165, 214, 167, 0.2)',
  borderWidth: 0,
  xMax: 2,
  xMin: 5,
  label: {
    display: true,
    content: Utils.getSpiral(),
    position: {
      x: 'center',
      y: 'start'
    }
  }
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'box',
  backgroundColor: 'rgba(188, 170, 164, 0.2)',
  borderWidth: 0,
  xMax: 6,
  xMin: 10,
  label: {
    display: true,
    content: Utils.getHouse(),
    position: {
      x: 'center',
      y: 'end'
    }
  }
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