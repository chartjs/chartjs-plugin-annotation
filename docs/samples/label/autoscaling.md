# Auto scaling

<input id="update" type="range" min="46" max="100" value="100" step="2" style="width:100%"/>

```js chart-editor
// <block:setup:4>
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
  content: ['Annotation', 'to resize'],
  drawTime: 'afterDraw',
  borderWidth: (ctx) => autoScaling(ctx, 'borderWidth', 2),
  font: (ctx) => autoScaling(ctx, 'font', 48),
  padding: (ctx) => autoScaling(ctx, 'padding', 6),
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

// <block:autoScaling:2>
function autoScaling(ctx, option, origValue) {
  const {chart} = ctx;
  const {width, height} = chart.chartArea;
  const hypo = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  let size, value;
  if (!ctx.size) {
    ctx.size = size = hypo;
    value = origValue;
  } else {
    size = ctx.size;
    value = hypo / size * origValue;
  }
  if (option === 'font') {
    return {size: value};
  }
  return value;
}
// </block:autoScaling>

// <block:utils:3>
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
// </block:utils>

module.exports = {
  config: config
};
```
