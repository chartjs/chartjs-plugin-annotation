# Interaction

```js chart-editor
// <block:setup:3>
const AXIS = ['xy', 'x', 'y'];
const MODE = ['nearest', 'point', 'x', 'y'];

let axisIndex = 0;
let modeIndex = 0;

Utils.srand(8);

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    type: 'line',
    label: 'Dataset 1',
    borderColor: 'rgb(54, 162, 235)',
    borderWidth: 2,
    fill: false,
    data: Utils.numbers({count: 7, min: 0, max: 100}),
  }]
};
// </block:setup>

// <block:printer:4>
const printer = {
  id: 'printer',
  afterDraw(chart) {
    const options = chart.options.plugins.annotation.interaction;
    const mode = options.mode || 'nearest';
    const axis = options.axis || 'xy';
    const intersect = !!options.intersect;
    const ctx = chart.ctx;
    ctx.save();
    ctx.font = '14px monospace';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Mode: ' + mode + ', axis: ' + axis + ', intersect: ' + intersect, chart.chartArea.left, chart.canvas.offsetHeight - 16);
    ctx.restore();
  }
};
// </block:printer>

// <block:annotation1:1>
const annotation1 = {
  type: 'box',
  backgroundColor: 'rgba(255, 245, 157, 0.2)',
  borderColor: 'rgb(255, 245, 157)',
  borderWidth: 2,
  enter: function({element}) {
    console.log(element.options.label.content + ' entered');
  },
  click: function({element}) {
    console.log(element.options.label.content + ' clicked');
  },
  leave: function({element}) {
    console.log(element.options.label.content + ' left');
  },
  label: {
    display: true,
    content: 'Outer box annotation',
    position: {
      y: 'start'
    },
    font: {
      size: 14
    }
  },
  xMax: 'June',
  xMin: 'February',
  xScaleID: 'x',
  yMax: 90,
  yMin: 10,
  yScaleID: 'y'
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'box',
  backgroundColor: 'rgba(165, 214, 167, 0.2)',
  borderColor: 'rgb(165, 214, 167)',
  borderWidth: 2,
  enter: function({element}) {
    console.log(element.options.label.content + ' entered');
  },
  click: function({element}) {
    console.log(element.options.label.content + ' clicked');
  },
  leave: function({element}) {
    console.log(element.options.label.content + ' left');
  },
  label: {
    display: true,
    content: 'Inner box annotation',
    position: {
      y: 'start'
    },
    font: {
      size: 14
    }
  },
  xMax: 'May',
  xMin: 'March',
  xScaleID: 'x',
  yMax: 75,
  yMin: 25,
  yScaleID: 'y'
};
// </block:annotation2>

/* <block:config:0> */
const config = {
  type: 'line',
  plugins: [printer],
  data,
  options: {
    layout: {
      padding: {
        bottom: 24
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100
      }
    },
    plugins: {
      annotation: {
        annotations: {
          outer: annotation1,
          inner: annotation2
        }
      }
    }
  }
};
/* </block:config> */

const actions = [
  {
    name: 'Change mode',
    handler: function(chart) {
      const options = chart.options.plugins.annotation.interaction;
      modeIndex++;
      if (modeIndex > MODE.length) {
        modeIndex = 0;
      }
      options.mode = MODE[modeIndex];
      chart.update();
    }
  },
  {
    name: 'Change axis',
    handler: function(chart) {
      const options = chart.options.plugins.annotation.interaction;
      axisIndex++;
      if (axisIndex > AXIS.length) {
        axisIndex = 0;
      }
      options.axis = AXIS[axisIndex];
      chart.update();
    }
  },
  {
    name: 'Toogle intersect',
    handler: function(chart) {
      const options = chart.options.plugins.annotation.interaction;
      options.intersect = !options.intersect;
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
