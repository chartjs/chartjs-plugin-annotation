# Yearly quarters

```js chart-editor
// <block:setup:5>
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
  backgroundColor: 'rgba(255, 245, 157, 0.2)',
  borderWidth: 0,
  xMax: 2.5,
  xMin: -0.5,
  label: {
    drawTime: 'afterDraw',
    display: true,
    content: 'First quarter',
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
  xMax: 5.5,
  xMin: 2.5,
  label: {
    drawTime: 'afterDraw',
    display: true,
    content: 'Second quarter',
    position: {
      x: 'center',
      y: 'start'
    }
  }
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'box',
  backgroundColor: 'rgba(165, 214, 167, 0.2)',
  borderWidth: 0,
  xMax: 8.5,
  xMin: 5.5,
  label: {
    drawTime: 'afterDraw',
    display: true,
    content: 'Third quarter',
    position: {
      x: 'center',
      y: 'start'
    }
  }
};
// </block:annotation3>

// <block:annotation4:4>
const annotation4 = {
  type: 'box',
  backgroundColor: 'rgba(159, 168, 218, 0.2)',
  borderWidth: 0,
  xMin: 8.5,
  label: {
    drawTime: 'afterDraw',
    display: true,
    content: 'Fourth quarter',
    position: {
      x: 'center',
      y: 'start'
    }
  }
};
// </block:annotation4>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
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
