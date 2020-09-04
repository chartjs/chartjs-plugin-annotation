import {Animations} from 'chart.js';
import {clipArea, unclipArea} from 'chart.js/helpers/canvas';
import {isFinite, merge} from 'chart.js/helpers/core';

import BoxAnnotation from './types/box';
import LineAnnotation from './types/line';

const chartElements = new Map();

const annotationTypes = {
	box: BoxAnnotation,
	line: LineAnnotation
};

export default {
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

	clipArea(ctx, chartArea)
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
