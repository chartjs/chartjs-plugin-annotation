# Dragging annotations

```js chart-editor
// <block:setup:6>
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
  backgroundColor: 'rgba(165, 214, 167, 0.2)',
  borderColor: 'rgb(165, 214, 167)',
  borderWidth: 2,
  label: {
    display: true,
    content: ['Box annotation', 'to drag'],
    textAlign: 'center'
  },
  xMax: 'May',
  xMin: 'April',
  xScaleID: 'x',
  yMax: 75,
  yMin: 25,
  yScaleID: 'y'
};
// </block:annotation1>

// <block:annotation2:2>
const annotation2 = {
  type: 'label',
  backgroundColor: 'rgba(255, 99, 132, 0.25)',
  borderWidth: 3,
  borderColor: 'black',
  content: ['Label annotation', 'to drag'],
  callout: {
    display: true,
    borderColor: 'black',
  },
  xValue: 1,
  yValue: 40
};
// </block:annotation2>

// <block:annotation3:3>
const annotation3 = {
  type: 'point',
  backgroundColor: 'rgba(0, 255, 255, 0.4)',
  borderWidth: 2,
  borderColor: 'black',
  radius: 20,
  xValue: 'March',
  yValue: 50
};
// </block:annotation3>

// <block:annotation4:4>
const annotation4 = {
  type: 'polygon',
  backgroundColor: 'rgba(150, 0, 0, 0.25)',
  borderWidth: 2,
  borderColor: 'black',
  radius: 50,
  sides: 6,
  xValue: 'June',
  yValue: 20
};
// </block:annotation4>

// <block:utils:7>
let element;
let lastEvent;

const drag = function(moveX, moveY) {
  element.x += moveX;
  element.y += moveY;
  element.x2 += moveX;
  element.y2 += moveY;
  element.centerX += moveX;
  element.centerY += moveY;
  if (element.elements && element.elements.length) {
    for (const subEl of element.elements) {
      subEl.x += moveX;
      subEl.y += moveY;
      subEl.x2 += moveX;
      subEl.y2 += moveY;
      subEl.centerX += moveX;
      subEl.centerY += moveY;
      subEl.bX += moveX;
      subEl.bY += moveY;
    }
  }
};

const handleElementDragging = function(event) {
  if (!lastEvent || !element) {
    return;
  }
  const moveX = event.x - lastEvent.x;
  const moveY = event.y - lastEvent.y;
  drag(moveX, moveY);
  lastEvent = event;
  return true;
};

const handleDrag = function(event) {
  if (element) {
    switch (event.type) {
    case 'mousemove':
      return handleElementDragging(event);
    case 'mouseout':
    case 'mouseup':
      lastEvent = undefined;
      break;
    case 'mousedown':
      lastEvent = event;
      break;
    default:
    }
  }
};
// </block:utils>

// <block:dragger:5>
const dragger = {
  id: 'dragger',
  beforeEvent(chart, args, options) {
    if (handleDrag(args.event)) {
      args.changed = true;
      return;
    }
  }
};
// </block:dragger>

/* <block:config:0> */
const config = {
  type: 'line',
  plugins: [dragger],
  data,
  options: {
    events: ['mousedown', 'mouseup', 'mousemove', 'mouseout'],
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 100
      }
    },
    plugins: {
      annotation: {
        enter(ctx) {
          element = ctx.element;
        },
        leave() {
          element = undefined;
          lastEvent = undefined;
        },
        annotations: {
          annotation1,
          annotation2,
          annotation3,
          annotation4
        }
      }
    }
  }
};
/* </block:config> */

const actions = [
  {
    name: 'Reset dragging',
    handler: function(chart) {
      chart.update();
    }
  }
];

module.exports = {
  actions: actions,
  config: config,
};
```
