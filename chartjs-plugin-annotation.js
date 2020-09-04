/*!
* chartjs-plugin-annotation v0.5.7
* undefined
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js')) :
typeof define === 'function' && define.amd ? define(['chart.js'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['chartjs-plugin-annotation'] = factory(global.Chart));
}(this, (function (chart_js) { 'use strict';

/*!
 * Chart.js v3.0.0-beta
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
function isArray(value) {
	if (Array.isArray && Array.isArray(value)) {
		return true;
	}
	const type = Object.prototype.toString.call(value);
	if (type.substr(0, 7) === '[object' && type.substr(-6) === 'Array]') {
		return true;
	}
	return false;
}
function isObject(value) {
	return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
const isNumberFinite = (value) => (typeof value === 'number' || value instanceof Number) && isFinite(+value);
function clone(source) {
	if (isArray(source)) {
		return source.map(clone);
	}
	if (isObject(source)) {
		const target = {};
		const keys = Object.keys(source);
		const klen = keys.length;
		let k = 0;
		for (; k < klen; ++k) {
			target[keys[k]] = clone(source[keys[k]]);
		}
		return target;
	}
	return source;
}
function _merger(key, target, source, options) {
	const tval = target[key];
	const sval = source[key];
	if (isObject(tval) && isObject(sval)) {
		merge(tval, sval, options);
	} else {
		target[key] = clone(sval);
	}
}
function merge(target, source, options) {
	const sources = isArray(source) ? source : [source];
	const ilen = sources.length;
	if (!isObject(target)) {
		return target;
	}
	options = options || {};
	const merger = options.merger || _merger;
	for (let i = 0; i < ilen; ++i) {
		source = sources[i];
		if (!isObject(source)) {
			continue;
		}
		const keys = Object.keys(source);
		for (let k = 0, klen = keys.length; k < klen; ++k) {
			merger(keys[k], target, source, options);
		}
	}
	return target;
}

/*!
 * Chart.js v3.0.0-beta
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
function clipArea(ctx, area) {
	ctx.save();
	ctx.beginPath();
	ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
	ctx.clip();
}
function unclipArea(ctx) {
	ctx.restore();
}

class BoxAnnotation extends chart_js.Element {
	inRange(mouseX, mouseY, useFinalPosition) {
		const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);

		return mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
	}

	getCenterPoint(useFinalPosition) {
		const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
		return {
			x: x + width / 2,
			y: y + height / 2
		};
	}

	draw(ctx) {
		const {x, y, width, height, options} = this;

		ctx.save();

		ctx.lineWidth = options.borderWidth;
		ctx.strokeStyle = options.borderColor;
		ctx.fillStyle = options.backgroundColor;

		ctx.fillRect(x, y, width, height);
		ctx.strokeRect(x, y, width, height);

		ctx.restore();
	}
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
	borderWidth: 1
};

BoxAnnotation.defaultRoutes = {
	borderColor: 'color',
	backgroundColor: 'color'
};

/*
function(Chart) {
	var helpers = require('../helpers.js')(Chart);

	var BoxAnnotation = Chart.Annotation.Element.extend({
		setDataLimits: function() {
			var model = this._model;
			var options = this.options;
			var chartInstance = this.chartInstance;

			var xScale = chartInstance.scales[options.xScaleID];
			var yScale = chartInstance.scales[options.yScaleID];
			var chartArea = chartInstance.chartArea;

			// Set the data range for this annotation
			model.ranges = {};

			if (!chartArea) {
				return;
			}

			var min = 0;
			var max = 0;

			if (xScale) {
				min = helpers.isValid(options.xMin) ? options.xMin : xScale.getValueForPixel(chartArea.left);
				max = helpers.isValid(options.xMax) ? options.xMax : xScale.getValueForPixel(chartArea.right);

				model.ranges[options.xScaleID] = {
					min: Math.min(min, max),
					max: Math.max(min, max)
				};
			}

			if (yScale) {
				min = helpers.isValid(options.yMin) ? options.yMin : yScale.getValueForPixel(chartArea.bottom);
				max = helpers.isValid(options.yMax) ? options.yMax : yScale.getValueForPixel(chartArea.top);

				model.ranges[options.yScaleID] = {
					min: Math.min(min, max),
					max: Math.max(min, max)
				};
			}
		},
		configure: function() {
			var model = this._model;
			var options = this.options;
			var chartInstance = this.chartInstance;

			var xScale = chartInstance.scales[options.xScaleID];
			var yScale = chartInstance.scales[options.yScaleID];
			var chartArea = chartInstance.chartArea;

			// clip annotations to the chart area
			model.clip = {
				x1: chartArea.left,
				x2: chartArea.right,
				y1: chartArea.top,
				y2: chartArea.bottom
			};

			var left = chartArea.left;
			var top = chartArea.top;
			var right = chartArea.right;
			var bottom = chartArea.bottom;

			var min, max;

			if (xScale) {
				min = helpers.isValid(options.xMin) ? xScale.getPixelForValue(options.xMin) : chartArea.left;
				max = helpers.isValid(options.xMax) ? xScale.getPixelForValue(options.xMax) : chartArea.right;
				left = Math.min(min, max);
				right = Math.max(min, max);
			}

			if (yScale) {
				min = helpers.isValid(options.yMin) ? yScale.getPixelForValue(options.yMin) : chartArea.bottom;
				max = helpers.isValid(options.yMax) ? yScale.getPixelForValue(options.yMax) : chartArea.top;
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
		},
		inRange: function(mouseX, mouseY) {
			var model = this._model;
			return model &&
				mouseX >= model.left &&
				mouseX <= model.right &&
				mouseY >= model.top &&
				mouseY <= model.bottom;
		},
		getCenterPoint: function() {
			var model = this._model;
			return {
				x: (model.right + model.left) / 2,
				y: (model.bottom + model.top) / 2
			};
		},
		getWidth: function() {
			var model = this._model;
			return Math.abs(model.right - model.left);
		},
		getHeight: function() {
			var model = this._model;
			return Math.abs(model.bottom - model.top);
		},
		getArea: function() {
			return this.getWidth() * this.getHeight();
		},
		draw: function() {
			var view = this._view;
			var ctx = this.chartInstance.chart.ctx;

			ctx.save();

			// Canvas setup
			ctx.beginPath();
			ctx.rect(view.clip.x1, view.clip.y1, view.clip.x2 - view.clip.x1, view.clip.y2 - view.clip.y1);
			ctx.clip();

			ctx.lineWidth = view.borderWidth;
			ctx.strokeStyle = view.borderColor;
			ctx.fillStyle = view.backgroundColor;

			// Draw
			var width = view.right - view.left;
			var height = view.bottom - view.top;
			ctx.fillRect(view.left, view.top, width, height);
			ctx.strokeRect(view.left, view.top, width, height);

			ctx.restore();
		}
	});

	return BoxAnnotation;
};
*/

