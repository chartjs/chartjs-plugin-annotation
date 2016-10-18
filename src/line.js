// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;

// Line Annotation implementation
module.exports = function(Chart) {
	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	var LineAnnotation = Chart.Element.extend({

		draw: function(ctx, options) {
			var view = this._view;

			// Canvas setup
			ctx.save();
			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;

			if (ctx.setLineDash) {
				ctx.setLineDash(view.borderDash);
			}
			ctx.lineDashOffset = view.borderDashOffset;

			// Draw
			ctx.beginPath();
			ctx.moveTo(view.x1, view.y1);
			ctx.lineTo(view.x2, view.y2);
			ctx.stroke();
			ctx.restore();

			if (options.label.enabled && options.label.content) {
				ctx.fillStyle = options.label.backgroundColor;
				ctx.font = helpers.fontString(
					options.label.fontSize,
					options.label.fontStyle,
					options.label.fontFamily
				);
				var text = ctx.measureText(options.label.content);
				var position = calculatePosition(
					options.label.position,
					options.label.xAdjust,
					options.label.yAdjust,
					view,
					text.width,
					options.label.fontSize
				);

				// Draw the tooltip
				helpers.drawRoundedRectangle(
					ctx,
					position.x - options.label.xPadding, // x
					position.y - options.label.yPadding, // y
					text.width + (2 * options.label.xPadding), // width
					options.label.fontSize + (2 * options.label.yPadding), // height
					options.label.cornerRadius // radius
				);
				ctx.fill();

				// Draw the text
				ctx.fillStyle = options.label.fontColor;
				ctx.textAlign = 'left';
				ctx.textBaseline = 'top';
				ctx.fillText(
					options.label.content,
					position.x,
					position.y
				);
			}
		}
	});

	function isValid(num) {
		return !isNaN(num) && isFinite(num);
	}

	function calculatePosition(option, adjustX, adjustY, view, width, height) {
		var ret = {
			x: ((view.x1 + view.x2 - width) / 2),
			y: ((view.y1 + view.y2 - height) / 2)
		};
		switch (option) {
		case "top":
			ret.y = view.y1 > view.y2 ? view.y2 : view.y1;
			break;
		case "left":
			ret.x = view.x1 > view.x2 ? view.x1 : view.x2;
			break;
		case "bottom":
			ret.y = view.y1 > view.y2 ? view.y1 : view.y2;
			break;
		case "right":
			ret.x = view.x1 > view.x2 ? view.x2 : view.x1;
			break;
		}
		ret.x += adjustX;
		ret.y += adjustY;
		return ret;
	}

	function lineUpdate(obj, options, chartInstance) {
		var model = obj._model = obj._model || {};

		var scale = chartInstance.scales[options.scaleID];
		var pixel = scale ? scale.getPixelForValue(options.value) : NaN;
		var endPixel = scale && isValid(options.endValue) ? scale.getPixelForValue(options.endValue) : NaN;
		if (isNaN(endPixel))
		    endPixel = pixel;
		var chartArea = chartInstance.chartArea;

		if (!isNaN(pixel)) {
			if (options.mode == horizontalKeyword) {
				model.x1 = chartArea.left;
				model.x2 = chartArea.right;
				model.y1 = pixel;
				model.y2 = endPixel;
			} else {
				model.y1 = chartArea.top;
				model.y2 = chartArea.bottom;
				model.x1 = pixel;
				model.x2 = endPixel;
			}
		}

		model.borderColor = options.borderColor;
		model.borderWidth = options.borderWidth;
		model.borderDash = options.borderDash || [];
		model.borderDashOffset = options.borderDashOffset || 0;
	}


	return {
		Constructor: LineAnnotation,
		update: lineUpdate
	};
};
