# Polygin Annotations

Polygin annotations are used to mark whatever polygon (for instance triangle, square or pentagon) on the chart area. This can be useful for highlighting values that are of interest.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        pentagon: {
          type: 'polygon',
          xValue: 1,
          yValue: 60,
          sides: 5,
          radius: 60,
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

The following options are available for polygon annotations.

| Name | Type | [Scriptable](../options#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`adjustScaleRange`](#general) | `boolean` | Yes | `true`
| [`backgroundColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderCapStyle`](#styling) | `string` | Yes | `'butt'`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderDash`](#styling) | `number[]`| Yes | `[]`
| [`borderDashOffset`](#styling) | `number`| Yes | `0`
| [`borderJoinStyle`](#styling) | `string` | Yes | `'miter'`
| [`borderWidth`](#styling) | `number`| Yes | `1`
| [`display`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`xScaleID`](#general) | `string` | Yes | `'x'`
| [`yScaleID`](#general) | `string` | Yes | `'y'`
| [`xValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`yValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`radius`](#general) | `number` | Yes | `10`
| [`rotation`](#general) | `number` | Yes | `0`
| [`sides`](#general) | `number` | Yes | `3`

### General

If one of the axes does not match an axis in the chart, the polygon annotation will take the center of the chart as point. The 2 coordinates, xValue, yValue are optional. If not specified, the polygon annotation will take the center of the chart.

| Name | Description |
| ---- | ---- |
| `display` | Whether or not this annotation is visible.
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range.
| `drawTime` | See [drawTime](../options#draw-time).
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `xValue` | X coordinate of the polygon in units along the x axis.
| `yValue` | Y coordinate of the polygon in units along the y axis.
| `radius` | Size of the polygon in pixels.
| `rotation` | Rotation of polygon, in degrees.
| `sides` | Amount of sides of polygon.

### Styling

| Name | Description |
| ---- | ---- |
| `backgroundColor` | Fill color
| `borderColor` | Stroke color
| `borderCapStyle` | Cap style of the border of polygon. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | Border line joint style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| `borderWidth` | Stroke width