/*!
 * Chart.js v3.0.0-beta
 * https://www.chartjs.org
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
function fontString(pixelSize, fontStyle, fontFamily) {
	return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
}

const PI = Math.PI;
const HALF_PI = PI / 2;

class LineAnnotation extends chart_js.Element {

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
			family: chart_js.defaults.font.family,
			size: chart_js.defaults.font.size,
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

const chartElements = new Map();

const annotationTypes = {
	box: BoxAnnotation,
	line: LineAnnotation
};

var Annotation = {
	id: 'annotation',

	afterUpdate(chart, options) {
		updateElements(chart, options);
	},

	resize(chart, options) {
		updateElements(chart, options, 'resize');
	},

	beforeDatasetDraw(chart, options) {
		draw(chart, options, 'beforeDatasetsDraw');
	},

	afterDatasetsDraw(chart, options) {
		draw(chart, options, 'afterDatasetsDraw');
	},

	afterDraw(chart, options) {
		draw(chart, options, 'afterDraw');
	},

	afterEvent(chart, event, _replay, options) {
		const events = options.events || [];
		if (events.indexOf(event.type) !== -1) {
			handleEvent(chart, event, options);
		}
	},

	destroy(chart) {
		chartElements.remove(chart);
	},

	defaults: {
		drawTime: 'afterDatasetsDraw',
		dblClickSpeed: 350, // ms
		events: [],
		annotations: [],
		animation: {
			numbers: {
				properties: ['x', 'y', 'x2', 'y2', 'width', 'height'],
				type: 'number'
			},
		}
	},
};

function updateElements(chart, options, mode) {
	const chartAnims = chart.options.animation;
	const animOpts = chartAnims && merge({}, [chartAnims, options.animation]);
	const animations = new chart_js.Animations(chart, animOpts, mode);

	const elements = chartElements.get(chart) || (chartElements.set(chart, []).get(chart));
	const annotations = options.annotations || [];
	const count = annotations.length;
	const start = elements.length;

	if (start < count) {
		const add = count - start;
		elements.splice(start, 0, ...new Array(add));
	} else if (start > count) {
		elements.splice(count, start - count);
	}
	for (let i = 0; i < annotations.length; i++) {
		const annotation = annotations[i];
		let el = elements[i];
		const elType = annotationTypes[annotation.type] || annotationTypes.line;
		if (!el || !(el instanceof elType)) {
			el = elements[i] = new elType();
		}
		const properties = calculateElementProperties(chart, annotation, elType.defaults);
		animations.update(el, properties);
	}
}

const scaleValue = (scale, value, fallback) => isNumberFinite(value) ? scale.getPixelForValue(value) : fallback;

function calculateElementProperties(chart, options, defaults) {
	const scale = chart.scales[options.scaleID];

	let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
	let min, max;

	if (scale) {
		min = scaleValue(scale, options.value, NaN);
		max = scaleValue(scale, options.endValue, min);
		if (scale.isHorizontal()) {
			x = Math.min(min, max);
			x2 = Math.max(min, max);
		} else {
			y = Math.min(min, max);
			y2 = Math.max(min, max);
		}
	} else {
		const xScale = chart.scales[options.xScaleID];
		const yScale = chart.scales[options.yScaleID];

		if (xScale) {
			min = scaleValue(xScale, options.xMin, x);
			max = scaleValue(xScale, options.xMax, x2);
			x = Math.min(min, max);
			x2 = Math.max(min, max);
		}

		if (yScale) {
			min = scaleValue(yScale, options.yMin, y2);
			max = scaleValue(yScale, options.yMax, y);
			y = Math.min(min, max);
			y2 = Math.max(min, max);
		}
	}

	return {
		x,
		y,
		x2,
		y2,
		width: x2 - x,
		height: y2 - y,
		options: merge({}, [defaults, options])
	};
}

function draw(chart, options, caller) {
	if (options.drawTime !== caller) {
		return;
	}
	const {ctx, chartArea} = chart;
	const elements = chartElements.get(chart);

	clipArea(ctx, chartArea);
	for (let i = 0; i < elements.length; i++) {
		const el = elements[i];
		if ((el.options.drawTime || caller) === caller) {
			el.draw(ctx);
		}
	}
	unclipArea(ctx);
}

/*
export default function(Chart) {
	var chartHelpers = Chart.helpers;

	var helpers = require('./helpers.js')(Chart);
	var events = require('./events.js')(Chart);

	var annotationTypes = Chart.Annotation.types;

	function setAfterDataLimitsHook(axisOptions) {
		helpers.decorate(axisOptions, 'afterDataLimits', function(previous, scale) {
			if (previous) {
				previous(scale);
			}
			helpers.adjustScaleRange(scale);
		});
	}

	function draw(drawTime) {
		return function(chartInstance, easingDecimal) {
			var defaultDrawTime = chartInstance.annotation.options.drawTime;

			helpers.elements(chartInstance)
				.filter(function(element) {
					return drawTime === (element.options.drawTime || defaultDrawTime);
				})
				.forEach(function(element) {
					element.configure();
					element.transition(easingDecimal).draw();
				});
		};
	}

	function getAnnotationConfig(chartOptions) {
		var plugins = chartOptions.plugins;
		var pluginAnnotation = plugins && plugins.annotation ? plugins.annotation : null;
		return pluginAnnotation || chartOptions.annotation || {};
	}

	return {
		id: 'annotation',
		beforeInit: function(chartInstance) {
			var chartOptions = chartInstance.options;

			// Initialize chart instance plugin namespace
			var ns = chartInstance.annotation = {
				elements: {},
				options: helpers.initConfig(getAnnotationConfig(chartOptions)),
				onDestroy: [],
				firstRun: true,
				supported: false
			};

			// Add the annotation scale adjuster to each scale's afterDataLimits hook
			chartInstance.ensureScalesHaveIDs();
			if (chartOptions.scales) {
				ns.supported = true;
				chartHelpers.each(chartOptions.scales.xAxes, setAfterDataLimitsHook);
				chartHelpers.each(chartOptions.scales.yAxes, setAfterDataLimitsHook);
			}
		},
		beforeUpdate: function(chartInstance) {
			var ns = chartInstance.annotation;

			if (!ns.supported) {
				return;
			}

			if (!ns.firstRun) {
				ns.options = helpers.initConfig(getAnnotationConfig(chartInstance.options));
			} else {
				ns.firstRun = false;
			}

			var elementIds = [];

			// Add new elements, or update existing ones
			ns.options.annotations.forEach(function(annotation) {
				var id = annotation.id || helpers.objectId();

				// No element with that ID exists, and it's a valid annotation type
				if (!ns.elements[id] && annotationTypes[annotation.type]) {
					var cls = annotationTypes[annotation.type];
					var element = new cls({
						id: id,
						options: annotation,
						chartInstance: chartInstance,
					});
					element.initialize();
					ns.elements[id] = element;
					annotation.id = id;
					elementIds.push(id);
				} else if (ns.elements[id]) {
					// Nothing to do for update, since the element config references
					// the same object that exists in the chart annotation config
					elementIds.push(id);
				}
			});

			// Delete removed elements
			Object.keys(ns.elements).forEach(function(id) {
				if (elementIds.indexOf(id) === -1) {
					ns.elements[id].destroy();
					delete ns.elements[id];
				}
			});
		},
		beforeDatasetsDraw: draw('beforeDatasetsDraw'),
		afterDatasetsDraw: draw('afterDatasetsDraw'),
		afterDraw: draw('afterDraw'),
		afterInit: function(chartInstance) {
			// Detect and intercept events that happen on an annotation element
			var watchFor = chartInstance.annotation.options.events;
			if (chartHelpers.isArray(watchFor) && watchFor.length > 0) {
				var canvas = chartInstance.chart.canvas;
				var eventHandler = events.dispatcher.bind(chartInstance);
				events.collapseHoverEvents(watchFor).forEach(function(eventName) {
					chartHelpers.addEvent(canvas, eventName, eventHandler);
					chartInstance.annotation.onDestroy.push(function() {
						chartHelpers.removeEvent(canvas, eventName, eventHandler);
					});
				});
			}
		},
		destroy: function(chartInstance) {
			if (!chartInstance || !chartInstance.annotation) {
				return;
			}
			var deregisterers = chartInstance.annotation.onDestroy;
			while (deregisterers.length > 0) {
				deregisterers.pop()();
			}
		}
	};
};
*/

chart_js.Chart.register(Annotation, BoxAnnotation, LineAnnotation);

return Annotation;

})));
