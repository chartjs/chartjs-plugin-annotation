// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;

// Line Annotation implementation
module.exports = function(Chart) {
	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	var LineAnnotation = Chart.Element.extend({

		draw: function(ctx) {
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

			if (view.labelEnabled && view.labelContent) {
				ctx.fillStyle = view.labelBackgroundColor;
				// Draw the tooltip
				helpers.drawRoundedRectangle(
					ctx,
					view.labelX - view.labelXPadding, // x
					view.labelY - view.labelYPadding, // y
					view.labelWidth, // width
					view.labelHeight, // height
					view.labelCornerRadius // radius
				);
				ctx.fill();

				// Draw the text
				ctx.font = helpers.fontString(
					view.labelFontSize,
					view.labelFontStyle,
					view.labelFontFamily
				);
				ctx.fillStyle = view.labelFontColor;
				ctx.textAlign = 'left';
				ctx.textBaseline = 'top';
				ctx.fillText(
					view.labelContent,
					view.labelX,
					view.labelY
				);
			}
		}
	});

	function isValid(num) {
		return !isNaN(num) && isFinite(num);
	}

	function calculateLabelPosition(view, width, height) {
		var ret = {
			x: ((view.x1 + view.x2 - width) / 2),
			y: ((view.y1 + view.y2 - height) / 2)
		};
		switch (view.labelPosition) {
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
		ret.x += view.labelXAdjust;
		ret.y += view.labelYAdjust;
		return ret;
	}

	function lineUpdate(obj, options, chartInstance) {
		var model = obj._model = helpers.clone(obj._model) || {};

		var scale = chartInstance.scales[options.scaleID];
		var pixel = scale ? scale.getPixelForValue(options.value) : NaN;
		var endPixel = scale && isValid(options.endValue) ? scale.getPixelForValue(options.endValue) : NaN;
		if (isNaN(endPixel))
		    endPixel = pixel;
		var chartArea = chartInstance.chartArea;
		var ctx = chartInstance.chart.ctx;

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

		// Figure out the label:
		model.labelBackgroundColor = options.label.backgroundColor;
		model.labelFontFamily = options.label.fontFamily;
		model.labelFontSize = options.label.fontSize;
		model.labelFontStyle = options.label.fontStyle;
		model.labelFontColor = options.label.fontColor;
		model.labelXPadding = options.label.xPadding;
		model.labelYPadding = options.label.yPadding;
		model.labelCornerRadius = options.label.cornerRadius;
		model.labelPosition = options.label.position;
		model.labelXAdjust = options.label.xAdjust;
		model.labelYAdjust = options.label.yAdjust;
		model.labelEnabled = options.label.enabled;
		model.labelContent = options.label.content;

		ctx.font = helpers.fontString(
			model.labelFontSize,
			model.labelFontStyle,
			model.labelFontFamily
		);
		var text = ctx.measureText(model.labelContent);
		var position = calculateLabelPosition(
			model,
			text.width,
			model.labelFontSize
		);
		model.labelX = position.x;
		model.labelY = position.y;
		model.labelWidth = text.width + (2 * model.labelXPadding);
		model.labelHeight = model.labelFontSize + (2 * model.labelYPadding)

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
