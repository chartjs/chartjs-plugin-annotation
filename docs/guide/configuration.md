---
title: Configuration
---

## Top level options

The following options are available at the top level. They apply to all annotations unless they are overwritten on a per-annotation basis.

| Name | Type | [Scriptable](options#scriptable-options) | Default | Notes
| ---- | ---- | :----: | ---- | ----
| [`animations`](#animations) | `object` | No | [see here](#default-animations) | To configure which element properties are animated and how.
| `clip` | `boolean` | No | `true` | Are the annotations clipped to the chartArea.
| `dblClickSpeed` | `number` | Yes | `350` | Time to detect a double click in ms.
| `drawTime` | `string` | Yes | `'afterDatasetsDraw'` | See [drawTime](options#draw-time).

:::warning

Setting `clip` to `false`, you can enable the possibility to draw part of the annotation outside of the chart area.

Nevertheless events are only catched over the chartArea.

:::

## Animations

Animations options configures which element properties are animated and how, with the same configuration of [chart.js](https://www.chartjs.org/docs/latest/configuration/animations.html#animations-2). 

```javascript
const options = {
  plugins: {
    annotation: {
      animations: {
        numbers: {
          properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'radius'],
          type: 'number'
        },
      },
      annotations: {
        box1: {
          type: 'box',
          xMin: 1,
          xMax: 2,
          yMin: 50,
          yMax: 70,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      }
    }
  }
};
```

### Default animations

| Name | Option | Value
| ---- | ---- | ----
| `numbers` | `properties` | `['x', 'y', 'x2', 'y2', 'width', 'height', 'pointX', 'pointY', 'labelX', 'labelY', 'labelWidth', 'labelHeight', 'radius']`
| `numbers` | `type` | `number`

## Events

The following options are available for all annotation types. These options can be specified per annotation, or at the top level which apply to all annotations.

| Name | Type | [Scriptable](options#scriptable-options) | Notes
| ---- | ---- | :----: | ----
| `click` | `(context, event) => void` | No | Called when a single click occurs on the annotation.
| `dblClick` | `(context, event) => void` | No | Called when a double click occurs on the annotation.
| `enter` | `(context, event) => void` | No | Called when the mouse enters the annotation.
| `leave` | `(context, event) => void` | No | Called when the mouse leaves the annotation.
