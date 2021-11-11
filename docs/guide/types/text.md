# Text Annotations

Text annotations are used to add text content on the chart area. This can be useful for describing values that are of interest.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        text1: {
          type: 'text',
          xValue: 2.5,
          yValue: 60,
          backgroundColor: 'rgba(245,245,245)',
          content: ['This is my text', 'This is my text, second line'],
          font: {
            size: 18
          }
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

The following options are available for text annotations.

| Name | Type | [Scriptable](../options#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`adjustScaleRange`](#general) | `boolean` | Yes | `true`
| [`align`](#align) | `string` | Yes | `'center'`
| [`display`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`xScaleID`](#general) | `string` | Yes | `'x'`
| [`yScaleID`](#general) | `string` | Yes | `'y'`
| [`xValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`yValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`backgroundColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderWidth`](#styling) | `number`| Yes | `1`
| [`borderDash`](#styling) | `number[]`| Yes | `[]`
| [`borderDashOffset`](#styling) | `number`| Yes | `0`
| [`borderRadius`](#borderradius) | `number` \| `object` | Yes | `6`
| [`color`](#styling) | [`Color`](../options#color) | Yes | `'#fff'`
| [`content`](#general) | `string`\|`string[]` | Yes | `null`
| [`font`](#styling) | [`Font`](../options#font) | Yes | `{}`
| [`xPadding`](#general) | `number` | Yes | `6`
| [`yPadding`](#general) | `number` | Yes | `6`
| [`xAdjust`](#general) | `number` | Yes | `0`
| [`yAdjust`](#general) | `number` | Yes | `0`
| [`position`](#position) | `string` | Yes | `'middle'`
| [`textAlign`](#general) | `string` | Yes | `'center'`

### General

If one of the axes does not match an axis in the chart, the text will be rendered in the center of the chart. The 2 coordinates, xValue, yValue are optional. If not specified, the text will be rendered in the center of the chart.

| Name | Description |
| ---- | ---- |
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range
| `content` | The content to show in the text annotation.
| `display` | Whether or not this annotation is visible
| `drawTime` | See [drawTime](../options#draw-time).
| `textAlign` | Text alignment of label content when there's more than one line. Possible options are: `'start'`, `'center'`, `'end'`.
| `xAdjust` | Adjustment along x-axis (left-right) of label relative to computed position. Negative values move the label left, positive right.
| `xPadding` | Padding of label to add left/right.
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `xValue` | X coordinate of the point in units along the x axis.
| `yAdjust` | Adjustment along y-axis (top-bottom) of label relative to computed position. Negative values move the label up, positive down.
| `yPadding` | Padding of label to add top/bottom.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `yValue` | Y coordinate of the point in units along the y axis.

### Styling

| Name | Description |
| ---- | ---- |
| `borderColor` | Stroke color.
| `borderWidth` | Stroke width.
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `backgroundColor` | Fill color.
| `color` | Text color.
| `font` | Text font.

### Align

The align property specifies the text horizontal position of the label with respect to the selected point. The possible values are:

* `center`: the text is centered. It is the default.
* `left`: the text is left-aligned with respect to the selected point.
* `right`: the text is right-aligned with respect to the selected point.

### Position

The position property specifies the text vertical position of the label with respect to the selected point. The possible values are:

* `middle`: the text is centered with respect to the selected point. It is the default.
* `top`: the text is in the top with respect to the selected point.
* `bottom`: the text is in the bottom with respect to the selected point.

#### borderRadius

If this value is a number, it is applied to all corners of the rectangle (topLeft, topRight, bottomLeft, bottomRight). If this value is an object, the `topLeft` property defines the top-left corners border radius. Similarly, the `topRight`, `bottomLeft`, and `bottomRight` properties can also be specified. Omitted corners have radius of 0.