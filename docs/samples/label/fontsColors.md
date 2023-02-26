# Fonts and colors

```js chart-editor
// <block:setup:5>
const DATA_COUNT = 12;
const MIN = 0;
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
  type: 'label',
  backgroundColor: 'rgba(0,0,0,0.2)',
  borderRadius: 6,
  borderWidth: 0,
  callout: {
    display: true
  },
  color: ['black,', 'black', 'green'],
  content: ['March', 'is', 'annotated'],
  font: [{size: 16, weight: 'bold'}, {family: 'courier'}],
  position: {
    x: 'center',
    y: 'end'
  },
  xValue: 'March',
  yAdjust: (ctx) => yOffset(ctx, 'March'),
  yValue: (ctx) => yValue(ctx, 'March')
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'label',
  backgroundColor: 'rgba(0,0,0,0.2)',
  borderRadius: 6,
  borderWidth: 0,
  callout: {
    display: true
  },
  color: ['black,', 'black', 'green'],
  content: ['June', 'is', 'annotated'],
  font: [{size: 16, weight: 'bold'}, {family: 'courier'}],
  position: {
    x: 'center',
    y: 'end'
  },
  xValue: 'June',
  yAdjust: (ctx) => yOffset(ctx, 'June'),
  yValue: (ctx) => yValue(ctx, 'June')
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'label',
  backgroundColor: 'rgba(0,0,0,0.2)',
  borderRadius: 6,
  borderWidth: 0,
  callout: {
    display: true
  },
  color: ['black,', 'black', 'green'],
  content: ['October', 'is', 'annotated'],
  font: [{size: 16, weight: 'bold'}, {family: 'courier'}],
  position: {
    x: 'center',
    y: 'end'
  },
  xValue: 'October',
  yAdjust: (ctx) => yOffset(ctx, 'October'),
  yValue: (ctx) => yValue(ctx, 'October')
};
// </block:annotation3>

// <block:utils:4>
function yValue(ctx, label) {
  const chart = ctx.chart;
  const dataset = chart.data.datasets[0];
  return dataset.data[chart.data.labels.indexOf(label)];
}

function yOffset(ctx, label) {
  const value = yValue(ctx, label);
  const chart = ctx.chart;
  const scale = chart.scales.y;
  const y = scale.getPixelForValue(value);
  const lblPos = scale.getPixelForValue(100);
  return lblPos - y - 5;
}

// </block:utils>

/* <block:config:0> */
const config = {
  type: 'bar',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        max: 130,
        min: 0,
        grid: {
          color: (ctx)=> ctx.tick.value <= 100 ?
            ctx.chart.scales.x.options.grid.color :
            undefined
        },
        ticks: {
          callback: (value) => value > 100 ? '' : value
        }
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
