# Inner chart

```js chart-editor
// <block:setup:5>
const DATA_COUNT = 12;
const MIN = 0;
const MAX = 100;

const innerChart = Utils.getChart();
const innerDataset = innerChart.data.datasets[0];

const numberCfg = {count: DATA_COUNT, min: MIN, max: MAX};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    data: Utils.numbers(numberCfg),
    borderColor: innerDataset.backgroundColor[0],
    backgroundColor: 'transparent'
  }, {
    data: Utils.numbers(numberCfg),
    borderColor: innerDataset.backgroundColor[1],
    backgroundColor: 'transparent',
    hidden: true
  }, {
    data: Utils.numbers(numberCfg),
    borderColor: innerDataset.backgroundColor[2],
    backgroundColor: 'transparent',
    hidden: true
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'label',
  content: innerChart.canvas,
  xValue: 1,
  yValue: 135,
  enter: (ctx) => setCursor(ctx, 'pointer'),
  leave: (ctx) => setCursor(ctx, 'default'),
  click: clickOnInnerChart
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'label',
  content: (ctx) => [innerChart.data.labels[getVisibleDatasetIndex(ctx)],
    'items trend'],
  callout: {
    display: true,
    position: 'bottom',
    margin: 0
  },
  font: {
    size: 16
  },
  backgroundColor: 'white',
  borderWidth: 1,
  xAdjust: -60,
  xValue: (ctx) => point(ctx).x,
  yAdjust: -60,
  yValue: (ctx) => point(ctx).y
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'label',
  content: ['Click on a slice of the pie chart', 'to see the data in the main chart'],
  color: 'rgba(0, 0, 0, 0.5)',
  xValue: 3.2,
  yValue: 150,
};
// </block:annotation3>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 160
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
    }
  }
};
/* </block:config> */

// <block:utils:4>
function clickOnInnerChart(ctx, event) {
  event.x = event.x - ctx.element.x;
  event.y = event.y - ctx.element.y;
  const elements = innerChart.getElementsAtEventForMode(event, 'point', {}, true);
  if (elements.length) {
    const first = elements[0];
    ctx.chart.setDatasetVisibility(getVisibleDatasetIndex(ctx), false);
    ctx.chart.show(first.index);
  }
}

function getVisibleDatasetIndex(ctx) {
  const chart = ctx.chart;
  for (let i = 0; i < chart.data.datasets.length; i++) {
    if (chart.isDatasetVisible(i)) {
      return i;
    }
  }
  return 0;
}

function point(ctx) {
  const dataset = ctx.chart.data.datasets[getVisibleDatasetIndex(ctx)];
  const values = dataset.data.filter((value, i) => i > dataset.data.length - 4);
  const y = Math.max(...values);
  const x = dataset.data.lastIndexOf(y);
  return {x, y};
}

function setCursor(ctx, type) {
  ctx.chart.canvas.style.cursor = type;
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
      innerChart.data.datasets.forEach(function(dataset, i) {
        dataset.data = dataset.data.map(() => Utils.rand(MIN, MAX));
      });
      innerChart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config
};
```
