# Line Chart

```js chart-editor
// <block:setup:4>
const DATA_COUNT = 8;
const MIN = 10;
const MAX = 100;

Utils.srand(8);

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: [10, 20, 30, 40, 50, 60, 70, 80],
  datasets: [{
    data: Utils.numbers(numberCfg),
  }, {
    data: Utils.numbers(numberCfg),
  }, {
    data: Utils.numbers(numberCfg),
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'line',
  scaleID: 'x',
  borderWidth: 3,
  borderColor: 'black',
  value: 5,
  label: {
    rotation: 'auto',
    content: 'Line at x=5',
    display: true
  },
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'line',
  scaleID: 'x',
  borderWidth: 3,
  borderColor: 'black',
  value: 90,
  label: {
    rotation: 'auto',
    position: 'start',
    backgroundColor: 'black',
    content: 'Line at x=90',
    display: true
  }
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'box',
  xMin: 75,
  xMax: 85,
  yMin: 80,
  yMax: 90,
  backgroundColor: 'rgba(250, 250, 0, 0.4)',
  borderColor: 'rgba(0, 150, 0, 0.2)',
  drawTime: 'beforeDatasetsDraw',
  borderWidth: 0,
  borderRadius: 0,
};
// </block:annotation3>


/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      x: {
        type: 'linear',
        bounds: 'data'
      }
    },
    plugins: {
      annotation: {
        annotations: {
          annotation1,
          annotation2,
          annotation3
        }
      }
    },
  }
};
/* </block:config> */

const actions = [
  {
    name: 'Zoom out',
    handler: function(chart) {
      chart.scales.x.options.min = 0;
      chart.scales.x.options.max = 100;
      chart.update();
    }
  },
  {
    name: 'Zoom in',
    handler: function(chart) {
      chart.scales.x.options.min = 10;
      chart.scales.x.options.max = 80;
      chart.update();
    }
  },
  {
    name: 'Reset zoom',
    handler: function(chart) {
      chart.scales.x.options.min = undefined;
      chart.scales.x.options.max = undefined;
      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config,
};
```
