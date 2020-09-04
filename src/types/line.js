import {Element, defaults} from 'chart.js';
import {isArray} from 'chart.js/helpers/core';
import {fontString} from 'chart.js/helpers/extras';

const PI = Math.PI;
const HALF_PI = PI / 2;

export default class LineAnnotation extends Element {

	draw(ctx) {
		const {x, y, x2, y2, options} = this;
		ctx.save();

		ctx.lineWidth = options.borderWidth;
		ctx.strokeStyle = options.borderColor;

		if (ctx.setLineDash) {
			ctx.setLineDash(options.borderDash);
		}
		ctx.lineDashOffset = options.borderDashOffset;

		// Draw
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x2, y2);
		ctx.stroke();

		const label = options.label;
		if (label && label.enabled && label.content) {
			drawLabel(ctx, this);
		}

		ctx.restore();
	}
}

LineAnnotation.id = 'lineAnnotation';
LineAnnotation.defaults = {
	borderDash: [],
	borderDashOffset: 0,
	label: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		font: {
			family: defaults.font.family,
			size: defaults.font.size,
			style: 'bold',
			color: '#fff',
		},
		xPadding: 6,
		yPadding: 6,
		rotation: 0,
		cornerRadius: 6,
		position: 'center',
		xAdjust: 0,
		yAdjust: 0,
		enabled: false,
		content: null
	}
};

function drawLabel(ctx, line) {
	const label = line.options.label;

	ctx.font = fontString(
		label.font.size,
		label.font.style,
		label.font.family
	);
	ctx.textAlign = 'center';

	const {width, height} = measureLabel(ctx, label);
	const pos = calculateLabelPosition(line, width, height);

	ctx.translate(pos.x, pos.y);
	ctx.rotate(label.rotation * PI / 180);

	ctx.fillStyle = label.backgroundColor;
	roundedRect(ctx, -(width / 2), -(height / 2), width, height, label.cornerRadius);
	ctx.fill();

	ctx.fillStyle = label.font.color;
	if (isArray(label.content)) {
		let textYPosition = -(height / 2) + label.yPadding;
		for (let i = 0; i < label.content.length; i++) {
			ctx.textBaseline = 'top';
			ctx.fillText(
				label.content[i],
				-(width / 2) + (width / 2),
				textYPosition
			);

			textYPosition += label.font.size + label.yPadding;
		}
	} else {
		ctx.textBaseline = 'middle';
		ctx.fillText(label.content, 0, 0);
	}
}

const widthCache = new Map();
function measureLabel(ctx, label) {
	const content = label.content;
	const lines = isArray(content) ? content : [content];
	const count = lines.length;
	let width = 0;
	for (let i = 0; i < count; i++) {
		const text = lines[i];
		if (!widthCache.has(text)) {
			widthCache.set(text, ctx.measureText(text).width);
		}
		width = Math.max(width, widthCache.get(text));
	}
	width += 2 * label.xPadding;

	return {
		width,
		height: count * label.font.size + ((count + 1) * label.yPadding)
	};
}

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;

function calculateLabelPosition(line, width, height) {
	const label = line.options.label;
	const {xPadding, xAdjust, yPadding, yAdjust} = label;
	const p1 = {x: line.x, y: line.y};
	const p2 = {x: line.x2, y: line.y2};
	let x, y, pt;

	switch (label.position) {
	case 'top':
		y = yPadding + yAdjust;
		x = interpolateX(y, p1, p2);
		break;
	case 'bottom':
		y = height - yPadding + yAdjust;
		x = interpolateX(y, p1, p2);
		break;
	case 'left':
		x = xPadding + xAdjust;
		y = interpolateY(x, p1, p2);
		break;
	case 'right':
		x = width - xPadding + xAdjust;
		y = interpolateY(x, p1, p2);
		break;
	default:
		pt = pointInLine(p1, p2, 0.5);
		x = pt.x + xAdjust;
		y = pt.y + yAdjust;
	}
	return {x, y};
}


/**
 * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
 * given size (width, height) and the same `radius` for all corners.
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
 * @param {number} x - The x axis of the coordinate for the rectangle starting point.
 * @param {number} y - The y axis of the coordinate for the rectangle starting point.
 * @param {number} width - The rectangle's width.
 * @param {number} height - The rectangle's height.
 * @param {number} radius - The rounded amount (in pixels) for the four corners.
 * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
 */
