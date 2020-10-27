import {Animations} from 'chart.js';
import {clipArea, unclipArea, isFinite, merge, valueOrDefault} from 'chart.js/helpers';
import handleEvent from './events';
import BoxAnnotation from './types/box';
import LineAnnotation from './types/line';

const chartElements = new Map();

const annotationTypes = {
	box: BoxAnnotation,
	line: LineAnnotation
};

export default {
	id: 'annotation',

	beforeUpdate(chart, args, options) {
		if (!args.mode) {
			bindAfterDataLimits(chart, options);
		}
	},

	afterUpdate(chart, args, options) {
		updateElements(chart, options, args.mode);
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
		chartElements.delete(chart);
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
	const animations = new Animations(chart, animOpts, mode);

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

const scaleValue = (scale, value, fallback) => isFinite(value) ? scale.getPixelForValue(value) : fallback;

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
		chartInstance: chart,
		x,
		y,
		x2,
		y2,
		width: x2 - x,
		height: y2 - y,
		options: merge(Object.create(null), [defaults, options])
	};
}

function draw(chart, options, caller) {
	const {ctx, chartArea} = chart;
	const elements = chartElements.get(chart);

	clipArea(ctx, chartArea);
	for (let i = 0; i < elements.length; i++) {
		const el = elements[i];
		if ((el.options.drawTime || options.drawTime || caller) === caller) {
			el.draw(ctx);
		}
	}
	unclipArea(ctx);
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

function getAnnotationOptions(chart, options) {
	const elems = chartElements.get(chart);
	if (elems && elems.length) {
		return elems.map(el => el.options);
	}
	return options.annotations || [];
}

function adjustScaleRange(scale, options) {
	const annotations = getAnnotationOptions(scale.chart, options);
	const range = getScaleLimits(scale, annotations);
	let changed = false;
	if (isFinite(range.min) &&
		typeof scale.options.min === 'undefined' &&
		typeof scale.options.suggestedMin === 'undefined') {
		scale.min = range.min;
		changed = true;
	}
	if (isFinite(range.max) &&
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
	let min = valueOrDefault(scale.min, Number.NEGATIVE_INFINITY);
	let max = valueOrDefault(scale.max, Number.POSITIVE_INFINITY);
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

