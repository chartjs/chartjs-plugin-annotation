# 1.x Migration Guide

**`chartjs-plugin-annotation`** plugin version 1 introduces a number of breaking changes in order to compatible with Chart.js 3 and to align with Chart.js 3 options.

## Setup and installation

Chart.js 3 is tree-shakeable and thus requires registering the plugins when used as an `npm` module. Here is an example:

```javascript
import { Chart, LineController, LineElement, PointElement, LinearScale } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';

Chart.register(LineController, LineElement, PointElement, LinearScale, Annotation);

const Chart = new Chart(ctx, {
    type: 'line',
    // data: ...
    options: {
        plugins: {
            annotation: {
                // annotation plugin options
                annotations: [{
                    // annotation element options
                    type: 'line',
                    scaleID: 'y',
                    value: 25,
                    borderColor: 'red',
                    borderWidth: 2
                }]
            }
        }
    }
}):
```

## Options

### Plugin options

* `events` array was removed. Listened events are determined automatically from the hooks specified.
* `enter`, `leave`, `click`, `dblclick` event hooks can now be defined also at plugin level options.

### Element options

* `onMouseenter` was removed. Use `enter` instead.
* `onMouseleave` was removed. Use `leave` instead.
* `onMouseover` was removed. Use `enter` instead.
* `onMouseout` was removed. Use `leave` instead.
* `onMousemove` was removed.
* `onMousedown` was removed. Use `click` instead.
* `onMouseup` was removed. Use `click` instead.
* `onClick` was removed. Use `click` instead.
* `onDblclick` was removed. Use `dblclick` instead.
* `onContextmenu` was removed.
* `onWheel` was removed.

### Line

* `mode` was removed. The mode is automatically calculated based on the scale.
* `position` values were changed to `'start'`, `'center'` and `'end'`.
  * `'start'` replaces previous `'left'` and `'top'`.
  * `'end'` replaces previous `'right'` and `'bottom'`.

#### Label

* `fontColor` was renamed to `font.color`
* `fontFamily` was renamed to `font.family`
* `fontSize` was renamed to `font.size`
* `fontStyle` was renamed to `font.style`
* `lineHeight` was renamed to `font.lineHeight`

## Event hooks

* Event hooks are now supplied with single `context` parameter, containing `chart` and `element` properties. `chart` is the chart instance and `element` is the event target annotation element.
* Events are now fired from `beforeEvent` hook.
