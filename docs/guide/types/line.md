# Line Annotations

Line annotations are used to draw lines on the chart area. This can be useful for highlighting information such as a threshold.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        line1: {
          type: 'line',
          yMin: 60,
          yMax: 60,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
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

The following options are available for line annotations. All of these options can be .

| Name | Type | [Scriptable](../options#scriptable-options) | Default
| ---- | ---- | ---- | :----: | ----
| [`display`](#general) | `boolean` | Yes | `true`
| [`adjustScaleRange`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`scaleID`](#positioning) | `string` | Yes | `undefined`
| [`value`](#positioning) | `number` | Yes | `undefined`
| [`endValue`](#positioning) | `number` | Yes | `undefined`
| [`xScaleID`](#positioning) | `string` | Yes | `'x'`
| [`yScaleID`](#positioning) | `string` | Yes | `'y'`
| [`xMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`xMax`](#general) | `number` \| `string` | Yes | `undefined`
| [`yMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`yMax`](#general) | `number` \| `string` | Yes | `undefined`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderWidth`](#styling) | `number` | Yes | `1`
| [`borderDash`](#styling) | `number[]` | Yes | `[]`
| [`borderDashOffset`](#styling) | `number` | Yes | `0`
| [`label`](#label) | `object` | Yes |

### General

If one of the axes does not match an axis in the chart, the box will take the entire chart dimension. The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges in the respective direction.

| Name | Description |
| ---- | ---- |
| `display` | Whether or not this annotation is visible
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range
| `drawTime` | See [drawTime](../options#draw-time)

### Positioning

The line can be positioned in two different ways. If `scaleID` is set, then `value` and `endValue` must also be set to indicate the endpoints of the line. The line will be perpendicular to the axis identified by `scaleID`.

If `scaleID` is unset, then `xScaleID` and `yScaleID` are used to draw a line from `(xMin, yMin)` to `(xMax, yMax)`.

| Name | Description |
| ---- | ---- |
| `scaleID` | ID of the scale in single scale mode. If unset, `xScaleID` and `yScaleID` are used.
| `value` | End one of the line when a single scale is specified.
| `endValue` | End two of the line when a single scale is specified.
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `xMin` | X coordinate of end one of the line in units along the x axis.
| `xMax` | X coordinate of end two of the line in units along the x axis.
| `yMin` | Y coordinate of end one of the line in units along the y axis.
| `yMax` | Y coordinate of end two of the line in units along the y axis.

### Styling

| Name | Description |
| ---- | ---- |
| `borderColor` | Stroke color
| `borderWidth` | Stroke width
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `backgroundColor` | Fill color
| `borderRadius` | Radius of box rectangle

### Label

Namespace: `options.annotations[annotationID].label`, it defines options for the line annotation label.

All of these options can be [Scriptable](../options#scriptable-options)

| Name | Type | Default | Notes
| ---- | ---- | :----: | ---- | ----
| `backgroundColor` | [`Color`](../options#color) | `'rgba(0,0,0,0.8)'` | Background color of the label container.
| `color` | [`Color`](../options#color) | `'#fff'` | Text color.
| `content` | `string`\|[`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) | `null` | The content to show in the label.
| [`borderRadius`](#borderradius) | `number` \| `object` | `6` | Radius of label box corners in pixels.
| `drawTime` | `string` | `options.drawTime` | See [drawTime](../options#draw-time). Defaults to the line annotation draw time if unset
| `enabled` | `boolean` | `false` | Whether or not the label is shown.
| `font` | [`Font`](../options#font) | `{ style: 'bold' }` | Label font
| `xPadding` | `number` | `6` | Padding of label to add left/right.
| `yPadding` | `number` | `6` | Padding of label to add top/bottom.
| `xAdjust` | `number` | `0` | Adjustment along x-axis (left-right) of label relative to computed position. Negative values move the label left, positive right.
| `yAdjust` | `number` | `0` | Adjustment along y-axis (top-bottom) of label relative to computed position. Negative values move the label up, positive down.
| `position` | `string` | `'center'` | Anchor position of label on line. Possible options are: `'start'`, `'center'`, `'end'`.
| `textAlign` | `string` | `'center'` | Text alignment of label content when there's more than one line. Possible options are: `'start'`, `'center'`, `'end'`.
| `width` | `number`\|`string` | `undefined` | Overrides the width of the image. Could be set in pixel by a number, or in percentage of current width of image by a string. If undefined, uses the width of the image. It is used only when the content is an image.
| `height` | `number`\|`string` | `undefined` | Overrides the height of the image. Could be set in pixel by a number, or in percentage of current height of image by a string. If undefined, uses the height of the image. It is used only when the content is an image.
| `rotation` | `number`\|`'auto'` | `0` | Rotation of label, in degrees, or 'auto' to use the degrees of the line

#### borderRadius

If this value is a number, it is applied to all corners of the rectangle (topLeft, topRight, bottomLeft, bottomRight). If this value is an object, the `topLeft` property defines the top-left corners border radius. Similarly, the `topRight`, `bottomLeft`, and `bottomRight` properties can also be specified. Omitted corners have radius of 0.
