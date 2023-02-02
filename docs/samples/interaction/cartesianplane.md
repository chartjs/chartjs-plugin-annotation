# Cartesian plane

```js chart-editor
// <block:setup:5>
let RECT;
const MIN = -10;
const MAX = 10;
// </block:setup>

// <block:axes:1>
const yAxis = {
  type: 'line',
  value: 0,
  scaleID: 'x',
  borderColor: 'lightGray',
  afterDraw({chart, element}) {
    const scale = chart.scales.y;
    const labelItems = scale.getLabelItems().filter((item) => Number.isInteger(parseFloat(item.label)));
    drawTicks(chart, scale, {
      labelItems,
      align: 'right',
      xy: (translation) => ({x: element.x - scale.options.ticks.padding, y: translation[1]})
    });
  }
};
const xAxis = {
  type: 'line',
  value: 0,
  scaleID: 'y',
  borderColor: 'lightGray',
  afterDraw({chart, element}) {
    const scale = chart.scales.x;
    const labelItems = scale.getLabelItems().filter((item) => Number.isInteger(parseFloat(item.label)) && parseFloat(item.label) !== 0);
    drawTicks(chart, scale, {
      labelItems,
      baseline: 'top',
      xy: (translation) => ({x: translation[0], y: element.y2 + scale.options.ticks.padding})
    });
  }
};
// </block:axes>

// <block:rectangle:2>
const box = {
  type: 'box',
  display: () => !!RECT,
  backgroundColor: 'rgba(255, 174, 201, 0.2)',
  borderColor: 'red',
  borderDash: [4, 4],
  xMin: () => RECT ? RECT.left : undefined,
  xMax: () => RECT ? RECT.right : undefined,
  yMin: () => RECT ? RECT.bottom : undefined,
  yMax: () => RECT ? RECT.top : undefined,
  z: -1
};
const A = {
  type: 'label',
  content: 'A',
  position: {
    x: 'end',
    y: 'end'
  },
  xValue: () => RECT ? RECT.left : undefined,
  yValue: () => RECT ? RECT.top : undefined
};
const B = {
  type: 'label',
  content: 'B',
  position: {
    x: 'start',
    y: 'end'
  },
  xValue: () => RECT ? RECT.right : undefined,
  yValue: () => RECT ? RECT.top : undefined
};
const C = {
  type: 'label',
  content: 'C',
  position: {
    x: 'end',
    y: 'start'
  },
  xValue: () => RECT ? RECT.left : undefined,
  yValue: () => RECT ? RECT.bottom : undefined
};
const D = {
  type: 'label',
  content: 'D',
  position: {
    x: 'start',
    y: 'start'
  },
  xValue: () => RECT ? RECT.right : undefined,
  yValue: () => RECT ? RECT.bottom : undefined
};
// </block:rectangle>

// <block:summary:3>
const summary = {
  type: 'label',
  display: () => !!RECT,
  drawTime: 'afterDraw',
  backgroundColor: 'white',
  borderColor: 'silver',
  borderWidth: 1,
  borderRadius: 6,
  content() {
    if (RECT) {
      const result = [];
      result.push('A: (' + RECT.left.toFixed(2) + ', ' + RECT.top.toFixed(2) + ')');
      result.push('B: (' + RECT.right.toFixed(2) + ', ' + RECT.top.toFixed(2) + ')');
      result.push('C: (' + RECT.left.toFixed(2) + ', ' + RECT.bottom.toFixed(2) + ')');
      result.push('D: (' + RECT.right.toFixed(2) + ', ' + RECT.bottom.toFixed(2) + ')');
      const AB = Math.abs(RECT.right - RECT.left);
      const AC = Math.abs(RECT.bottom - RECT.top);
      result.push('AB = CD = ' + AB.toFixed(2));
      result.push('AC = BD = ' + AC.toFixed(2));
      result.push('AD = BC = ' + Math.sqrt(Math.pow(AB, 2) + Math.pow(AC, 2)).toFixed(2));
      result.push('Perimeter = ' + ((AB + AC) * 2).toFixed(2));
      result.push('Area = ' + (AB * AC).toFixed(2));
      return result;
    }
  },
  font: {
    size: 12,
    family: 'Courier'
  },
  padding: 5,
  position: {
    x: () => RECT && RECT.left < 0 ? 'end' : 'start',
    y: () => RECT && RECT.top <= 0 ? 'start' : 'end'
  },
  textAlign: () => RECT && RECT.left < 0 ? 'right' : 'left',
  xValue: () => RECT && RECT.left < 0 ? MAX : MIN,
  yValue: () => RECT && RECT.top <= 0 ? MAX : MIN
};
// </block:box>

// <block:utils:4>
function calculateBox(e, chart) {
  const xValue = chart.scales.x.getValueForPixel(e.x);
  const yValue = chart.scales.y.getValueForPixel(e.y);
  return {
    left: xValue > 0 ? 0 : xValue,
    right: xValue > 0 ? xValue : 0,
    top: yValue > 0 ? yValue : 0,
    bottom: yValue > 0 ? 0 : yValue
  };
}

function drawTicks(chart, scale, {labelItems, align, baseline, xy}) {
  const ctx = chart.ctx;
  ctx.save();
  ctx.beginPath();
  for (const item of labelItems) {
    const {font, label, options} = item;
    const {textAlign, textBaseline, translation} = options;
    const point = xy(translation);
    ctx.beginPath();
    ctx.font = font.string;
    ctx.textAlign = align || textAlign;
    ctx.textBaseline = baseline || textBaseline;
    ctx.fillStyle = 'silver';
    ctx.fillText(parseFloat(label).toFixed(0), point.x, point.y);
    ctx.fill();
  }
  ctx.restore();
}
// </block:utils>

/* <block:config:0> */
const config = {
  type: 'scatter',
  options: {
    layout: {
      padding: {
        top: 20,
        left: 20,
        right: 20
      }
    },
    onClick(e, elements, chart) {
      RECT = calculateBox(e, chart);
      chart.update();
    },
    elements: {
      labelAnnotation: {
        display: () => !!RECT,
        borderWidth: 0,
        padding: 0,
        font: {
          size: 20,
          style: 'oblique'
        }
      }
    },
    scales: {
      x: {
        min: MIN,
        max: MAX,
        grid: {
          drawTicks: false
        },
        ticks: {
          display: false,
          stepSize: 0.5
        }
      },
      y: {
        min: MIN,
        max: MAX,
        grid: {
          drawTicks: false
        },
        ticks: {
          display: false,
          stepSize: 0.5
        }
      }
    },
    plugins: {
      annotation: {
        clip: false,
        common: {
          drawTime: 'beforeDraw'
        },
        annotations: {
          xAxis,
          yAxis,
          box,
          A, B, C, D,
          summary
        }
      },
      title: {
        display: true,
        text: 'Click on the chart to set the point to build the rectangle',
        position: 'bottom',
        padding: {
          top: 16,
          bottom: 0
        }
      }
    }
  }
};
/* </block:config> */

const actions = [
  {
    name: 'Reset',
    handler: function(chart) {
      RECT = undefined;
      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config,
};
```