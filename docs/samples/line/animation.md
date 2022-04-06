# Animation

<input id="update" type="range" style="width:100%"/>

```js chart-editor
// <block:setup:3>
const uniqueId = new Date().getTime();

const data = {
  datasets: [{
    backgroundColor: 'rgba(63, 184, 175, 0.3)',
    borderColor: 'rgba(255, 0, 0, 0.0)',
    pointRadius: 0, // no dots
    tension: 0, // straight lines
    showLine: true,
    fill: true,
    data: [
      {x: 0, y: 0},
      {x: 50, y: 0},
      {x: 50, y: 1},
      {x: 100, y: 1}
    ]
  }]
};
// </block:setup>

// <block:annotation:1>
const line = {
  type: 'line',
  borderColor: 'red',
  borderWidth: 3,
  label: {
    display: true,
    content: 'Limit',
    rotation: 90
  },
  scaleID: 'x',
  value: 50
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'scatter',
  data,
  options: {
    _sampleId: uniqueId,
    plugins: {
      annotation: {
        annotations: {
          line
        }
      }
    }
  }
};
/* </block:config> */

// <block:utils:2>
document.getElementById('update').addEventListener('input', update);

function update() {
  const newValue = +document.querySelector('input[type=range]').value;
  const chart = Object.values(Chart.instances).find(c => c.options._sampleId === uniqueId);
  chart.data.datasets[0].data[1].x = newValue;
  chart.data.datasets[0].data[2].x = newValue;
  chart.options.plugins.annotation.annotations.line.value = newValue;
  chart.update();
}
// </block:utils>

module.exports = {
  config: config
};
```
