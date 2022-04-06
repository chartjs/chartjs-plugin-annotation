# Intro

```js chart-editor
// <block:setup:3>
Utils.srand(8);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    type: 'line',
    label: 'Dataset 1',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 2,
    fill: false,
    data: Utils.numbers({count: 7, min: -100, max: 100}),
  }, {
    type: 'bar',
    label: 'Dataset 2',
    backgroundColor: 'rgb(255, 99, 132)',
    data: Utils.numbers({count: 7, min: -100, max: 100}),
    borderColor: 'white',
    borderWidth: 2
  }, {
    type: 'bar',
    label: 'Dataset 3',
    backgroundColor: 'rgb(75, 192, 192)',
    data: Utils.numbers({count: 7, min: -100, max: 100}),
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'line',
  borderColor: 'black',
  borderWidth: 5,
  click: function({chart, element}) {
    console.log('Line annotation clicked');
  },
  label: {
    backgroundColor: 'red',
    content: 'Test Label',
    display: true
  },
  scaleID: 'y',
  value: Utils.rand(-100, 100)
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'box',
  backgroundColor: 'rgba(101, 33, 171, 0.5)',
  borderColor: 'rgb(101, 33, 171)',
  borderWidth: 1,
  click: function({chart, element}) {
    console.log('Box annotation clicked');
  },
  drawTime: 'beforeDatasetsDraw',
  xMax: 'April',
  xMin: 'February',
  xScaleID: 'x',
  yMax: Utils.rand(-100, 100),
  yMin: Utils.rand(-100, 100),
  yScaleID: 'y'
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
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
        dataset.data = Utils.numbers({count: 7, min: -100, max: 100});
      });
      chart.update();
    }
  },
];

module.exports = {
  actions: actions,
  config: config,
  output: 'console.log output is shown here, click one of the annotations'
};
```
