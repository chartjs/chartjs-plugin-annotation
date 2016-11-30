// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var chartHelpers = Chart.helpers;
var helpers = require('./helpers.js');

// Configure plugin namespace
Chart.Annotation = Chart.Annotation || {};

var DRAW_AFTER = 'afterDraw';
var DRAW_AFTER_DATASETS = 'afterDatasetsDraw';
var DRAW_BEFORE_DATASETS = 'beforeDatasetsDraw';

Chart.Annotation.drawTimeOptions = {
	afterDraw: DRAW_AFTER,
	afterDatasetsDraw: DRAW_AFTER_DATASETS,
	beforeDatasetsDraw: DRAW_BEFORE_DATASETS
};

Chart.Annotation.Element = require('./element.js')(Chart);

var annotationTypes =
Chart.Annotation.types = {
	line: require('./types/line.js')(Chart),
	box: require('./types/box.js')(Chart)
};

// Default plugin options
var annotationDefaults =
Chart.Annotation.defaults = {
	drawTime: DRAW_AFTER,
	events: [],
	annotations: []
};

// Default annotation label options
var labelDefaults =
Chart.Annotation.labelDefaults = {
	backgroundColor: 'rgba(0,0,0,0.8)',
	fontFamily: Chart.defaults.global.defaultFontFamily,
	fontSize: Chart.defaults.global.defaultFontSize,
	fontStyle: 'bold',
	fontColor: '#fff',
	xPadding: 6,
	yPadding: 6,
	cornerRadius: 6,
	position: 'center',
	xAdjust: 0,
	yAdjust: 0,
	enabled: false,
	content: null
};

function draw(chartInstance, easingDecimal) {
	if (chartHelpers.isArray(chartInstance.annotations)) {
		chartInstance.annotations.forEach(function(annotation) {
			annotation.transition(easingDecimal).draw();
		});
	}
}

function initConfig(config) {
	config = chartHelpers.configMerge(annotationDefaults, config);
	if (chartHelpers.isArray(config.annotations)) {
		config.annotations.forEach(function(annotation) {
			annotation.label = chartHelpers.configMerge(labelDefaults, annotation.label);
		});
	}
	return config;
}

function build(configs, chartInstance) {
	return configs
		.filter(function(config) {
			return !!annotationTypes[config.type];
		})
		.map(function(config, i) {
			var annotation = annotationTypes[config.type];
			var annotationObject = new annotation({
				_index: i,
				options: config,
				chartInstance: chartInstance,
				ctx: chartInstance.chart.ctx
			});
			annotationObject.initialize();
			return annotationObject;
		});
}

function eventDispatcher(e) {
	var position = chartHelpers.getRelativePosition(e, this.chart);
	var element = helpers.getNearestItems(this.annotations, position);
	var eventHandlerName = helpers.getEventHandlerName(e.type);
	var options = (element || {}).options;
	if (element && options[eventHandlerName]) {
		e.stopImmediatePropagation();
		e.preventDefault();
		options[eventHandlerName].call(element, e);
	}
}

var annotationPlugin = {
	beforeInit: function(chartInstance) {
		chartInstance.annotations = [];

		// Decorate Chart.Controller.buildScales() so we can decorate each scale
		// instance's determineDataLimits() method
		helpers.decorate(chartInstance, 'buildScales', function(previous) {
			previous();

			// Decorate Chart.Scale.determineDataLimits() so we can
			// check the annotation values and adjust the scale range
			Object.keys(chartInstance.scales).forEach(function(scaleId) {
				var scale = chartInstance.scales[scaleId];

				helpers.decorate(scale, 'determineDataLimits', function(previous) {
					previous();

					if (chartInstance.annotations) {
						var range = helpers.getScaleLimits(scaleId, chartInstance.annotations, scale.min, scale.max);
						if (typeof scale.options.ticks.min === 'undefined' && typeof scale.options.ticks.suggestedMin === 'undefined') {
							scale.min = range.min;
						}
						if (typeof scale.options.ticks.max === 'undefined' && typeof scale.options.ticks.suggestedMax === 'undefined') {
							scale.max = range.max;
						}
					}
				});
			});
		});

		// Detect and intercept events that happen on an annotation element
		var config = chartInstance.options.annotation || {};
		if (config.events) {
			chartInstance._annotationEventHandler = eventDispatcher.bind(chartInstance);
			config.events.forEach(function(eventName) {
				chartHelpers.addEvent(chartInstance.chart.canvas, eventName, chartInstance._annotationEventHandler);
			});
		}
	},
	destroy: function(chartInstance) {
		var config = chartInstance.annotations._config;
		if (config.events.length > 0) {
			config.events.forEach(function(eventName) {
				chartHelpers.removeEvent(chartInstance.chart.canvas, eventName, chartInstance._annotationEventHandler);
			});
		}
	},
	beforeUpdate: function(chartInstance) {
		// Build the configuration with all the defaults set
		var config = chartInstance.options.annotation;
		config = initConfig(config || {});

		if (chartHelpers.isArray(config.annotations)) {
			chartInstance.annotations.forEach(function(annotation) {
				annotation.destroy(chartInstance);
			});
			chartInstance.annotations = build(config.annotations, chartInstance);
			chartInstance.annotations._config = config;
		}
	},
	afterScaleUpdate: function(chartInstance) {
		if (chartHelpers.isArray(chartInstance.annotations)) {
			chartInstance.annotations.forEach(function(annotation) {
				annotation.configure();
			});
		}
	},
	afterDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_AFTER) {
			draw(chartInstance, easingDecimal);
		}
	},
	afterDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_AFTER_DATASETS) {
			draw(chartInstance, easingDecimal);
		}
	},
	beforeDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_BEFORE_DATASETS) {
			draw(chartInstance, easingDecimal);
		}
	}
};

module.exports = annotationPlugin;
Chart.pluginService.register(annotationPlugin);
