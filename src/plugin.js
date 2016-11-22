// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;

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

function drawAnnotations(chartInstance, easingDecimal) {
	if (helpers.isArray(chartInstance.annotations)) {
		chartInstance.annotations.forEach(function(annotation) {
			annotation.transition(easingDecimal)
				.draw(chartInstance.chart.ctx);
		});
	}
}

function initConfig(config) {
	config = helpers.configMerge(annotationDefaults, config);
	if (helpers.isArray(config.annotations)) {
		config.annotations.forEach(function(annotation) {
			annotation.label = helpers.configMerge(labelDefaults, annotation.label);
		});
	}
	return config;
}

function buildAnnotations(configs) {
	return configs
		.filter(function(config) {
			return !!annotationTypes[config.type];
		})
		.map(function(config, i) {
			var annotation = annotationTypes[config.type];
			return new annotation({
				_index: i,
				config: config
			});
		});
}

var annotationPlugin = {
	afterUpdate: function(chartInstance) {
		// Build the configuration with all the defaults set
		var config = chartInstance.options.annotation;
		config = initConfig(config || {});

		if (helpers.isArray(config.annotations)) {
			chartInstance.annotations = buildAnnotations(config.annotations);
			chartInstance.annotations._config = config;

			chartInstance.annotations.forEach(function(annotation) {
				annotation.configure(annotation.config, chartInstance);
			});
		}
	},
	afterDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_AFTER) {
			drawAnnotations(chartInstance, easingDecimal);
		}
	},
	afterDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_AFTER_DATASETS) {
			drawAnnotations(chartInstance, easingDecimal);
		}
	},
	beforeDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.annotations._config;
		if (config.drawTime == DRAW_BEFORE_DATASETS) {
			drawAnnotations(chartInstance, easingDecimal);
		}
	}
};

module.exports = annotationPlugin;
Chart.pluginService.register(annotationPlugin);
