# Polygon Annotations

Polygon annotations are used to mark whatever polygon (for instance triangle, square or pentagon) on the chart area. This can be useful for highlighting values that are of interest.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
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

### Polygon annotation specific options

The following options are available for polygon annotations.

| Name | Type | [Scriptable](../options.md#scriptable-options) | Default
| ---- | ---- | :----: | ----
| [`backgroundShadowColor`](#styling) | [`Color`](../options.md#color) | Yes | `'transparent'`
| [`borderCapStyle`](#styling) | `string` | Yes | `'butt'`
| [`borderJoinStyle`](#styling) | `string` | Yes | `'miter'`
| [`borderWidth`](#styling) | `number`| Yes | `1`
| [`point`](#point) | `object` | Yes | `{radius: 0}`
| [`radius`](#general) | `number` | Yes | `10`
| [`rotation`](#general) | `number` | Yes | `0`
| [`sides`](#general) | `number` | Yes | `3`
| [`xAdjust`](#general) | `number` | Yes | `0`
| [`xValue`](#general) | `number` \| `string` | Yes | `undefined`
| [`yAdjust`](#general) | `number` | Yes | `0`
| [`yValue`](#general) | `number` \| `string` | Yes | `undefined`

!!!include(./guide/types/_commonOptions.md)!!!

### General

If one of the axes does not match an axis in the chart, the polygon annotation will take the center of the chart as point. The 2 coordinates, xValue, yValue are optional. If not specified, the polygon annotation will take the center of the scale dimension.

The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges in the respective direction and the box size is used to calculated the center of the point. To enable to use the box positioning, the `radius` must be set to `0` or `NaN`.

| Name | Description
| ---- | ----
| `adjustScaleRange` | Should the scale range be adjusted if this annotation is out of range.
| `display` | Whether or not this annotation is visible.
| `drawTime` | See [drawTime](../options.md#draw-time).
| `id` | Identifies a unique id  for the annotation and it will be stored in the element context. When the annotations are defined by an object, the id is automatically set using the key used to store the annotations in the object. When the annotations are configured by an array, the id, passed by this option in the annotation, will be used. 
| `radius` | Size of the polygon in pixels.
| `rotation` | Rotation of polygon, in degrees.
| `sides` | Amount of sides of polygon.
| `xAdjust` | Adjustment along x-axis (left-right) of polygon relative to computed position. Negative values move the polygon left, positive right.
| `xMax` | Right edge of the box in units along the x axis.
| `xMin` | Left edge of the box in units along the x axis.
| `xScaleID` | ID of the X scale to bind onto. If missing, the plugin will try to use the scale of the chart, configured as `'x'` axis. If more than one scale has been defined in the chart as `'x'` axis, the option is mandatory to select the right scale.
| `xValue` | X coordinate of the polygon in units along the x axis.
| `yAdjust` | Adjustment along y-axis (top-bottom) of polygon relative to computed position. Negative values move the polygon up, positive down.
| `yMax` | Bottom edge of the box in units along the y axis.
| `yMin` | Top edge of the box in units along the y axis.
| `yScaleID` | ID of the Y scale to bind onto. If missing, the plugin will try to use the scale of the chart, configured as `'y'` axis. If more than one scale has been defined in the chart as `'y'` axis, the option is mandatory to select the right scale.
| `yValue` | Y coordinate of the polygon in units along the y axis.
| `z` | The `z` property determines the drawing stack level of the polygon annotation element. All visible elements will be drawn in ascending order of `z` option, with the same `drawTime` option.

### Styling

| Name | Description
| ---- | ----
| `backgroundColor` | Fill color.
| `backgroundShadowColor` | The color of shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderColor` | Stroke color.
| `borderCapStyle` | Cap style of the border of polygon. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap).
| `borderDash` | Length and spacing of dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash).
| `borderDashOffset` | Offset for line dashes. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset).
| `borderJoinStyle` | Border line join style. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin).
| `borderShadowColor` | The color of the border shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowColor).
| `borderWidth` | Stroke width.
| `shadowBlur` | The amount of blur applied to shadow. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowBlur).
| `shadowOffsetX` | The distance that shadow will be offset horizontally. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetX).
| `shadowOffsetY` | The distance that shadow will be offset vertically. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/shadowOffsetY).

### Point

Polygon consists of points. These points are actually [Point Annotations](point) and all of the [styling options](point.md#styling) can be configured. General options affecting the location of the point are ignored.

Namespace: `options.annotations[annotationID].point`, it defines options for the callout on the annotation label.

```js chart-editor
/* <block:options:0> */
const options = {
  plugins: {
    annotation: {
      annotations: {
        pentagon: {
          type: 'polygon',
          xValue: 1,
          yValue: 60,
          sides: 4,
          radius: 60,
          backgroundColor: 'rgba(255, 99, 132, 0.25)',
          point: {
            radius: 10,
            borderWidth: 2,
            borderColor: '#666',
            backgroundColor: 'rgba(99, 132, 255, 0.25)',
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

## Element

The following diagram is showing the element properties about a `'polygon'` annotation:

![polygon](../../img/elementPolygonProps.png)
