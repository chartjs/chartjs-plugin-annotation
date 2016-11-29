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

var annotationTypes =
Chart.Annotation.types = {
	line: require('./types/line.js')(Chart),
	box: require('./types/box.js')(Chart)
};

// Default plugin options
var annotationDefaults =
Chart.Annotation.defaults = {
	drawTime: DRAW_AFTER,
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
			annotation.transition(easingDecimal)
				.draw(chartInstance.chart.ctx);
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
				config: config
			});

			// Set the data range for this annotation
			annotationObject.setRanges(config, chartInstance);

			return annotationObject;
		});
}

function getScaleLimits(scaleId, annotations, scaleMin, scaleMax) {
	var ranges = annotations.filter(function(annotation) {
		return !!annotation._model.ranges[scaleId];
	}).map(function(annotation) {
		return annotation._model.ranges[scaleId];
	});

	var min = ranges.map(function(range) {
		return Number(range.min);
	}).reduce(function(a, b) {
		return isFinite(b) && !isNaN(b) && b < a ? b : a;
	}, scaleMin);

	var max = ranges.map(function(range) {
		return Number(range.max);
	}).reduce(function(a, b) {
		return isFinite(b) && !isNaN(b) && b > a ? b : a;
	}, scaleMax);

	return {
		min: min,
		max: max
	};
}

var annotationPlugin = {
	beforeInit: function(chartInstance) {
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
						var range = getScaleLimits(scaleId, chartInstance.annotations, scale.min, scale.max);
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
	},
	beforeUpdate: function(chartInstance) {
		// Build the configuration with all the defaults set
		var config = chartInstance.options.annotation;
		config = initConfig(config || {});

		if (chartHelpers.isArray(config.annotations)) {
			chartInstance.annotations = build(config.annotations, chartInstance);
			chartInstance.annotations._config = config;
		}
	},
	afterScaleUpdate: function(chartInstance) {
		if (chartHelpers.isArray(chartInstance.annotations)) {
			chartInstance.annotations.forEach(function(annotation) {
				annotation.configure(annotation.config, chartInstance);
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
