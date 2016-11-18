// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;
var isArray = helpers.isArray;

// Configure plugin namespace
Chart.Annotation = Chart.Annotation || {};

// Default options if none are provided
Chart.Annotation.defaults = {
	drawTime: "afterDraw", // defaults to drawing after draw
	annotations: [] // default to no annotations
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

var lineAnnotation = require('./line.js')(Chart);
var boxAnnotation = require('./box.js')(Chart);

// Map of all types
Chart.Annotation.constructors = {
	line: lineAnnotation.Constructor,
	box: boxAnnotation.Constructor
};

// Map of all update functions
Chart.Annotation.updateFunctions = {
	line: lineAnnotation.update,
	box: boxAnnotation.update
};

Chart.Annotation.drawTimeOptions = {
	afterDraw: "afterDraw",
	afterDatasetsDraw: "afterDatasetsDraw",
	beforeDatasetsDraw: "beforeDatasetsDraw",
};

function drawAnnotations(drawTime, chartInstance, easingDecimal) {
	var annotationConfigs = chartInstance.options.annotation;
	if (annotationConfigs.drawTime != drawTime) {
		return;
	}
	// If we have annotations, draw them
	var annotationObjects = chartInstance.annotations;
	if (isArray(annotationObjects)) {
		var ctx = chartInstance.chart.ctx;

		annotationObjects.forEach(function(annotation) {
			annotation.transition(easingDecimal).draw(ctx);
		});
	}
}

// Chartjs Zoom Plugin
var annotationPlugin = {
	beforeInit: function(chartInstance) {
		chartInstance.options.annotation = helpers.configMerge(
			Chart.Annotation.defaults,
			chartInstance.options.annotation
		);
		var annotationConfigs = chartInstance.options.annotation.annotations;
		if (isArray(annotationConfigs)) {
			var annotationObjects = chartInstance.annotations = [];

			annotationConfigs.forEach(function(configuration, i) {
				configuration.label = helpers.configMerge(
					Chart.Annotation.labelDefaults,
					configuration.label
				);
				var annotation = Chart.Annotation.constructors[configuration.type];
				if (annotation) {
					annotationObjects.push(new annotation({ _index: i }));
				}
			});
		}
	},
	afterScaleUpdate: function(chartInstance) {
		// Once scales are ready, update
		var annotationObjects = chartInstance.annotations;
		var annotationConfigs = chartInstance.options.annotation;

		if (isArray(annotationObjects)) {
			annotationObjects.forEach(function(annotationObject) {
				var config = annotationConfigs.annotations[annotationObject._index];
				var updateFunction = Chart.Annotation.updateFunctions[config.type];

				if (updateFunction) {
					updateFunction(annotationObject, config, chartInstance);
				}
			});
		}
	},
	afterDraw: function(chartInstance, easingDecimal) {
		drawAnnotations(
			Chart.Annotation.drawTimeOptions.afterDraw,
			chartInstance,
			easingDecimal
		);
	},
	afterDatasetsDraw: function(chartInstance, easingDecimal) {
		drawAnnotations(
			Chart.Annotation.drawTimeOptions.afterDatasetsDraw,
			chartInstance,
			easingDecimal
		);
	},
	beforeDatasetsDraw: function(chartInstance, easingDecimal) {
		drawAnnotations(
			Chart.Annotation.drawTimeOptions.beforeDatasetsDraw,
			chartInstance,
			easingDecimal
		);
	}
};

module.exports = annotationPlugin;
Chart.pluginService.register(annotationPlugin);
