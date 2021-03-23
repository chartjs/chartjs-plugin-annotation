# Options

## Color

Any color supported by [chart.js](https://www.chartjs.org/docs/master/general/colors) is supported by the annotation plugin.

## Font

Fonts use the same format as [chart.js](https://www.chartjs.org/docs/master/general/fonts).

## Scriptable Options

As with most options in chart.js, the annotation plugin options are scriptable. This means that a function can be passed which returns the value as needed. In the example below, the annotation is hidden when the screen is less than 1000px wide

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        box1: {
          drawTime: 'afterDatasetsDraw',
          display: (context) => {
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
}
```

## Draw Time

The `drawTime` option for an annotation determines where in the chart lifecycle the drawing occurs. Four potential options are available:

| Option | Notes
| ---- | ----
| `'beforeDraw'` | Occurs before any drawing takes place
| `'beforeDatasetsDraw'` | Occurs after drawing of axes, but before datasets
| `'afterDatasetsDraw'` | Occurs after drawing of datasets but before items such as the tooltip
| `'afterDraw'` | After other drawing is completed.
