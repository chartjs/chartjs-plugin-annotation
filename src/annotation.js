module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;

	var helpers = require('./helpers.js')(Chart);
	var events = require('./events.js')(Chart);

	var annotationTypes = Chart.Annotation.types;

	function setAfterDataLimitsHook(axisOptions) {
		helpers.decorate(axisOptions, 'afterDataLimits', function(previous, scale) {
			if (previous) previous(scale);
			helpers.adjustScaleRange(scale);
		});
	}

	return {
		beforeInit: function(chartInstance) {
			var chartOptions = chartInstance.options;

			// Initialize chart instance plugin namespace
			var ns = chartInstance.annotation = {
				elements: {},
				options: helpers.initConfig(chartOptions.annotation || {}),
				onDestroy: [],
				firstRun: true
			};

			ns[ns.options.drawTime] = function(easingDecimal) {
				helpers.elements(chartInstance).forEach(function(element) {
					element.transition(easingDecimal).draw();
				});
			};

			// Add the annotation scale adjuster to each scale's afterDataLimits hook
			chartInstance.ensureScalesHaveIDs();
			chartHelpers.each(chartOptions.scales.xAxes, setAfterDataLimitsHook);
			chartHelpers.each(chartOptions.scales.yAxes, setAfterDataLimitsHook);
		},
		beforeUpdate: function(chartInstance) {
			var ns = chartInstance.annotation;

			if (!ns.firstRun) {
				ns.options = helpers.initConfig(chartInstance.options.annotation || {});
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
		afterScaleUpdate: function(chartInstance) {
			helpers.elements(chartInstance).forEach(function(element) {
				element.configure();
			});
		},
		beforeDatasetsDraw: function(chartInstance, easingDecimal) {
			(chartInstance.annotation.beforeDatasetsDraw || helpers.noop)(easingDecimal);
		},
		afterDatasetsDraw: function(chartInstance, easingDecimal) {
			(chartInstance.annotation.afterDatasetsDraw || helpers.noop)(easingDecimal);
		},
		afterDraw: function(chartInstance, easingDecimal) {
			(chartInstance.annotation.afterDraw || helpers.noop)(easingDecimal);
		},
		afterInit: function(chartInstance) {
			// Detect and intercept events that happen on an annotation element
			var watchFor = chartInstance.annotation.options.events;
			if (watchFor.length > 0) {
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
			var deregisterers = chartInstance.annotation.onDestroy;
			while (deregisterers.length > 0) {
				deregisterers.pop()();
			}
		}
	};
};
