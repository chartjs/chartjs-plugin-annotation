# chartjs-plugin-annotation.js

[![CDNJS version](https://img.shields.io/cdnjs/v/chartjs-plugin-annotation.svg)](https://cdnjs.com/libraries/chartjs-plugin-annotation)

An annotation plugin for Chart.js >= 3.0.0

For Chart.js 2.4.0 to 2.9.x support, use [version 0.5.7 of this plugin](https://github.com/chartjs/chartjs-plugin-annotation/releases/tag/v0.5.7)

This plugin draws lines, boxes, points and ellipses on the chart area.

Annotations work with line, bar, scatter and bubble charts that use linear, logarithmic, time, or category scales. Annotations will not work on any chart that does not have exactly two axes, including pie, radar, and polar area charts.

![Example Screenshot from Dropbox](https://www.dropbox.com/s/92cmt8zrth55z55/Screenshot%202017-05-20%2018.26.39.png?raw=1)

[View this example on CodePen](https://codepen.io/compwright/full/mmQMrZ/)

## Configuration

To configure the annotations plugin, you can simply add new config options to your chart config.

```javascript
{
    plugins: {
        annotation: {
            // Defines when the annotations are drawn.
            // This allows positioning of the annotation relative to the other
            // elements of the graph.
            //
            // Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
            // See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
            drawTime: 'afterDatasetsDraw', // (default)

            // Double-click speed in ms used to distinguish single-clicks from
            // double-clicks whenever you need to capture both. When listening for
            // both click and dblclick, click events will be delayed by this
            // amount.
            dblClickSpeed: 350, // ms (default)

            // Fires when an annotation is hovered.
            enter: function(context) {
                // context: {chart, element}
            },

            // Array of annotation configuration objects
            // or Object with the annotation configuration objects, one for each key
            // See below for detailed descriptions of the annotation options
            annotations: [{
                drawTime: 'afterDraw', // overrides annotation.drawTime if set
                display: true,
                type: 'line',
                scaleID: 'y',
                value: '25',
                borderColor: 'red',
                borderWidth: 2,

                // Event hooks can be defined per annotation (`click` below) or
                // at chart level (`enter` above). If defined in both places,
                // the one defined per annotation takes precedence.

                // Fires when the user clicks this annotation on the chart
                click: function(context) {
                   // context: {chart, element}
                }
            }]
        }
    }
}
```

### Line Annotations

Vertical or horizontal lines are supported.

```javascript
{
    type: 'line',

    // If true, display the annotation, default is true
    // A callback can also be used:
    //   display(context) {
    //     // context: {chart, element}
    //     return true;
    //   },
    display: true,

    // optional drawTime to control layering, overrides global drawTime setting
    drawTime: 'afterDatasetsDraw',

    // ID of the scale to bind onto
    scaleID: 'y',

    // Data value to draw the line at
    value: 25,

    // Optional value at which the line draw should end
    endValue: 26,

    // Line color
    borderColor: 'red',

    // Line width
    borderWidth: 2,

    // Line dash
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    borderDash: [2, 2],

    // Line Dash Offset
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
    borderDashOffset: 5,

    label: {
        // Background color of label, default below
        backgroundColor: 'rgba(0,0,0,0.8)',

        // optional drawTime to control labels' layering; defaults to this element's drawTime
        drawTime: 'afterDatasetsDraw',

        font: {
            // Font family of text, inherits from global
            family: "sans-serif",

            // Font size of text, inherits from global
            size: 12,

            // Font style of text, default below
            style: "bold",

            // Font color of text, default below
            color: "#fff",
        },

        // Padding of label to add left/right, default below
        xPadding: 6,

        // Padding of label to add top/bottom, default below
        yPadding: 6,

        // Radius of label rectangle, default below
        cornerRadius: 6,

        // Anchor position of label on line, can be one of: top, bottom, left, right, center. Default below.
        position: "center",

        // Adjustment along x-axis (left-right) of label relative to above number (can be negative)
        // For horizontal lines positioned left or right, negative values move
        // the label toward the edge, and positive values toward the center.
        xAdjust: 0,

        // Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
        // For vertical lines positioned top or bottom, negative values move
        // the label toward the edge, and positive values toward the center.
        yAdjust: 0,

        // Whether the label is enabled and should be displayed
        enabled: true,

        // Text to display in label - default is null. Provide an array to display values on a new line
        content: "Test label",

        // Rotation of label, in degrees, or 'auto' to use the degrees of the line, default is 0
        rotation: 90,
    },

    // Event hooks - context: {chart, element}
    enter: function(context) {},
    leave: function(context) {},
    click: function(context) {},
    dblclick: function(context) {}
}
```

### Box Annotations

Box annotations are supported. If one of the axes is not specified, the box will take the entire chart dimension.

The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges

```javascript
{
    type: 'box',

    // If true, display the annotation, default is true
    // A callback can also be used:
    //   display(context) {
    //     // context: {chart, element}
    //     return true;
    //   },
    display: true,

    // optional drawTime to control layering, overrides global drawTime setting
    drawTime: 'beforeDatasetsDraw',

    // ID of the X scale to bind onto
    xScaleID: 'x',

    // ID of the Y scale to bind onto
    yScaleID: 'y',

    // Left edge of the box. in units along the x axis
    xMin: 25,

    // Right edge of the box
    xMax: 40,

    // Top edge of the box in units along the y axis
    yMax: 20,

    // Bottom edge of the box
    yMin:  15,

    // Stroke color
    borderColor: 'red',

    // Stroke width
    borderWidth: 2,

    // Fill color
    backgroundColor: 'green',

    // Radius of box rectangle, default below
    cornerRadius: 0,

    // Event hooks - context: {chart, element}
    enter: function(context) {},
    leave: function(context) {},
    click: function(context) {},
    dblclick: function(context) {}
}
```

### Ellipse Annotations

Ellipse annotations are supported. If one of the axes is not specified, the ellipse will take the entire chart dimension.

The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the ellipse is expanded out to the edges

```javascript
{
    type: 'ellipse',

    // optional drawTime to control layering, overrides global drawTime setting
    drawTime: 'beforeDatasetsDraw',

    // ID of the X scale to bind onto
    xScaleID: 'x',

    // ID of the Y scale to bind onto
    yScaleID: 'y',

    // Left edge of the box. in units along the x axis
    xMin: 25,

    // Right edge of the box
    xMax: 40,

    // Top edge of the box in units along the y axis
    yMax: 20,

    // Bottom edge of the box
    yMin:  15,

    // Stroke color
    borderColor: 'red',

    // Stroke width
    borderWidth: 2,

    // Fill color
    backgroundColor: 'green',

    // Event hooks - context: {chart, element}
    enter: function(context) {},
    leave: function(context) {},
    click: function(context) {},
    dblclick: function(context) {}
}
```

### Point Annotations

Point annotations are supported. If one of the axes is not specified, the point will take the entire chart dimension.

The 2 coordinates, xValue, yValue are optional. If not specified, the point is expanded out to the edges

```javascript
{
    type: 'point',

    // optional drawTime to control layering, overrides global drawTime setting
    drawTime: 'beforeDatasetsDraw',

    // ID of the X scale to bind onto
    xScaleID: 'x',

    // ID of the Y scale to bind onto
    yScaleID: 'y',

    // Center point X value of the point. in units along the x axis
    xValue: 25,

    // Center point Y value of the point. in units along the y axis
    yValue: 20,

    // Stroke color
    borderColor: 'red',

    // Stroke width
    borderWidth: 2,

    // Radius of the point, default below
    radius: 10,

    // Fill color
    backgroundColor: 'green',

    // Event hooks - context: {chart, element}
    enter: function(context) {},
    leave: function(context) {},
    click: function(context) {},
    dblclick: function(context) {}
}
```

## To-do Items

The following features still need to be done:

* Box annotation labels
* Text annotations

## Installation

To download a zip, go to the Chart.Annotation.js on Github

To install via npm:

```bash
npm install chartjs-plugin-annotation --save
```

Prior to v0.2.0 this plugin was known as Chart.Annotation.js. You can still install this old version via NPM.

## Documentation

You can find documentation for Chart.js at [www.chartjs.org/docs](http://www.chartjs.org/docs).

## Contributing

Before submitting an issue or a pull request to the project, please take a moment to look over the [contributing guidelines](CONTRIBUTING.md) first.

## License

Chart.Annotation.js is available under the [MIT license](http://opensource.org/licenses/MIT).
