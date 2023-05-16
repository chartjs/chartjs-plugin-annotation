---
title: Configuration
---

## Top level options

The following options are available at the top level. They apply to all annotations unless they are overwritten on a per-annotation basis.

| Name | Type | [Scriptable](options.md#scriptable-options) | Default | Notes
| ---- | ---- | :----: | ---- | ----
| [`animations`](#animations) | `object` | No | [see here](#default-animations) | To configure which element properties are animated and how.
| `clip` | `boolean` | No | `true` | Are the annotations clipped to the chartArea.
| [`common`](#common) | `Object` | No | | To configure common options apply to all annotations
| [`interaction`](options.md#interaction) | `Object` | No | `options.interaction` | To configure which events trigger plugin interactions

:::warning

Setting `clip` to `false`, you can enable the possibility to draw part of the annotation outside of the chart area.

Nevertheless events are only caught over the chartArea.

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
| `numbers` | `properties` | `['x', 'y', 'x2', 'y2', 'width', 'height', 'centerX', 'centerY', 'pointX', 'pointY', 'radius']`
| `numbers` | `type` | `number`

## Common

The following options apply to all annotations unless they are overwritten on a per-annotation basis.

| Name | Type | [Scriptable](options.md#scriptable-options) | Default | Notes
| ---- | ---- | :----: | ---- | ----
| `drawTime` | `string` | Yes | `'afterDatasetsDraw'` | See [drawTime](options#draw-time).
| `init` | `boolean`  | [See initial animation](#initial-animation) | `false` | Enable the animation to the annotations when they are drawing at chart initialization

### Initial animation

The `init` option is scriptable but it doesn't get the [options context](./options#option-context) as argument but a specific context because the element has not been initialized yet, when the callback is invoked.

This is the signature of the scriptable option:

```javascript
({chart, properties, options}) => void | boolean | AnnotationElement
```

where the properties is the element model

```javascript
{
  x: number,
  y: number,
  x2: number,
  y2: number,
  centerX: number,
  centerY: number,
  width: number,
  height: number,
  radius?: number
}
```

which can be used in the callback to return an object with the initial values of the element, to provide own initial animation. 

## Events

The following options are available for all annotation types. These options can be specified per annotation, or at the top level which apply to all annotations.

| Name | Type | Chart event<sup>1</sup> | Notes
| ---- | ---- | ---- | ----
| `click` | `(context, event) => boolean | void` | `'click'` | Called when a single click occurs on the annotation.
| `enter` | `(context, event) => boolean | void` | `'mousemove'` | Called when the mouse enters the annotation.
| `leave` | `(context, event) => boolean | void` | `'mousemove'` | Called when the mouse leaves the annotation.

::: tip
**<sup>1</sup>** [Chart.js events](https://www.chartjs.org/docs/latest/configuration/interactions.html#events) that need to be enabled in order to get the associated annotation event working. Note that by default Chart.js enables `'mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'`, meaning that annotation events work out-of-the-box.
:::

If the event callbacks explicitly returns `true`, the chart will re-render automatically after processing the event completely. This is important when there are the annotations that require re-draws (for instance, after a change of a rendering options).

## Hooks

The following hooks are available for all annotation types. These hooks can be specified per annotation, or at the top level which apply to all annotations.

These hooks enable some user customizations on the annotations.

| Name | Type | Notes
| ---- | ---- | ----
| `beforeDraw` | `(context) => void ` | Called before that the annotation is being drawn.
| `afterDraw` | `(context) => void` | Called after the annotation has been drawn.
