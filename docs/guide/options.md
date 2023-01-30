# Options

## Color

Any color supported by [chart.js](https://www.chartjs.org/docs/master/general/colors) is supported by the annotation plugin.

## Font

Fonts use the same format as [chart.js](https://www.chartjs.org/docs/master/general/fonts).

## Padding

Paddings use the same format as [chart.js](https://www.chartjs.org/docs/master/general/padding.html).

## Point Style

Point styles use the same format as [chart.js](https://www.chartjs.org/docs/master/configuration/elements.html#point-styles).

## Interaction

Interaction uses the same format as [chart.js](https://www.chartjs.org/docs/latest/configuration/interactions.html#interactions). 

:::warning

Interaction `index` and `dataset` modes are not supported by the plugin. If set, the plugin will use `nearest` mode.

Interaction `r` axis is not supported by the plugin. If set, the plugin will use `xy` mode.

:::

## Scriptable Options

As with most options in chart.js, the annotation plugin options are scriptable. This means that a function can be passed which returns the value as needed. In the example below, the annotation is hidden when the screen is less than 1000px wide.
The function receives 2 arguments, first is the [option context](#option-context) representing contextual information. An options resolver is passed as second argument, which can be used to access the options that were originally passed in to configure the annotation element.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    annotation: {
      annotations: {
        box1: {
          drawTime: 'afterDatasetsDraw',
          display: (context, opts) => {
            const body = document.querySelector('body');
            const rect = body.getBoundingClientRect();
            return rect.width >= 1000;
          },
          type: 'box',
          xMin: 1,
          xMax: 2,
          yMin: 50,
          yMax: 70,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      }
    }
  }
};
/* </block:options> */

/* <block:config:1> */
const config = {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  },
  options
};
/* </block:config> */

module.exports = {
  config
};
```

## Draw Time

The `drawTime` option for an annotation determines where in the chart lifecycle the drawing occurs. Four potential options are available:

| Option | Notes
| ---- | ----
| `'beforeDraw'` | Occurs before any drawing takes place
| `'beforeDatasetsDraw'` | Occurs after drawing of axes, but before datasets
| `'afterDatasetsDraw'` | Occurs after drawing of datasets but before items such as the tooltip
| `'afterDraw'` | After other drawing is completed.

## Option Context

The option context is used to give contextual information when resolving options and only applies to scriptable options. The object is preserved, so it can be used to store and pass information between calls / options.

There are 2 levels of option context objects:

* `chart`
  * `annotation`

The context object contains the following properties:

### chart

* `chart`: the associated chart
* `type`: `'chart'`

The [chart](#chart) option context is provided by Chart.js. It is passed to scriptable options when resolving annotation `id`, `type` and `drawTime` or adjusting scale ranges in `afterDataLimits` hook. The options resolved at that time are `scaleID`, `xScaleID`, `yScaleID`, `value`, `endValue`, `xMin`, `xMax`, `yMin`, `yMax`, `xValue` and `yValue`.

### annotation

In addition to [chart](#chart)

* `id`: the annotation id
* `element`: the annotation element
* `type`: `'annotation'`

The [annotation](#annotation) option context is passed to scriptable options in all other cases, except when resolving `id`, `type` or adjusting scale ranges. The same values resolved in `afterDataLimits` with [chart](#chart) context are again evaluated in `afterUpdate` with [annotation](#annotation) context.

Note that the annotation element may be undefined or partially uninitialized, since scriptable options may be invoked during the initial chart display, before everything's been resolved and initialized.