function roundedRect(ctx, x, y, width, height, radius) {
	if (radius) {
		const r = Math.min(radius, height / 2, width / 2);
		const left = x + r;
		const top = y + r;
		const right = x + width - r;
		const bottom = y + height - r;

		ctx.moveTo(x, top);
		if (left < right && top < bottom) {
			ctx.arc(left, top, r, -PI, -HALF_PI);
			ctx.arc(right, top, r, -HALF_PI, 0);
			ctx.arc(right, bottom, r, 0, HALF_PI);
			ctx.arc(left, bottom, r, HALF_PI, PI);
		} else if (left < right) {
			ctx.moveTo(left, y);
			ctx.arc(right, top, r, -HALF_PI, HALF_PI);
			ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
		} else if (top < bottom) {
			ctx.arc(left, top, r, -PI, 0);
			ctx.arc(left, bottom, r, 0, PI);
		} else {
			ctx.arc(left, top, r, -PI, PI);
		}
		ctx.closePath();
		ctx.moveTo(x, y);
	} else {
		ctx.rect(x, y, width, height);
	}
}


/*
export default function(Chart) {
	var chartHelpers = Chart.helpers;
	var helpers = require('../helpers.js')(Chart);

	var horizontalKeyword = 'horizontal';
	var verticalKeyword = 'vertical';

	function LineFunction(view) {
		// Describe the line in slope-intercept form (y = mx + b).
		// Note that the axes are rotated 90° CCW, which causes the
		// x- and y-axes to be swapped.
		var m = (x2 - x) / (y2 - y);
		var b = x || 0;

		this.m = m;
		this.b = b;

		this.getX = function(y) {
			// Coordinates are relative to the origin of the canvas
			return m * (y - y) + b;
		};

		this.getY = function(x) {
			return ((x - b) / m) + y;
		};

		this.intersects = function(x, y, epsilon) {
			epsilon = epsilon || 0.001;
			var dy = this.getY(x);
			var dx = this.getX(y);
			return (
				(!isFinite(dy) || Math.abs(y - dy) < epsilon) &&
				(!isFinite(dx) || Math.abs(x - dx) < epsilon)
			);
		};
	}

	function calculateLabelPosition(view, width, height, padWidth, padHeight) {
		var line = view.line;
		var ret = {};
		var xa = 0;
		var ya = 0;

		switch (true) {
		// top align
		case view.mode === verticalKeyword && view.labelPosition === 'top':
			ya = padHeight + view.labelYAdjust;
			xa = (width / 2) + view.labelXAdjust;
			ret.y = y + ya;
			ret.x = (isFinite(line.m) ? line.getX(ret.y) : x) - xa;
			break;

		// bottom align
		case view.mode === verticalKeyword && view.labelPosition === 'bottom':
			ya = height + padHeight + view.labelYAdjust;
			xa = (width / 2) + view.labelXAdjust;
			ret.y = y2 - ya;
			ret.x = (isFinite(line.m) ? line.getX(ret.y) : x) - xa;
			break;

		// left align
		case view.mode === horizontalKeyword && view.labelPosition === 'left':
			xa = padWidth + view.labelXAdjust;
			ya = -(height / 2) + view.labelYAdjust;
			ret.x = x + xa;
			ret.y = line.getY(ret.x) + ya;
			break;

		// right align
		case view.mode === horizontalKeyword && view.labelPosition === 'right':
			xa = width + padWidth + view.labelXAdjust;
			ya = -(height / 2) + view.labelYAdjust;
			ret.x = x2 - xa;
			ret.y = line.getY(ret.x) + ya;
			break;

		// center align
		default:
			ret.x = ((x + x2 - width) / 2) + view.labelXAdjust;
			ret.y = ((y + y2 - height) / 2) + view.labelYAdjust;
		}

		return ret;
	}

	var LineAnnotation = Chart.Annotation.Element.extend({
		setDataLimits: function() {
			var model = this._model;
			var options = this.options;

			// Set the data range for this annotation
			model.ranges = {};
			model.ranges[options.scaleID] = {
				min: options.value,
				max: options.endValue || options.value
			};
		},
		configure: function() {
			var model = this._model;
			var options = this.options;
			var chartInstance = this.chartInstance;
			var ctx = chartInstance.chart.ctx;

			var scale = chartInstance.scales[options.scaleID];
			var pixel, endPixel;
			if (scale) {
				pixel = helpers.isValid(options.value) ? scale.getPixelForValue(options.value, options.value.index) : NaN;
				endPixel = helpers.isValid(options.endValue) ? scale.getPixelForValue(options.endValue, options.value.index) : pixel;
			}

			if (isNaN(pixel)) {
				return;
			}

			var chartArea = chartInstance.chartArea;

			// clip annotations to the chart area
			model.clip = {
				x1: chartArea.left,
				x2: chartArea.right,
				y1: chartArea.top,
				y2: chartArea.bottom
			};

			if (this.options.mode === horizontalKeyword) {
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

			model.line = new LineFunction(model);
			model.mode = options.mode;

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
			model.labelRotation = options.label.rotation;

			ctx.font = chartHelpers.fontString(model.labelFontSize, model.labelFontStyle, model.labelFontFamily);
			var textWidth = ctx.measureText(model.labelContent).width;
			var textHeight = model.labelFontSize;
			model.labelHeight = textHeight + (2 * model.labelYPadding);

			if (model.labelContent && chartHelpers.isArray(model.labelContent)) {
				var labelContentArray = model.labelContent.slice(0);
				var longestLabel = labelContentArray.sort(function(a, b) {
					return b.length - a.length;
				})[0];
				textWidth = ctx.measureText(longestLabel).width;

				model.labelHeight = (textHeight * model.labelContent.length) + (2 * model.labelYPadding);
				// Add padding in between each label item
				model.labelHeight += model.labelYPadding * (model.labelContent.length - 1);
			}

			var labelPosition = calculateLabelPosition(model, textWidth, textHeight, model.labelXPadding, model.labelYPadding);
			model.labelX = labelPosition.x - model.labelXPadding;
			model.labelY = labelPosition.y - model.labelYPadding;
			model.labelWidth = textWidth + (2 * model.labelXPadding);

			model.borderColor = options.borderColor;
			model.borderWidth = options.borderWidth;
			model.borderDash = options.borderDash || [];
			model.borderDashOffset = options.borderDashOffset || 0;
		},
		inRange: function(mouseX, mouseY) {
			var model = this._model;

			return (
				// On the line
				model.line &&
				model.line.intersects(mouseX, mouseY, this.getHeight())
			) || (
				// On the label
				model.labelEnabled &&
				model.labelContent &&
				mouseX >= model.labelX &&
				mouseX <= model.labelX + model.labelWidth &&
				mouseY >= model.labelY &&
				mouseY <= model.labelY + model.labelHeight
			);
		},
		getCenterPoint: function() {
			return {
				x: (this._model.x2 + this._model.x1) / 2,
				y: (this._model.y2 + this._model.y1) / 2
			};
		},
		getWidth: function() {
			return Math.abs(this._model.right - this._model.left);
		},
		getHeight: function() {
			return this._model.borderWidth || 1;
		},
		getArea: function() {
			return Math.sqrt(Math.pow(this.getWidth(), 2) + Math.pow(this.getHeight(), 2));
		},
		draw: function() {
			var view = this._view;
			var ctx = this.chartInstance.chart.ctx;

			if (!view.clip) {
				return;
			}

			ctx.save();

			// Canvas setup
			ctx.beginPath();
			ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
			ctx.clip();

			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;

			if (ctx.setLineDash) {
				ctx.setLineDash(view.borderDash);
			}
			ctx.lineDashOffset = view.borderDashOffset;

			// Draw
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x2, y2);
			ctx.stroke();

			if (view.labelEnabled && label.content) {
				ctx.beginPath();
				ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
				ctx.clip();

				ctx.translate(view.labelX + (labelWidth / 2), view.labelY + (labelHeight / 2));
				ctx.rotate(view.labelRotation * Math.PI / 180);

				ctx.fillStyle = view.labelBackgroundColor;
				// Draw the tooltip
				chartHelpers.drawRoundedRectangle(
					ctx,
					-(labelWidth / 2), // x
					-(labelHeight / 2), // y
					labelWidth, // width
					labelHeight, // height
					view.labelCornerRadius // radius
				);
				ctx.fill();

				// Draw the text
				ctx.font = chartHelpers.fontString(
					view.labelFontSize,
					view.labelFontStyle,
					view.labelFontFamily
				);
				ctx.fillStyle = view.labelFontColor;
				ctx.textAlign = 'center';

				if (label.content && chartHelpers.isArray(label.content)) {
					var textYPosition = -(labelHeight / 2) + label.yPadding;
					for (var i = 0; i < label.content.length; i++) {
						ctx.textBaseline = 'top';
						ctx.fillText(
							label.content[i],
							-(labelWidth / 2) + (labelWidth / 2),
							textYPosition
						);

						textYPosition += view.labelFontSize + label.yPadding;
					}
				} else {
					ctx.textBaseline = 'middle';
					ctx.fillText(label.content, 0, 0);
				}
			}

			ctx.restore();
		}
	});

	return LineAnnotation;
};
*/
