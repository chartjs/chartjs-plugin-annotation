// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;

// Configure plugin namespace
Chart.Annotation = Chart.Annotation || {};

Chart.Annotation.drawTimeOptions = {
	AFTER: 'afterDraw',
	AFTER_DATASETS: 'afterDatasetsDraw',
	BEFORE_DATASETS: 'beforeDatasetsDraw',
};

Chart.Annotation.types = {
	line: require('./line.js')(Chart),
	box: require('./box.js')(Chart)
};

// Default plugin options
Chart.Annotation.defaults = {
	drawTime: Chart.Annotation.drawTimeOptions.AFTER,
	annotations: []
};

// Default annotation label options
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

function updateAnnotations(chartInstance) {
	if (helpers.isArray(chartInstance.annotations)) {
		chartInstance.annotations.forEach(function(annotation) {
			var type = Chart.Annotation.types[annotation.config.type];
			if (type) {
				type.update(annotation, annotation.config, chartInstance);
			}
		});
	}
}

function initConfig(config) {
	config = helpers.configMerge(Chart.Annotation.defaults, config);
	if (helpers.isArray(config.annotations)) {
		config.annotations.forEach(function(annotation) {
			annotation.label = helpers.configMerge(Chart.Annotation.labelDefaults, annotation.label);
		});
	}
	return config;
}

function buildAnnotations(configs) {
	return configs
		.filter(function(config) {
			return !!Chart.Annotation.types[config.type];
		})
		.map(function(config, i) {
			var annotation = Chart.Annotation.types[config.type];
			return new annotation.class({
				_index: i,
				config: config
			});
		});
}

// Chartjs Zoom Plugin
var annotationPlugin = {
	beforeInit: function(chartInstance) {
		var config = chartInstance.options.annotation;
		config = initConfig(config || {});
		if (helpers.isArray(config.annotations)) {
			chartInstance.annotations = buildAnnotations(config.annotations);
		}
	},
	afterScaleUpdate: updateAnnotations,
	afterDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.options.annotation;
		if (config.drawTime == Chart.Annotation.drawTimeOptions.AFTER) {
			drawAnnotations(chartInstance, easingDecimal);
		}
	},
	afterDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.options.annotation;
		if (config.drawTime == Chart.Annotation.drawTimeOptions.AFTER_DATASETS) {
			drawAnnotations(chartInstance, easingDecimal);
		}
	},
	beforeDatasetsDraw: function(chartInstance, easingDecimal) {
		var config = chartInstance.options.annotation;
		if (config.drawTime == Chart.Annotation.drawTimeOptions.BEFORE_DATASETS) {
			drawAnnotations(chartInstance, easingDecimal);
		}
	}
};

module.exports = annotationPlugin;
Chart.pluginService.register(annotationPlugin);
