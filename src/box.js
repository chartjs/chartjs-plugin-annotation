// Box Annotation implementation
module.exports = function(Chart) {
	var BoxAnnotation = Chart.Element.extend({
		draw: function(ctx) {
			var view = this._view;

			// Canvas setup
			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;
			ctx.fillStyle = view.backgroundColor;

			// Draw
			var width = view.right - view.left,
				height = view.bottom - view.top;
			ctx.fillRect(view.left, view.top, width, height);
			ctx.strokeRect(view.left, view.top, width, height)
		}
	});

	function isValid(num) {
		return !isNaN(num) && isFinite(num);
	}

	// Function that updates a box annotation
	function boxUpdate(obj, options, chartInstance) {
		var model = obj._model = obj._model || {};

		var xScale = chartInstance.scales[options.xScaleID];
		var yScale = chartInstance.scales[options.yScaleID];
		var chartArea = chartInstance.chartArea;

		var left = chartArea.left, 
			top = chartArea.top, 
			right = chartArea.right, 
			bottom = chartArea.bottom;

		var min,max;

		if (xScale) {
			min = isValid(options.xMin) ? xScale.getPixelForValue(options.xMin) : chartArea.left;
			max = isValid(options.xMax) ? xScale.getPixelForValue(options.xMax) : chartArea.right;
			left = Math.min(min, max);
			right = Math.max(min, max);
		}

		if (yScale) {
			min = isValid(options.yMin) ? yScale.getPixelForValue(options.yMin) : chartArea.bottom;
			max = isValid(options.yMax) ? yScale.getPixelForValue(options.yMax) : chartArea.top;
			top = Math.min(min, max);
			bottom = Math.max(min, max);
		}

		// Ensure model has rect coordinates
		model.left = left;
		model.top = top;
		model.right = right;
		model.bottom = bottom;

		// Stylistic options
		model.borderColor = options.borderColor;
		model.borderWidth = options.borderWidth;
		model.backgroundColor = options.backgroundColor;
	}


	return {
		Constructor: BoxAnnotation,
		update: boxUpdate
	};
}
