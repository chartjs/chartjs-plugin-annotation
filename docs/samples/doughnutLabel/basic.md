# Basic

```js chart-editor
// <block:setup:3>
const DATA_COUNT = 12;
const MIN = 0;
const MAX = 100;

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX, decimals: 0};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: Utils.numbers(numberCfg)
  }]
};
// </block:setup>

// <block:annotation:1>
const annotation = {
  type: 'doughnutLabel',
  content: ({chart}) => ['Average',
    average(chart).toFixed(2),
    'on last ' + chart.data.labels.length + ' months'
  ],
  font: [{size: 60}, {size: 50}, {size: 30}],
  color: ['black', 'red', 'grey']
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

// <block:utils:2>
function average(chart) {
  const values = chart.data.datasets[0].data;
  return values.reduce((a, b) => a + b, 0) / values.length;
}
// </block:utils>

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
