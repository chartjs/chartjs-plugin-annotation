/*!
* chartjs-plugin-annotation v3.0.0-beta
* undefined
 * (c) 2020 Chart.js Contributors
 * Released under the MIT License
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js'), require('chart.js/helpers')) :
typeof define === 'function' && define.amd ? define(['chart.js', 'chart.js/helpers'], factory) :
(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global['chartjs-plugin-annotation'] = factory(global.Chart, global.Chart.helpers));
}(this, (function (chart_js, helpers) { 'use strict';

function handleEvent(event, elements) {
	const element = getNearestItem(elements, event);
	const native = event.native;
	const eventHandlers = [];

	if (native.type === 'mousemove') {
		addHoverEvents(eventHandlers, native, elements, element);
	} else if (element && detectDoubleClick(native, element)) {
		return;
	}

	// Dispatch the event to the usual handler, but only if we haven't substituted it
	if (element && eventHandlers.length === 0) {
		addEventHandler(eventHandlers, native, element);
	}

	if (eventHandlers.length > 0) {
		native.stopImmediatePropagation();
		native.preventDefault();
		eventHandlers.forEach((eventHandler) => {
			// [handler, event, element]
			eventHandler[0].call(eventHandler[2], eventHandler[1]);
		});
	}
}

function addHoverEvents(eventHandlers, event, elements, element) {
	if (element && !element.hovering) {
		['mouseenter', 'mouseover'].forEach((eventName) => {
			element.hovering = true;
			const hoverEvent = createMouseEvent(eventName, event);
			addEventHandler(eventHandlers, hoverEvent, element);
		});
	} else if (!element) {
		elements.forEach((el) => {
			if (el.hovering) {
				el.hovering = false;
				['mouseout', 'mouseleave'].forEach((eventName) => {
					const hoverEvent = createMouseEvent(eventName, event);
					addEventHandler(eventHandlers, hoverEvent, el);
				});
			}
		});
	}
}

function addEventHandler(eventHandlers, event, element) {
	const options = element.options || {};
	const eventHandlerName = getEventHandlerName(event.type);
	const handler = options[eventHandlerName];
	if (typeof handler === 'function') {
		eventHandlers.push([handler, event, element]);
	}
}

function detectDoubleClick(event, element, dblClickSpeed) {
	// Suppress duplicate click events during a double click
	// 1. click -> 2. click -> 3. dblclick
	//
	// 1: wait dblClickSpeed ms, then fire click
	// 2: cancel (1) if it is waiting then wait dblClickSpeed ms then fire click, else fire click immediately
	// 3: cancel (1) or (2) if waiting, then fire dblclick

	const options = element.options || {};
	if (event.type === 'click' && typeof options.onClick === 'function') {
		clearTimeout(element.clickTimeout);
		element.clickTimeout = setTimeout(() => {
			delete element.clickTimeout;
			options.onClick.call(element, event);
		}, dblClickSpeed);
		event.stopImmediatePropagation();
		event.preventDefault();
		return true;
	} else if (event.type === 'dblclick' && element.clickTimeout) {
		clearTimeout(element.clickTimeout);
		delete element.clickTimeout;
	}
}

function getEventHandlerName(eventName) {
	return 'on' + eventName[0].toUpperCase() + eventName.substring(1);
}

function createMouseEvent(type, previousEvent) {
	try {
		return new MouseEvent(type, previousEvent);
	} catch (exception) {
		try {
			const m = document.createEvent('MouseEvent');
			m.initMouseEvent(
				type,
				previousEvent.canBubble,
				previousEvent.cancelable,
				previousEvent.view,
				previousEvent.detail,
				previousEvent.screenX,
				previousEvent.screenY,
				previousEvent.clientX,
				previousEvent.clientY,
				previousEvent.ctrlKey,
				previousEvent.altKey,
				previousEvent.shiftKey,
				previousEvent.metaKey,
				previousEvent.button,
				previousEvent.relatedTarget
			);
			return m;
		} catch (exception2) {
			const e = document.createEvent('Event');
			e.initEvent(
				type,
				previousEvent.canBubble,
				previousEvent.cancelable
			);
			return e;
		}
	}
}

function getNearestItem(elements, position) {
	let minDistance = Number.POSITIVE_INFINITY;

	return elements
		.filter((element) => element.inRange(position.x, position.y))
		.reduce((nearestItems, element) => {
			const center = element.getCenterPoint();
			const distance = helpers.distanceBetweenPoints(position, center);

			if (distance < minDistance) {
				nearestItems = [element];
				minDistance = distance;
			} else if (distance === minDistance) {
				// Can have multiple items at the same distance in which case we sort by size
				nearestItems.push(element);
			}

			return nearestItems;
		}, [])
		.sort((a, b) => {
			// If there are multiple elements equally close,
			// sort them by size, then by index
			const sizeA = a.getArea();
			const sizeB = b.getArea();
			return (sizeA > sizeB || sizeA < sizeB) ? sizeA - sizeB : a._index - b._index;
		})
		.slice(0, 1)[0]; // return only the top item
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

const PI = Math.PI;
const HALF_PI = PI / 2;

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;

class LineAnnotation extends chart_js.Element {
	intersects(x, y, epsilon) {
		epsilon = epsilon || 0.001;
		const me = this;
		const p1 = {x: me.x, y: me.y};
		const p2 = {x: me.x2, y: me.y2};
		const dy = interpolateY(x, p1, p2);
		const dx = interpolateX(y, p1, p2);
		return (
			(!isFinite(dy) || Math.abs(y - dy) < epsilon) &&
			(!isFinite(dx) || Math.abs(x - dx) < epsilon)
		);
	}

	labelIsVisible() {
		const label = this.options.label;
		return label && label.enabled && label.content;
	}

	isOnLabel(x, y) {
		const labelRect = this.labelRect || {};
		const w2 = labelRect.width / 2;
		const h2 = labelRect.height / 2;
		return this.labelIsVisible() &&
			x >= labelRect.x - w2 &&
			x <= labelRect.x + w2 &&
			y >= labelRect.y - h2 &&
			y <= labelRect.y + h2;
	}

	inRange(x, y) {
		const epsilon = this.options.borderWidth || 1;
		return this.intersects(x, y, epsilon) || this.isOnLabel(x, y);
	}

	getCenterPoint() {
		return {
			x: (this.x2 + this.x) / 2,
			y: (this.y2 + this.y) / 2
		};
	}

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

		if (this.labelIsVisible()) {
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

	ctx.font = helpers.fontString(
		label.font.size,
		label.font.style,
		label.font.family
	);
	ctx.textAlign = 'center';

	const {width, height} = measureLabel(ctx, label);
	const pos = calculateLabelPosition(line, width, height);
	line.labelRect = {x: pos.x, y: pos.y, width, height};

	ctx.translate(pos.x, pos.y);
	ctx.rotate(label.rotation * PI / 180);

	ctx.fillStyle = label.backgroundColor;
	roundedRect(ctx, -(width / 2), -(height / 2), width, height, label.cornerRadius);
	ctx.fill();

	ctx.fillStyle = label.font.color;
	if (helpers.isArray(label.content)) {
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
	const lines = helpers.isArray(content) ? content : [content];
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

const chartElements = new Map();

const annotationTypes = {
	box: BoxAnnotation,
	line: LineAnnotation
};

var Annotation = {
	id: 'annotation',

	beforeUpdate(chart, options) {
		bindAfterDataLimits(chart, options);
	},

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
			handleEvent(event, chartElements.get(chart));
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
	const animOpts = chartAnims && helpers.merge({}, [chartAnims, options.animation]);
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

const scaleValue = (scale, value, fallback) => helpers.isFinite(value) ? scale.getPixelForValue(value) : fallback;

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
		options: helpers.merge(Object.create(null), [defaults, options])
	};
}

function draw(chart, options, caller) {
	const {ctx, chartArea} = chart;
	const elements = chartElements.get(chart);

	helpers.clipArea(ctx, chartArea);
	for (let i = 0; i < elements.length; i++) {
		const el = elements[i];
		if ((el.options.drawTime || options.drawTime || caller) === caller) {
			el.draw(ctx);
		}
	}
	helpers.unclipArea(ctx);
}

const binds = new WeakSet();
function bindAfterDataLimits(chart, options) {
	const scales = chart.scales || {};
	Object.keys(scales).forEach(id => {
		const scale = chart.scales[id];
		if (binds.has(scale)) {
			return;
		}
		const originalHook = scale.afterDataLimits;
		scale.afterDataLimits = function(...args) {
			if (originalHook) {
				originalHook.apply(scale, [...args]);
			}
			adjustScaleRange(scale, options);
		};
		binds.add(scale);
	});
}

function adjustScaleRange(scale, options) {
	const annotations = options.annotations || [];
	const range = getScaleLimits(scale, annotations);
	let changed = false;
	if (helpers.isFinite(range.min) &&
		typeof scale.options.min === 'undefined' &&
		typeof scale.options.suggestedMin === 'undefined') {
		scale.min = range.min;
		changed = true;
	}
	if (helpers.isFinite(range.max) &&
		typeof scale.options.max === 'undefined' &&
		typeof scale.options.suggestedMax === 'undefined') {
		scale.max = range.max;
		changed = true;
	}
	if (changed && typeof scale.handleTickRangeOptions === 'function') {
		scale.handleTickRangeOptions();
	}
}

function getScaleLimits(scale, annotations) {
	const axis = scale.axis;
	const scaleID = scale.id;
	const scaleIDOption = scale.axis + 'ScaleID';
	const scaleAnnotations = annotations.filter(annotation => annotation[scaleIDOption] === scaleID || annotation.scaleID === scaleID);
	let min = helpers.valueOrDefault(scale.min, Number.NEGATIVE_INFINITY);
	let max = helpers.valueOrDefault(scale.max, Number.POSITIVE_INFINITY);
	scaleAnnotations.forEach(annotation => {
		['value', 'endValue', axis + 'Min', axis + 'Max'].forEach(prop => {
			if (prop in annotation) {
				const value = annotation[prop];
				min = Math.min(min, value);
				max = Math.max(max, value);
			}
		});
	});
	return {min, max};
}

chart_js.Chart.register(Annotation, BoxAnnotation, LineAnnotation);

return Annotation;

})));
