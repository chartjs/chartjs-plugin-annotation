# Auto scaling

<input id="update" type="range" min="45" max="100" value="100" step="5" style="width:100%"/>

```js chart-editor
// <block:setup:3>
const uniqueId = new Date().getTime();

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

// <block:annotation:1>
const annotation = {
  type: 'label',
  backgroundColor: 'whiteSmoke',
  borderColor: 'lightGray',
  borderRadius: 6,
  borderWidth: 2,
  content: ['Annotation', 'to resize'],
  drawTime: 'afterDraw',
  font: (ctx) => autoScaling(ctx)
};
// </block:annotation>

/* <block:config:0> */
const config = {
  type: 'line',
  data,
  options: {
    _sampleId: uniqueId,
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
let originalArea;
document.getElementById('update').addEventListener('input', update);

function update() {
  const ratio = +document.querySelector('input[type=range]').value / 100;
  const chart = Object.values(Chart.instances).find(c => c.options._sampleId === uniqueId);
  if (!originalArea) {
    originalArea = chart.chartArea;
  }
  const w = originalArea.width * ratio;
  const h = originalArea.height * ratio;
  chart.resize(w, h);
}

function autoScaling(ctx) {
  const {chart, original} = ctx;
  const {width, height} = chart.chartArea;
  const hypo = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  if (!original) {
    ctx.original = {
      fontSize: 48,
      size: hypo
    };
    return {size: 48};
  }
  const {fontSize, size} = original;
  const newFontSize = hypo / size * fontSize;
  return {size: newFontSize};
}
// </block:utils>

module.exports = {
  config: config
};
```
