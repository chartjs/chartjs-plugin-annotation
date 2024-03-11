# Filling background

```js chart-editor
// <block:setup:2>
const DATA_COUNT = 6;
const MIN = 0;
const MAX = 100;

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX, decimals: 0};

const data = {
  labels: ['Apples', 'Orange', 'Lime', 'Grapes', 'Apricots', 'Blackberries'],
  datasets: [{
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation:1>
const annotation = {
  type: 'doughnutLabel',
  content: ({chart}) => [chart.getDatasetMeta(0).total,
    'pieces of fruits'
  ],
  font: [{size: 48}, {size: 20}],
  color: ['indigo', 'grey'],
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  borderColor: 'black',
  borderWidth: 2,
  borderDash: [7, 7],
  spacing: 2
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'doughnut',
  data,
  options: {
    aspectRatio: 2,
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
        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX).toFixed(0));
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
