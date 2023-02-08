# Curve

```js chart-editor
// <block:setup:2>
const DATA_COUNT = 8;
const MIN = 10;
const MAX = 100;

Utils.srand(8);

const labels = [];
for (let i = 0; i < DATA_COUNT; ++i) {
  labels.push('' + i);
}

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: labels,
  datasets: [{
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation:1>
const annotation = {
  type: 'line',
  borderColor: 'black',
  borderWidth: 3,
  xScaleID: 'x',
  yScaleID: 'y',
  xMin: 1,
  xMax: 6,
  yMin: ({chart}) => chart.data.datasets[0].data[1] / 2,
  yMax: ({chart}) => chart.data.datasets[0].data[6] / 2,
  curve: true,
  arrowHeads: {
    end: {
      display: true
    }
  }
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'bar',
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
  config: config
};
```
