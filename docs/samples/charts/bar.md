# Bar Chart

```js chart-editor
// <block:setup:4>
const DATA_COUNT = 8;
const MIN = 10;
const MAX = 100;

Utils.srand(8);

const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push('Label ' + i);
}

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: labels,
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
  value: 0.5,
  label: {
    content: 'Line annotation at x=0.5',
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
  value: 'Label 5',
  label: {
    rotation: 'auto',
    position: 'start',
    backgroundColor: 'black',
    content: 'Line at x=Label 5',
    display: true
  }
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'box',
  xMin: 2.5,
  xMax: 3.5,
  yMin: 0,
  yMax: 100,
  backgroundColor: 'rgba(250, 250, 0, 0.4)',
  borderColor: 'rgba(0, 150, 0, 0.2)',
  drawTime: 'beforeDatasetsDraw',
  borderWidth: 0,
  borderRadius: 0,
};
// </block:annotation3>


/* <block:config:0> */
const config = {
  type: 'bar',
  data,
  options: {
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
    name: 'Randomize',
    handler: function(chart) {
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));
      });

      chart.update();
    }
  },
  {
    name: 'Add data',
    handler: function(chart) {
      chart.data.labels.push('Label ' + chart.data.labels.length);
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.push(Utils.rand(MIN, MAX));
      });

      chart.update();
    }
  },
  {
    name: 'Remove data',
    handler: function(chart) {
      chart.data.labels.shift();
      chart.data.datasets.forEach(function(dataset, i) {
        dataset.data.shift();
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
