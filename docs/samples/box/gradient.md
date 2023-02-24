# Magic quadrant

```js chart-editor
// <block:setup:6>
const META = [[
  {color: 'rgb(255, 174, 201)', backgroundColor: 'rgba(255, 174, 201, 0.5)', label: 'Niche players'},
  {color: 'rgb(159, 168, 218)', backgroundColor: 'rgba(159, 168, 218, 0.5)', label: 'Visionaries'},
], [
  {color: 'rgb(255, 245, 157)', backgroundColor: 'rgba(255, 245, 157, 0.5)', label: 'Challengers'},
  {color: 'rgb(165, 214, 167)', backgroundColor: 'rgba(165, 214, 167, 0.5)', label: 'Leaders'},
]];
const DATA_COUNT = 12;
const MIN = 0.5;
const MAX = 9.5;

const data = {
  datasets: [{
    data: randomize(),
    pointRadius: 8
  }]
};
// </block:setup>

// <block:annotation1:1>
const annotation1 = {
  type: 'box',
  backgroundColor: (ctx) => gradient(ctx, META[1][0].backgroundColor),
  xMax: 5,
  yMin: 5,
  label: {
    content: META[1][0].label,
    position: {
      x: 'start',
      y: 'start'
    }
  }
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'box',
  backgroundColor: (ctx) => gradient(ctx, META[1][1].backgroundColor, true),
  xMin: 5,
  yMin: 5,
  label: {
    content: META[1][1].label,
    position: {
      x: 'end',
      y: 'start'
    }
  }
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'box',
  backgroundColor: (ctx) => gradient(ctx, META[0][0].backgroundColor),
  xMax: 5,
  yMax: 5,
  label: {
    content: META[0][0].label,
    position: {
      x: 'start',
      y: 'end'
    }
  }
};
// </block:annotation3>

// <block:annotation4:4>
const annotation4 = {
  type: 'box',
  backgroundColor: (ctx) => gradient(ctx, META[0][1].backgroundColor, true),
  xMin: 5,
  yMax: 5,
  label: {
    content: META[0][1].label,
    position: {
      x: 'end',
      y: 'end'
    }
  }
};
// </block:annotation4>

// <block:utils:5>
function randomize() {
  const xValues = Utils.numbers({count: DATA_COUNT, min: MIN, max: MAX});
  const yValues = Utils.numbers({count: DATA_COUNT, min: MIN, max: MAX});
  const values = [];
  for (let i = 0; i < DATA_COUNT; i++) {
    values.push({x: xValues[i], y: yValues[i], co: 'Company ' + (i + 1)});
  }
  return values;
}

function gradient({chart: {ctx}, element}, color, rtl = false) {
  const g = ctx.createLinearGradient(element.x, element.y, element.x2, element.y);
  g.addColorStop(rtl ? 1 : 0, color);
  g.addColorStop(rtl ? 0 : 1, 'transparent');
  return g;
}

function gridColor(context) {
  if (context.tick.value === 5) {
    return 'lightGray';
  } else if (context.tick.value === 0 || context.tick.value === 10) {
    return 'lightGray';
  }
  return 'transparent';
}
// </block:utils>

/* <block:config:0> */
const config = {
  type: 'scatter',
  data,
  options: {
    layout: {
      padding: {
        top: 12
      }
    },
    elements: {
      boxAnnotation: {
        borderWidth: 0,
        label: {
          drawTime: 'beforeDatasetsDraw',
          display: true,
          font: {
            size: 20
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 10,
        min: 0,
        grid: {
          drawTicks: false,
          color: gridColor
        },
        ticks: {
          display: false
        },
        title: {
          display: true,
          text: 'Completeness of vision',
          padding: 10,
          font: {
            size: 20,
            weight: 'bold'
          }
        }
      },
      y: {
        display: true,
        beginAtZero: true,
        max: 10,
        min: 0,
        grid: {
          drawTicks: false,
          color: gridColor
        },
        ticks: {
          display: false
        },
        title: {
          display: true,
          text: 'Ability to execute',
          padding: 10,
          font: {
            size: 20,
            weight: 'bold'
          }
        }
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
      },
      tooltip: {
        mode: 'nearest',
        intersect: true,
        usePointStyle: true,
        footerAlign: 'right',
        footerColor: 'lightGray',
        footerMarginTop: 10,
        callbacks: {
          title: (items) => items[0].raw.co,
          labelColor({raw}) {
            const x = raw.x > 5 ? 1 : 0;
            const y = raw.y > 5 ? 1 : 0;
            return {
              borderColor: META[y][x].color,
              backgroundColor: META[y][x].backgroundColor,
              borderWidth: 3
            };
          },
          label({raw}) {
            const x = raw.x > 5 ? 1 : 0;
            const y = raw.y > 5 ? 1 : 0;
            return META[y][x].label;
          },
          footer(items) {
            const {raw} = items[0];
            return ['Completeness of vision: ' + raw.x.toFixed(2), 'Ability to execute: ' + raw.y.toFixed(2)];
          }
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
        const values = randomize();
        dataset.data.forEach((p, idx) => {
          const v = values[idx];
          p.x = v.x;
          p.y = v.y;
          p.co = v.co;
        });
      });
      chart.update();
    }
  },
];

module.exports = {
  actions: actions,
  config: config,
};
```
