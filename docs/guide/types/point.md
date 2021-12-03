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

The following options are available for point annotations.

| Name | Type | [Scriptable](../options#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`display`](#general) | `boolean` | Yes | `true`
| [`adjustScaleRange`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`xScaleID`](#general) | `string` | Yes | `'x'`
| [`yScaleID`](#general) | `string` | Yes | `'y'`
| [`xValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`yValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`radius`](#general) | `number` | Yes | `10`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderWidth`](#styling) | `number`| Yes | `1`
| [`borderDash`](#styling) | `number[]`| Yes | `[]`
| [`borderDashOffset`](#styling) | `number`| Yes | `0`
| [`backgroundColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`xMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`xMax`](#general) | `number` \| `string` | Yes | `undefined`
| [`yMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`yMax`](#general) | `number` \| `string` | Yes | `undefined`

### General

If one of the axes does not match an axis in the chart, the point annotation will take the center of the chart as point. The 2 coordinates, xValue, yValue are optional. If not specified, the point annotation will take the center of the chart as point.

The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges in the respective direction and the box size is used to calculated the center of the point. To enable to use the box positioning, the `radius` must be set to `0` or `NaN`. 


| Name | Description |
| ---- | ---- |
| `display` | Whether or not this annotation is visible
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range
| `drawTime` | See [drawTime](../options#draw-time)
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `xValue` | X coordinate of the point in units along the x axis.
| `yValue` | Y coordinate of the point in units along the y axis.
| `radius` | Size of the point in pixels
| `xMin` | Left edge of the box in units along the x axis.
| `xMax` | Right edge of the box in units along the x axis.
| `yMin` | Top edge of the box in units along the y axis.
| `yMax` | Bottom edge of the box in units along the y axis.

### Styling

| Name | Description |
| ---- | ---- |
| `borderColor` | Stroke color
| `borderWidth` | Stroke width
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `backgroundColor` | Fill color
