# Label Annotations

Label annotations are used to add contents on the chart area. This can be useful for describing values that are of interest.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        label1: {
          type: 'label',
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

The following options are available for label annotations.

| Name | Type | [Scriptable](../options#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`adjustScaleRange`](#general) | `boolean` | Yes | `true`
| [`backgroundColor`](#styling) | [`Color`](../options#color) | Yes | `transparent`
| [`backgroundShadowColor`](#styling) | [`Color`](../options#color) | Yes | `'transparent'`
| [`borderCapStyle`](#styling) | `string` | Yes | `'butt'`
| [`borderColor`](#styling) | [`Color`](../options#color) | Yes | `options.color`
| [`borderDash`](#styling) | `number[]` | Yes | `[]`
| [`borderDashOffset`](#styling) | `number` | Yes | `0`
| [`borderJoinStyle`](#styling) | `string` | Yes | `'miter'`
| [`borderRadius`](#borderradius) | `number` \| `object` | Yes | `0`
| [`borderShadowColor`](#styling) | [`Color`](../options#color) | Yes | `'transparent'`
| [`borderWidth`](#styling) | `number`| Yes | `0`
| [`callout`](#callout) | `object` | Yes |
| [`color`](#styling) | [`Color`](../options#color) | Yes | `'black'`
| [`content`](#general) | `string`\|`string[]`\|[`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)\|[`HTMLCanvasElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement) | Yes | `null`
| [`display`](#general) | `boolean` | Yes | `true`
| [`drawTime`](#general) | `string` | Yes | `'afterDatasetsDraw'`
| [`font`](#styling) | [`Font`](../options#font) | Yes | `{}`
| [`height`](#general) | `number`\|`string` | Yes | `undefined`
| [`padding`](#general) | [`Padding`](../options#padding) | Yes | `6`
| [`position`](#position) | `string`\|`{x: string, y: string}` | Yes | `'center'`
| [`shadowBlur`](#styling) | `number` | Yes | `0`
| [`shadowOffsetX`](#styling) | `number` | Yes | `0`
| [`shadowOffsetY`](#styling) | `number` | Yes | `0`
| [`textAlign`](#general) | `string` | Yes | `'center'`
| [`width`](#general) | `number`\|`string` | Yes | `undefined`
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

If one of the axes does not match an axis in the chart, the content will be rendered in the center of the chart. The 2 coordinates, xValue, yValue are optional. If not specified, the content will be rendered in the center of the chart.

The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges in the respective direction and the box size is used to calculated the center of the point. To enable to use the box positioning, the `radius` must be set to `0` or `NaN`.

| Name | Description
| ---- | ----
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range.
| `content` | The content to show in the text annotation.
| `display` | Whether or not this annotation is visible.
| `drawTime` | See [drawTime](../options#draw-time).
| `height` | Overrides the height of the image or canvas element. Could be set in pixel by a number, or in percentage of current height of image or canvas element by a string. If undefined, uses the height of the image or canvas element. It is used only when the content is an image or canvas element.
| `padding` | The padding to add around the text label.
| `textAlign` | Text alignment of label content when there's more than one line. Possible options are: `'left'`, `'start'`, `'center'`, `'end'`, `'right'`.
| `width` | Overrides the width of the image or canvas element. Could be set in pixel by a number, or in percentage of current width of image or canvas element by a string. If undefined, uses the width of the image or canvas element. It is used only when the content is an image or canvas element.
| `xAdjust` | Adjustment along x-axis (left-right) of label relative to computed position. Negative values move the label left, positive right.
| `xMax` | Right edge of the box in units along the x axis.
| `xMin` | Left edge of the box in units along the x axis.
| `xScaleID` | ID of the X scale to bind onto, default is 'x'.
| `xValue` | X coordinate of the point in units along the x axis.
| `yAdjust` | Adjustment along y-axis (top-bottom) of label relative to computed position. Negative values move the label up, positive down.
| `yMax` | Bottom edge of the box in units along the y axis.
| `yMin` | Top edge of the box in units along the y axis.
| `yScaleID` | ID of the Y scale to bind onto, default is 'y'.
| `yValue` | Y coordinate of the point in units along the y axis.

### Styling

| Name | Description
| ---- | ----
| `backgroundColor` | Fill color.
| `backgroundShadowColor` | The color of shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderCapStyle` | Cap style of the border line. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderColor` | Stroke color.
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for border line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | Border line joint style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| `borderShadowColor` | The color of the border shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderWidth` | Stroke width (in pixels).
| `color` | Text color.
| `font` | Text font.
| `shadowBlur` | The amount of blur applied to shadow of the box where the label is located. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur).
| `shadowOffsetX` | The distance that shadow, of the box where the label is located, will be offset horizontally. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX).
| `shadowOffsetY` | The distance that shadow, of the box where the label is located, will be offset vertically. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY).

### Position

A position can be set in 2 different values types:

1. `'start'`, `'center'`, `'end'` which are defining where the label will be located
2. a `string`, in percentage format `'number%'`, is representing the percentage on the size where the label will be located

If this value is a string (possible options are `'start'`, `'center'`, `'end'` or a string in percentage format), it is applied to vertical and horizontal position in the box.

If this value is an object, the `x` property defines the horizontal alignment in the label, with respect to the selected point. Similarly, the `y` property defines the vertical alignment in the label, with respect to the selected point. Possible options for both properties are `'start'`, `'center'`, `'end'`, a string in percentage format. Omitted property have value of the default, `'center'`.

#### borderRadius

If this value is a number, it is applied to all corners of the rectangle (topLeft, topRight, bottomLeft, bottomRight). If this value is an object, the `topLeft` property defines the top-left corners border radius. Similarly, the `topRight`, `bottomLeft`, and `bottomRight` properties can also be specified. Omitted corners have radius of 0.

## Callout

A callout connects the label by a line to the selected point.

Namespace: `options.annotations[annotationID].callout`, it defines options for the callout on the annotation label.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    autocolors: false,
    annotation: {
      annotations: {
        label1: {
          type: 'label',
          xValue: 2.5,
          yValue: 60,
          xAdjust: 290,
          yAdjust: -100,
          backgroundColor: 'rgba(245,245,245)',
          content: ['In this point of time,', 'something happened'],
          textAlign: 'start',
          font: {
            size: 18
          },
          callout: {
            enabled: true,
            side: 10
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

All of these options can be [Scriptable](../options#scriptable-options).

| Name | Type | Default | Notes
| ---- | ---- | :----: | ----
| `borderCapStyle` | `string` | `'butt'` | Cap style of the border line of callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderColor` | [`Color`](../options#color) | `undefined` | Stroke color of the pointer of the callout.
| `borderDash` | `number[]` | `[]` | Length and spacing of dashes of callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | `number` | `0` | Offset for line dashes of callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | `string` | `'miter'` | Border line joint style of the callout. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| `borderWidth` | `number` | `1` | Stroke width of the pointer of the callout.
| `enabled` | `boolean` | `false` | If true, the callout is drawn.
| `margin` | `number` | `5` | Amount of pixels between the label and the callout separator.
| `position` | `string` | `'auto'` | The position of callout, with respect to the label. Could be `left`, `top`, `right`, `bottom` or `auto`.
| `side` | `number` | `5` | Width of the starter line of callout pointer.
| `start` | `number`\|`string` | `'50%'` | The percentage of the separator dimension to use as starting point for callout pointer. Could be set in pixel by a number, or in percentage of the separator dimension by a string.
