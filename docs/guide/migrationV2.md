# 2.x Migration Guide

**`chartjs-plugin-annotation`** plugin version 2 introduces a number of breaking changes. In order to improve performance, offer new features, and improve maintainability, it was necessary to break backwards compatibility, but we aimed to do so only when worth the benefit.

## Chart.js version

The annotation plugin requires at least version 3.7.0 to work because of some bug fixes that happened within chart.js itself.

## Options

A number of changes were made to the configuration options passed to the plugin configuration. Those changes are documented below.

 * `xScaleID` option default has been changed, now set to `undefined`. If the option is missing, the plugin will try to use the first scale of the chart, configured as `'x'` axis. If more than one scale has been defined in the chart as `'x'` axis, the option is mandatory to select the right scale.
 * `yScaleID` option default has been changed, now set to `undefined`. If the option is missing, the plugin will try to use the first scale of the chart, configured as `'y'` axis. If more than one scale has been defined in the chart as `'y'` axis, the option is mandatory to select the right scale.
 * When [stacked scales](https://www.chartjs.org/docs/latest/axes/cartesian/#common-options-to-all-cartesian-axes) are used, instead of the whole chart area, the designated scale area is used as fallback for `xMin`, `xMax`, `yMin`, `yMax`, `xValue` or `yValue` options.
 * `position` for the label of the line annotation changes the behavior when `start` or `end` is set, and  when the line annotation location is defined by `xMin`, `xMax`, `yMin`, and `yMax` options.
   * in the previous version 1.x, if the `position` was set to `start` or `end`, it was calculated using chart area dimension (when `start` using `top` or `left`, when `end` using `bottom` or `right`).
   * in version 2.x, if the `position` is set to `start`, it is the point where the line starts being drawn, and when set to `end`, it is the point where the line ends drawing. The `xMin`, `xMax`, `yMin`, and `yMax` options are not related to the chart area anymore but are related to the values sequence (and their order) on the associated scale.
 * `cornerRadius` option was replaced by `borderRadius` in the box annotation configuration and in the label configuration of line annotation to align with Chart.js options.
 * `xPadding` and `yPadding` options were merged into a single `padding` object in the label configuration of line annotation to align with Chart.js options.
 * `enabled` option was replaced by `display` in the callout configuration of label annotation, in the label configuration of line and box annotations and in the arrow heads configuration of line annotation to have the same option on all elements.
 * `dblClickSpeed` option was removed from the plugin options because `dblclick` event hook is not available anymore.
 * `drawTime` option at top level plugin configuration is moved to new `common` object in the plugin annotation options, which contains options to apply to all annotations: 

```javascript
plugins: {
  annotation: {
    common: {
      drawTime: 'afterDraw'
    },
    annotations: [
      ...
    ]
  }
}
```

## Elements

In `chartjs-plugin-annotation` plugin version 2 the label of box and line annotations is a sub-element. This has changed how to access to the label options. Now the label options are at `element.label.options`. The following example shows how to show and hide the label when the mouse is hovering the box:

```javascript
type: 'box', // or 'line'
enter: function({element}) {
  element.label.options.display = true;
  return true;
},
leave: function({element}) {
  element.label.options.display = false;
  return true;
},
```

`chartjs-plugin-annotation` plugin version 2 removes the clipping of the label to the box annotation size.

`chartjs-plugin-annotation` plugin version 2 hides the following methods in the `line` annotation element because they should be used only internally:

 * `intersects`
 * `isOnLabel`

`chartjs-plugin-annotation` plugin version 2 normalizes the properties of the annotation elements in order to be based on common box model.

#### Box annotation

The following diagram is showing the element properties about a `'box'` annotation:

![box](../img/elementBoxProps.png)

The label of a box annotation is described as a [label annotation](#label-annotation) and accessible by `element.label`.

#### Ellipse annotation

The following diagram is showing the element properties about a `'ellipse'` annotation:

![ellipse](../img/elementEllipseProps.png)

#### Label annotation

The following diagram is showing the element properties about a `'label'` annotation:

![label](../img/elementLabelProps.png)

#### Line annotation

The following diagram is showing the element properties about a `'line'` annotation:

![line](../img/elementLineProps.png)

The label of a line annotation is described as a [label annotation](#label-annotation) and accessible by `element.label`.

#### Point annotation

The following diagram is showing the element properties about a `'point'` annotation:

![point](../img/elementPointProps.png)

#### Polygon annotation

The following diagram is showing the element properties about a `'polygon'` annotation:

![polygon](../img/elementPolygonProps.png)

## Events

`chartjs-plugin-annotation` plugin version 2 introduces the [`interaction`](options.md#interaction) options, to configure which events trigger annotation interactions. By default, the plugin uses the [chart interaction configuration](https://www.chartjs.org/docs/latest/configuration/interactions.html#interactions).

 * When [scatter charts](https://www.chartjs.org/docs/latest/charts/scatter.html) are used, the interaction default `mode` in Chart.js is `point`, while, in the previous plugin version, the default was `nearest`.

The `dblclick` event hook was removed from annotations options because, being executed asynchronously, it can not enable the chart re-rendering, automatically after processing the event completely. This is important when the user requires re-draws. It gets slow and messy if every event hook does the draw (or update!).

## Types

`chartjs-plugin-annotation` plugin version 2 removes the compatibility with TypeScript versions less than 4.1 which is the minimum supported one.
