# Selecting annotations

```js chart-editor
// <block:setup:3>
let count = 0;
const selected = [];

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

// <block:annotation1:1>
const annotation1 = {
  type: 'box',
  backgroundColor: 'rgba(255, 245, 157, 0.2)',
  borderColor: 'rgb(255, 245, 157)',
  borderWidth: 2,
  click: ({element}) => select(element, 'rgba(255, 245, 157, 0.8)', 'rgba(255, 245, 157, 0.2)'),
  label: {
    display: true,
    content: 'Yellow box annotation',
    position: {
      y: 'start'
    },
    font: {
      size: 12
    }
  },
  xMax: 'April',
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
  click: ({element}) => select(element, 'rgba(165, 214, 167, 0.8)', 'rgba(165, 214, 167, 0.2)'),
  label: {
    display: true,
    content: 'Green box annotation',
    position: {
      y: 'start'
    },
    font: {
      size: 12
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

// <block:utils:4>
function enter({chart, element}) {
  console.log(element.label.options.content + ' entered');
  if (!count) {
    chart.canvas.style.cursor = 'pointer';
  }
  count++;
}

function leave({chart, element}) {
  console.log(element.label.options.content + ' left');
  count--;
  if (!count) {
    chart.canvas.style.cursor = 'default';
  }
}

function select(element, selectedColor, unselectedColor) {
  console.log(element.label.options.content + ' selected');
  if (selected.includes(element)) {
    selected.splice(selected.indexOf(element), 1);
    element.options.backgroundColor = unselectedColor;
    element.label.options.font.size = 12;
  } else {
    selected.push(element);
    element.options.backgroundColor = selectedColor;
    element.label.options.font.size = 14;
  }
  return true;
}
// </block:utils>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100
      }
    },
    plugins: {
      annotation: {
        enter: enter,
        leave: leave,
        common: {
          drawTime: 'beforeDraw'
        },
        annotations: {
          annotation1,
          annotation2
        }
      }
    }
  }
};
/* </block:config> */

module.exports = {
  config: config,
  output: 'console.log output is shown here, click one of the annotations'
};
```
