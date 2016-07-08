// Line Annotation implementation
module.exports = function(Chart) {
	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	var LineAnnotation = Chart.Element.extend({

		draw: function(chartInstance, options) {
			var view = this._view;
            var ctx = chartInstance.chart.ctx;
            var scale = chartInstance.scales[options.scaleID];
            var pixel = scale ? scale.getPixelForValue(options.value) : NaN;
            var chartArea = chartInstance.chartArea;
			// Canvas setup
			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;

			// Draw
			ctx.beginPath();
			ctx.moveTo(view.x1, view.y1);
			ctx.lineTo(view.x2, view.y2);
			ctx.stroke();
            
            ctx.fillText(options.label ? options.label : '', chartArea.left, pixel+5);

            console.info(ctx);

		}
	});

	function lineUpdate(obj, options, chartInstance) {
        console.info(chartInstance.chart.ctx);
		var model = obj._model = obj._model || {};

		var scale = chartInstance.scales[options.scaleID];
		var pixel = scale ? scale.getPixelForValue(options.value) : NaN;
		var chartArea = chartInstance.chartArea;

		if (!isNaN(pixel)) {
			if (options.mode == horizontalKeyword) {
				model.x1 = chartArea.left;
				model.x2 = chartArea.right;
				model.y1 = model.y2 = pixel;

			} else {
				model.y1 = chartArea.top;
				model.y2 = chartArea.bottom;
				model.x1 = model.x2 = pixel;
			}

		}

		model.borderColor = options.borderColor;
		model.borderWidth = options.borderWidth;

	}


	return {
		Constructor: LineAnnotation,
		update: lineUpdate
	};
};
