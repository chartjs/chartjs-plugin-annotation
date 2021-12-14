# Box Annotations

Box annotations are used to draw rectangles on the chart area. This can be useful for highlighting different areas of a chart.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        box1: {
          type: 'box',
          xMin: 1,
          xMax: 2,
          yMin: 50,
          yMax: 70,
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

The following options are available for box annotations.

| Name | Type | [Scriptable](../options#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`adjustScaleRange`](#general) | `boolean` | Yes | `true`
| [`backgroundColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderCapStyle`](#styling) | `string` | Yes | `'butt'`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderDash`](#styling) | `number[]` | Yes | `[]`
| [`borderDashOffset`](#styling) | `number` | Yes | `0`
| [`borderJoinStyle`](#styling) | `string` | Yes | `'miter'`
| [`borderRadius`](#styling) | `number` \| `object` | Yes | `0`
| [`borderWidth`](#styling) | `number`| Yes | `1`
| [`display`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`xScaleID`](#general) | `string` | Yes | `'x'`
| [`yScaleID`](#general) | `string` | Yes | `'y'`
| [`xMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`xMax`](#general) | `number` \| `string` | Yes | `undefined`
| [`yMin`](#general) | `number` \| `string` | Yes | `undefined`
| [`yMax`](#general) | `number` \| `string` | Yes | `undefined`
| [`label`](#label) | `object` | Yes |

### General

If one of the axes does not match an axis in the chart, the box will take the entire chart dimension. The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges in the respective direction.

| Name | Description |
| ---- | ---- |
| `display` | Whether or not this annotation is visible
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range
| `drawTime` | See [drawTime](../options#draw-time)
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `xMin` | Left edge of the box in units along the x axis.
| `xMax` | Right edge of the box in units along the x axis.
| `yMin` | Top edge of the box in units along the y axis.
| `yMax` | Bottom edge of the box in units along the y axis.

### Styling

| Name | Description |
| ---- | ---- |
| `backgroundColor` | Fill color.
| `borderColor` | Stroke color.
| `borderCapStyle` | Cap style of the border line. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for border line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | Border line joint style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| [`borderRadius`](#borderradius) | Radius of box rectangle (in pixels)
| `borderWidth` | Border line width (in pixels).

#### borderRadius

If this value is a number, it is applied to all corners of the rectangle (topLeft, topRight, bottomLeft, bottomRight). If this value is an object, the `topLeft` property defines the top-left corners border radius. Similarly, the `topRight`, `bottomLeft`, and `bottomRight` properties can also be specified. Omitted corners have radius of 0.

### Label

Namespace: `options.annotations[annotationID].label`, it defines options for the box annotation label.

All of these options can be [Scriptable](../options#scriptable-options)

| Name | Type | Default | Notes
| ---- | ---- | :----: | ---- | ----
| `color` | [`Color`](../options#color) | `'#fff'` | Text color.
| `content` | `string`\|`string[]`\|[`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)\|[`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) | `null` | The content to show in the label.
| `drawTime` | `string` | `options.drawTime` | See [drawTime](../options#draw-time). Defaults to the box annotation draw time if unset
| `enabled` | `boolean` | `false` | Whether or not the label is shown.
| `font` | [`Font`](../options#font) | `{ weight: 'bold' }` | Label font
| `height` | `number`\|`string` | `undefined` | Overrides the height of the image or canvas element. Could be set in pixel by a number, or in percentage of current height of image or canvas element by a string. If undefined, uses the height of the image or canvas element. It is used only when the content is an image or canvas element.
| `padding` | [`Padding`](../options#padding) | `6` | The padding to add around the text label.
| [`position`](#position) | `string`\|`{x: string, y: string}` | `'center'` | Anchor position of label in the box.
| `textAlign` | `string` | `'center'` | Text alignment of label content when there's more than one line. Possible options are: `'left'`, `'start'`, `'center'`, `'end'`, `'right'`.
| `width` | `number`\|`string` | `undefined` | Overrides the width of the image or canvas element. Could be set in pixel by a number, or in percentage of current width of image or canvas element by a string. If undefined, uses the width of the image or canvas element. It is used only when the content is an image or canvas element.
| `xAdjust` | `number` | `0` | Adjustment along x-axis (left-right) of label relative to computed position. Negative values move the label left, positive right.
| `yAdjust` | `number` | `0` | Adjustment along y-axis (top-bottom) of label relative to computed position. Negative values move the label up, positive down.

#### Position

A position can be set in 2 different values types:

1. `'start'`, `'center'`, `'end'` which are defining where the label will be located
2. a `string`, in percentage format `'number%'`, is representing the percentage on the size where the label will be located

If this value is a string (possible options are `'start'`, `'center'`, `'end'` or a string in percentage format), it is applied to vertical and horizontal position in the box.

If this value is an object, the `x` property defines the horizontal alignment in the box. Similarly, the `y` property defines the vertical alignment in the box. Possible options for both properties are `'start'`, `'center'`, `'end'`, a string in percentage format. Omitted property have value of the default, `'center'`.
