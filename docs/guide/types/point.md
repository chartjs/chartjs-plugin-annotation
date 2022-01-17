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
| [`adjustScaleRange`](#general) | `boolean` | Yes | `true`
| [`backgroundColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`backgroundShadowColor`](#styling) | [`Color`](../options#color) | Yes | `'transparent'`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderDash`](#styling) | `number[]`| Yes | `[]`
| [`borderDashOffset`](#styling) | `number`| Yes | `0`
| [`borderShadowColor`](#styling) | [`Color`](../options#color) | Yes | `'transparent'`
| [`borderWidth`](#styling) | `number`| Yes | `1`
| [`display`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`pointStyle`](#styling) | [`PointStyle`](../options#point-style) | Yes | `'circle'`
| [`radius`](#general) | `number` | Yes | `10`
| [`rotation`](#general) | `number` | Yes | `0`
| [`shadowBlur`](#styling) | `number` | Yes | `0`
| [`shadowOffsetX`](#styling) | `number` | Yes | `0`
| [`shadowOffsetY`](#styling) | `number` | Yes | `0`
| [`xAdjust`](#general) | `number` | Yes | `0`
| [`xMax`](#general) | `number` \| `string` | Yes | `undefined`
| [`xMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`xScaleID`](#general) | `string` | Yes | `'x'`
| [`xValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`yAdjust`](#general) | `number` | Yes | `0`
| [`yMax`](#general) | `number` \| `string` | Yes | `undefined`
| [`yMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`yScaleID`](#general) | `string` | Yes | `'y'`
| [`yValue`](#general) | `number` \| `string` | Yes | `undefined`

### General

If one of the axes does not match an axis in the chart, the point annotation will take the center of the chart as point. The 2 coordinates, xValue, yValue are optional. If not specified, the point annotation will take the center of the chart as point.

The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges in the respective direction and the box size is used to calculated the center of the point. To enable to use the box positioning, the `radius` must be set to `0` or `NaN`.

| Name | Description
| ---- | ----
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range.
| `display` | Whether or not this annotation is visible.
| `drawTime` | See [drawTime](../options#draw-time).
| `radius` | Size of the point in pixels.
| `rotation` | Rotation of point, in degrees.
| `xAdjust` | Adjustment along x-axis (left-right) of point relative to computed position. Negative values move the point left, positive right.
| `xMax` | Right edge of the box in units along the x axis.
| `xMin` | Left edge of the box in units along the x axis.
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `xValue` | X coordinate of the point in units along the x axis.
| `yAdjust` | Adjustment along y-axis (top-bottom) of point relative to computed position. Negative values move the point up, positive down.
| `yMax` | Bottom edge of the box in units along the y axis.
| `yMin` | Top edge of the box in units along the y axis.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `yValue` | Y coordinate of the point in units along the y axis.

### Styling

| Name | Description
| ---- | ----
| `backgroundColor` | Fill color.
| `backgroundShadowColor` | The color of shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderColor` | Stroke color.
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderShadowColor` | The color of border shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderWidth` | Stroke width.
| `pointStyle` | Style of the point.
| `shadowBlur` | The amount of blur applied to shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur).
| `shadowOffsetX` | The distance that shadow will be offset horizontally. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX).
| `shadowOffsetY` | The distance that shadow will be offset vertically. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY).
