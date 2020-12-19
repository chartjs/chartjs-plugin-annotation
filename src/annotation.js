import {Animations} from 'chart.js';
import {clipArea, unclipArea, isFinite, merge, valueOrDefault, callback as callCallback, isObject} from 'chart.js/helpers';
import {handleEvent, updateListeners} from './events';
import BoxAnnotation from './types/box';
import LineAnnotation from './types/line';
import EllipseAnnotation from './types/ellipse';
import PointAnnotation from './types/point';

const chartStates = new Map();

const annotationTypes = {
	box: BoxAnnotation,
	line: LineAnnotation,
	ellipse: EllipseAnnotation,
	point: PointAnnotation
};

export default {
	id: 'annotation',

	beforeInit(chart) {
		chartStates.set(chart, {
			elements: [],
			listeners: {},
			listened: false,
			moveListened: false,
			scales: new Set()
		});
	},

	afterDataLimits(chart, args, options) {
		const state = chartStates.get(chart);
		adjustScaleRange(args.scale, state, options);
	},

	beforeUpdate(chart, args, options) {
		if (isObject(options.annotations)) {
			const array = new Array();
			Object.keys(options.annotations).forEach(key => {
				const value = options.annotations[key];
				if (isObject(value)) {
					value.id = key;
					array.push(value);
				}
			});
			options.annotations = array;
		}
	},

	afterUpdate(chart, args, options) {
		const state = chartStates.get(chart);
		updateListeners(chart, state, options);
		updateElements(chart, state, options, args.mode);
	},

	beforeDatasetsDraw(chart, _args, options) {
		draw(chart, options, 'beforeDatasetsDraw');
	},

	afterDatasetsDraw(chart, _args, options) {
		draw(chart, options, 'afterDatasetsDraw');
	},

	afterDraw(chart, _args, options) {
		draw(chart, options, 'afterDraw');
	},

	beforeEvent(chart, args, options) {
		const state = chartStates.get(chart);
		handleEvent(chart, state, args.event, options);
	},

	destroy(chart) {
		chartStates.delete(chart);
	},

	defaults: {
		drawTime: 'afterDatasetsDraw',
		dblClickSpeed: 350, // ms
		annotations: {},
		animation: {
			numbers: {
				properties: ['x', 'y', 'x2', 'y2', 'width', 'height'],
				type: 'number'
			},
		}
	},
};

const directUpdater = {
	update: Object.assign
};

function resolveAnimations(chart, animOpts, mode) {
	if (mode === 'reset' || mode === 'none' || mode === 'resize') {
		return directUpdater;
	}
	return new Animations(chart, animOpts);
}

function updateElements(chart, state, options, mode) {
	const chartAnims = chart.options.animation;
	const animOpts = chartAnims && merge({}, [chartAnims, options.animation]);
	const animations = resolveAnimations(chart, animOpts, mode);

	const annotations = options.annotations || [];
	const elements = resyncElements(state.elements, annotations);

	for (let i = 0; i < annotations.length; i++) {
		const annotation = annotations[i];
		let el = elements[i];
		const elType = annotationTypes[annotation.type] || annotationTypes.line;
		if (!el || !(el instanceof elType)) {
			el = elements[i] = new elType();
		}
		const display = typeof options.display === 'function' ? callCallback(options.display, [{chart, element: el}]) : valueOrDefault(options.display, true);
		el._display = !!display;

		if (el._display) {
			const properties = el.resolveElementProperties(chart, annotation);
			properties.options = merge(Object.create(null), [elType.defaults, annotation]);
			animations.update(el, properties);
		}
	}
}

function resyncElements(elements, annotations) {
	const count = annotations.length;
	const start = elements.length;

	if (start < count) {
		const add = count - start;
		elements.splice(start, 0, ...new Array(add));
	} else if (start > count) {
		elements.splice(count, start - count);
	}
	return elements;
}

function draw(chart, options, caller) {
	const {ctx, chartArea} = chart;
	const elements = chartStates.get(chart).elements;

	clipArea(ctx, chartArea);
	for (let i = 0; i < elements.length; i++) {
		const el = elements[i];
		if (el._display && (el.options.drawTime || options.drawTime || caller) === caller) {
			el.draw(ctx);
		}
	}
	unclipArea(ctx);
}

function getAnnotationOptions(elements, options) {
	if (elements && elements.length) {
		return elements.map(el => el.options);
	}
	return options.annotations || [];
}

function adjustScaleRange(scale, state, options) {
	const annotations = getAnnotationOptions(state.elements, options);
	const range = getScaleLimits(scale, annotations);
	let changed = false;
	if (isFinite(range.min) &&
		typeof scale.options.min === 'undefined' &&
		typeof scale.options.suggestedMin === 'undefined') {
		changed = scale.min !== range.min;
		scale.min = range.min;
	}
	if (isFinite(range.max) &&
		typeof scale.options.max === 'undefined' &&
		typeof scale.options.suggestedMax === 'undefined') {
		changed = scale.max !== range.max;
		scale.max = range.max;
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
		['value', 'endValue', axis + 'Min', axis + 'Max', 'xValue', 'yValue'].forEach(prop => {
			if (prop in annotation) {
				const value = annotation[prop];
				min = Math.min(min, value);
				max = Math.max(max, value);
			}
		});
	});
	return {min, max};
}
