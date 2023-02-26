# Line Annotations

Line annotations are used to draw lines on the chart area. This can be useful for highlighting information such as a threshold.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
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

### Line annotation specific options

The following options are available for line annotations.

| Name | Type | [Scriptable](../options.md#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`arrowHeads`](#arrow-heads) | `{start: object, end:object}` | Yes |
| [`borderWidth`](#styling) | `number` | Yes | `2`
| [`controlPoint`](#general) | `number` \| `string` \| `{x: number | string, y: number | string}` | Yes | `{y:'-50%'}`
| [`curve`](#general) | `boolean` | Yes | `false`
| [`endValue`](#positioning) | `number` | Yes | `undefined`
| [`label`](#label) | `object` | Yes |
| [`scaleID`](#positioning) | `string` | Yes | `undefined`
| [`value`](#positioning) | `number` | Yes | `undefined`

!!!include(./guide/types/_commonOptions.md)!!!

### General

If one of the axes does not match an axis in the chart then the line behaviors are the following, depending on how the line should be drawn:

1. if `scaleID` is not resolved, the line will take the entire chart dimension, from the top-left vertex to the bottom-right vertex of the chart
1. if `xScaleID` is not resolved, the line will take the entire chart width
1. if `yScaleID` is not resolved, the line will take the entire chart height

The 2 coordinates, start, end, are optional. If not specified, the line is expanded out to the edges in the respective direction.
The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the line is expanded out to the edges in the respective direction.

The `id` identifies a unique id  for the annotation and it will be stored in the element context. When the annotations are defined by an object, the id is automatically set using the key used to store the annotations in the object. When the annotations are configured by an array, the id, passed by this option in the annotation, will be used. 

#### Positioning

The line can be positioned in two different ways. If `scaleID` is set, then `value` and `endValue` must also be set to indicate the endpoints of the line. The line will be perpendicular to the axis identified by `scaleID`.

If `scaleID` is unset, then `xScaleID` and `yScaleID` are used to draw a line from `(xMin, yMin)` to `(xMax, yMax)`.

| Name | Description
| ---- | ----
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range.
| `controlPoint` | if `curve` is enabled, it configures the control point to drawn the curve, calculated in pixels. It can be set by a string in percentage format `'number%'` which are representing the percentage of the distance between the start and end point from the center.
| `curve` | Whether or not a quadratic [Bézier curve](https://developer.mozilla.org/en-US/docs/Glossary/Bezier_curve) is drawn.
| `display` | Whether or not this annotation is visible.
| `drawTime` | See [drawTime](../options.md#draw-time).
| `endValue` | End two of the line when a single scale is specified.
| `scaleID` | ID of the scale in single scale mode. If unset, `xScaleID` and `yScaleID` are used.
| `value` | End one of the line when a single scale is specified.
| `xMax` | X coordinate of end two of the line in units along the x axis.
| `xMin` | X coordinate of end one of the line in units along the x axis.
| `xScaleID` | ID of the X scale to bind onto. If missing, the plugin will try to use the scale of the chart, configured as `'x'` axis. If more than one scale has been defined in the chart as `'x'` axis, the option is mandatory to select the right scale.
| `yMax` | Y coordinate of end two of the line in units along the y axis.
| `yMin` | Y coordinate of end one of the line in units along the y axis.
| `yScaleID` | ID of the Y scale to bind onto. If missing, the plugin will try to use the scale of the chart, configured as `'y'` axis. If more than one scale has been defined in the chart as `'y'` axis, the option is mandatory to select the right scale.
| `z` | The `z` property determines the drawing stack level of the line annotation element. All visible elements will be drawn in ascending order of `z` option, with the same `drawTime` option.

### Styling

| Name | Description
| ---- | ----
| `borderColor` | Stroke color.
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderShadowColor` | The color of shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderWidth` | Stroke width.
| `shadowBlur` | The amount of blur applied to shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur).
| `shadowOffsetX` | The distance that shadow will be offset horizontally. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX).
| `shadowOffsetY` | The distance that shadow will be offset vertically. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY).

## Label

Namespace: `options.annotations[annotationID].label`, it defines options for the line annotation label.

All of these options can be [Scriptable](../options.md#scriptable-options)

| Name | Type | Default | Notes
| ---- | ---- | :----: | ----
| `backgroundColor` | [`Color`](../options.md#color) | `'rgba(0,0,0,0.8)'` | Background color of the label container.
| `backgroundShadowColor` | [`Color`](../options.md#color) | `'transparent'` | The color of shadow of the box where the label is located. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderCapStyle` | `string` | `'butt'` | Cap style of the border line. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderColor` | [`Color`](../options.md#color) | `black` | The border line color.
| `borderDash` | `number[]` | `[]` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | `number` | `0` | Offset for border line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | `string` | `'miter'` | Border line join style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| [`borderRadius`](#borderradius) | `number` \| `object` | `6` | Radius of label box corners in pixels.
| `borderShadowColor` | [`Color`](../options.md#color) | `'transparent'` | The color of border shadow of the box where the label is located. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderWidth` | `number` | `0` | The border line width (in pixels).
| [`callout`](#callout) | `object` | | Can connect the label to the line. See [callout](#callout).
| [`color`](#fonts-and-colors) | [`Color`\|`Color[]`](../options#color) | `'#fff'` | Text color.
| `content` | `string`\|`string[]`\|[`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)\|[`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) | `null` | The content to show in the label.
| `display` | `boolean` | `false` | Whether or not the label is shown.
| `drawTime` | `string` | `options.drawTime` | See [drawTime](../options#draw-time). Defaults to the line annotation draw time if unset.
| [`font`](#fonts-and-colors) | [`Font`\|`Font[]`](../options#font) | `{ weight: 'bold' }` | Label font.
| `height` | `number`\|`string` | `undefined` | Overrides the height of the image or canvas element. Could be set in pixel by a number, or in percentage of current height of image or canvas element by a string. If undefined, uses the height of the image or canvas element. It is used only when the content is an image or canvas element.
| `opacity` | `number` | `undefined` | Overrides the opacity of the image or canvas element. Could be set a number in the range 0.0 to 1.0, inclusive. If undefined, uses the opacity of the image or canvas element. It is used only when the content is an image or canvas element.
| `padding` | [`Padding`](../options.md#padding) | `6` | The padding to add around the text label.
| `position` | `string` | `'center'` | Anchor position of label on line. Possible options are: `'start'`, `'center'`, `'end'`. It can be set by a string in percentage format `'number%'` which are representing the percentage on the width of the line where the label will be located.
| `rotation` | `number`\|`'auto'` | `0` | Rotation of label, in degrees, or 'auto' to use the degrees of the line.
| `shadowBlur` | `number` | `0` | The amount of blur applied to shadow of the box where the label is located. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur).
| `shadowOffsetX` | `number` | `0` | The distance that shadow, of the box where the label is located, will be offset horizontally. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX).
| `shadowOffsetY` | `number` | `0` | The distance that shadow, of the box where the label is located, will be offset vertically. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY).
| `textAlign` | `string` | `'center'` | Text alignment of label content when there's more than one line. Possible options are: `'start'`, `'center'`, `'end'`.
| `textStrokeColor` | [`Color`](../options.md#color) | `undefined` | The color of the stroke around the text.
| `textStrokeWidth` | `number` | `0` | Stroke width around the text.
| `width` | `number`\|`string` | `undefined` | Overrides the width of the image or canvas element. Could be set in pixel by a number, or in percentage of current width of image or canvas element by a string. If undefined, uses the width of the image or canvas element. It is used only when the content is an image or canvas element.
| `xAdjust` | `number` | `0` | Adjustment along x-axis (left-right) of label relative to computed position. Negative values move the label left, positive right.
| `yAdjust` | `number` | `0` | Adjustment along y-axis (top-bottom) of label relative to computed position. Negative values move the label up, positive down.
| `z` | `number` | `0` | It determines the drawing stack level of the label element, with same `drawTime`.

### borderRadius

If this value is a number, it is applied to all corners of the rectangle (topLeft, topRight, bottomLeft, bottomRight). If this value is an object, the `topLeft` property defines the top-left corners border radius. Similarly, the `topRight`, `bottomLeft`, and `bottomRight` properties can also be specified. Omitted corners have radius of 0.

### Fonts and colors

When the label to draw has multiple lines, you can use different font and color for each line of the label. This is enabled configuring an array of fonts or colors for those options. When the lines are more than the configured fonts of colors, the last configuration of those options is used for all remaining lines.

### Callout

A callout can connect the label to the line when the label is arbitrarily (by `xAdjust` and `yAdjust` options) moved from its original position.

Namespace: `options.annotations[annotationID].label.callout`, it defines options for the callout on the label of the line annotation.

All of these options can be [Scriptable](../options.md#scriptable-options).

| Name | Type | Default | Notes
| ---- | ---- | :----: | ----
| `borderCapStyle` | `string` | `'butt'` | Cap style of the border line of callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderColor` | [`Color`](../options.md#color) | `undefined` | Stroke color of the pointer of the callout.
| `borderDash` | `number[]` | `[]` | Length and spacing of dashes of callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | `number` | `0` | Offset for line dashes of callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | `string` | `'miter'` | Border line join style of the callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| `borderWidth` | `number` | `1` | Stroke width of the pointer of the callout.
| `display` | `boolean` | `false` | If true, the callout is drawn.
| `margin` | `number` | `5` | Amount of pixels between the label and the callout separator.
| `position` | `string` | `'auto'` | The position of callout, with respect to the label. Could be `left`, `top`, `right`, `bottom` or `auto`.
| `side` | `number` | `5` | Width of the starter line of callout pointer.
| `start` | `number`\|`string` | `'50%'` | The percentage of the separator dimension to use as starting point for callout pointer. Could be set in pixel by a number, or in percentage of the separator dimension by a string.

## Arrow heads

Namespace: `options.annotations[annotationID].arrowHeads`, it defines options for the line annotation arrow heads.

All of these options can be [Scriptable](../options.md#scriptable-options)

| Name | Type | Notes
| ---- | ---- | ----
| [`end`](#arrow-head-configuration) | `object` | To configure the arrow head at the end of the line.
| [`start`](#arrow-head-configuration) | `object` | To configure the arrow head at the start of the line.

### Arrow head configuration

Enabling it, you can add arrow heads at start and/or end of a line. It uses the `borderWidth` of the line options to configure the line width of the arrow head.

The following options can be specified per (`start` and/or `end`) arrow head, or at the top level (`arrowHeads`) which apply to all arrow heads.

All of these options can be [Scriptable](../options.md#scriptable-options)

| Name | Type | Default | Notes
| ---- | ---- | :----: | ---- 
| `backgroundColor` | [`Color`](../options.md#color) | `lineAnnotation.borderColor` | Background color of the arrow head.
| `backgroundShadowColor` | [`Color`](../options.md#color) | `'transparent'` | The color of shadow of the arrow head. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderColor` | [`Color`](../options.md#color) | `lineAnnotation.borderColor` | The border arrow head color.
| `borderDash` | `number[]` | `lineAnnotation.borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | `number` | `lineAnnotation.borderDashOffset` | Offset for border arrow head dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderShadowColor` | [`Color`](../options.md#color) | `lineAnnotation.borderShadowColor` | The color of border shadow of the arrow head. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderWidth` | `number` | `lineAnnotation.borderWidth` | The border line width (in pixels).
| `display` | `boolean` | `false` | Whether or not the arrow head is shown.
| `fill` | `boolean` | `false` | Whether or not the arrow head is filled.
| `length` | `number` | `12` | The length of the arrow head in pixels.
| `shadowBlur` | `number` | `lineAnnotation.shadowBlur` | The amount of blur applied to shadow of the arrow head. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur).
| `shadowOffsetX` | `number` | `lineAnnotation.shadowOffsetX` | The distance that shadow, of the arrow head, will be offset horizontally. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX).
| `shadowOffsetY` | `number` | `lineAnnotation.shadowOffsetY` | The distance that shadow, of the arrow head, will be offset vertically. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY).
| `width` | `number` | `6` | The width of the arrow head in pixels.

## Element

The following diagram is showing the element properties about a `'line'` annotation:

![line](../../img/elementLineProps.png)

The label of a box annotation is described as a [label annotation](./label.md#element) and accessible by `element.label`.
