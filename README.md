# chartjs-plugin-annotation.js

An annotation plugin for Chart.js >= 2.1.3

Currently draws lines and boxes on the chart area.


## Configuration

To configure the annotations plugin, you can simply add new config options to your chart config.

```javascript
{
	annotation: {
		annotations: [{
			type: 'line',
			mode: 'horizontal',
			scaleID: 'y-axis-0',
			value: '25',
			borderColor: 'red',
			borderWidth: 2
		}],
		// Defines when the annotations are drawn.
		// This allows positioning of the annotation relative to the other
		// elements of the graph.
		// Should be one of: afterDraw, afterDatasetsDraw, beforeDatasetsDraw
		// See http://www.chartjs.org/docs/#advanced-usage-creating-plugins
		drawTime: "afterDraw" // (default)
	}
}
```

### Line Annotations
Vertical or horizontal lines are supported.

```javascript
{
	type: 'line',
	// set to 'vertical' to draw a vertical line
	mode: 'horizontal',

	// ID of the scale to bind onto
	scaleID: 'y-axis-0',

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
	borderDashOffset: 5
}
```

### Box Annotations
Box annotations are supported. If one of the axes is not specified, the box will take the entire chart dimension.

The 4 coordinates, xMin, xMax, yMin, yMax are optional. If not specified, the box is expanded out to the edges

```javascript
{
	type: 'box',

	// ID of the X scale to bind onto
	xScaleID: 'x-axis-0',

	// ID of the Y scale to bind onto
	yScaleID: 'y-axis-0',

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
	backgroundColor: 'green'
}
```

## To-do Items
The following features still need to be done:
* Point Annotations
* Text annotations

## Installation

To download a zip, go to the Chart.Annotation.js on Github

To install via npm:

```bash
npm install Chart.Annotation.js --save
```

## Documentation

You can find documentation for Chart.js at [www.chartjs.org/docs](http://www.chartjs.org/docs).

## Contributing

Before submitting an issue or a pull request to the project, please take a moment to look over the [contributing guidelines](https://github.com/chartjs/chartjs-plugin-annotation.js/blob/master/CONTRIBUTING.md) first.

## License

Chart.Annotation.js is available under the [MIT license](http://opensource.org/licenses/MIT).
