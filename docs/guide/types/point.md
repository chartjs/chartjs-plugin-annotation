# Point Annotations

Point annotations are used to mark points on the chart area. This can be useful for highlighting values that are of interest.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        point1: {
          type: 'point',
          xValue: 1,
          yValue: 60,
          backgroundColor: 'rgba(255, 99, 132, 0.25)'
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

## Configuration

The following options are available for ellipse annotations.

| Name | Type | [Scriptable](../options#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`display`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`xScaleID`](#general) | `string` | Yes | `'x'`
| [`yScaleID`](#general) | `string` | Yes | `'y'`
| [`xValue`](#general) | `number` | Yes | `undefined`
| [`yValue`](#general) | `number` | Yes | `undefined`
| [`radius`](#general) | `number` | Yes | `10`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderWidth`](#styling) | `number`| Yes | `1`
| [`borderDash`](#styling) | `number[]`| Yes | `[]`
| [`borderDashOffset`](#styling) | `number`| Yes | `0`
| [`backgroundColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`

### General

If one of the axes does not match an axis in the chart, the ellipse will take the entire chart dimension. The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the ellipse is expanded out to the edges in the respective direction.

| Name | Description |
| ---- | ---- |
| `display` | Whether or not this annotation is visible
| `drawTime` | See [drawTime](../options#draw-time)
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `xValue` | X coordinate of the point in units along the x axis.
| `yValue` | Y coordinate of the point in units along the y axis.
| `radius` | Size of the point in pixels

### Styling

| Name | Description |
| ---- | ---- |
| `borderColor` | Stroke color
| `borderWidth` | Stroke width
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `backgroundColor` | Fill color
