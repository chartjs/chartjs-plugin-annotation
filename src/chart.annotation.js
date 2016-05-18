// Get the chart variable
var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var helpers = Chart.helpers;
var isArray = helpers.isArray;

// Take the zoom namespace of Chart
Chart.Annotation = Chart.Annotation || {};

// Default options if none are provided
var defaultOptions = Chart.Annotation.defaults = {
	annotations: [] // default to no annotations
};

var lineAnnotation = require('./line.js')(Chart);
var boxAnnotation = require('./box.js')(Chart);

// Map of all types
var annotationTypes = Chart.Annotation.annotationTypes = {
	line: lineAnnotation.Constructor,
	box: boxAnnotation.Constructor
};

// Map of all update functions
var updateFunctions = Chart.Annotation.updateFunctions = {
	line: lineAnnotation.update,
	box: boxAnnotation.update
};

// Chartjs Zoom Plugin
var AnnotationPlugin = Chart.PluginBase.extend({
	beforeInit: function(chartInstance) {
		var options = chartInstance.options;
		options.annotation = helpers.configMerge(options.annotation, Chart.Annotation.defaults);

		var annotationConfigs = options.annotation.annotations;
		if (isArray(annotationConfigs)) {
			var annotationObjects = chartInstance._annotationObjects = [];

			annotationConfigs.forEach(function(configuration, i) {
				var Constructor = annotationTypes[configuration.type];
				if (Constructor) {
					annotationObjects.push(new Constructor({
						_index: i
					}));
				}
			});
		}
	},
	afterScaleUpdate: function(chartInstance) {
		// Once scales are ready, update 
		var annotationObjects = chartInstance._annotationObjects;
		var annotationOpts = chartInstance.options.annotation;

		if (isArray(annotationObjects)) {
			annotationObjects.forEach(function(annotationObject, i) {
				var opts = annotationOpts.annotations[annotationObject._index];
				var updateFunction = updateFunctions[opts.type];

				if (updateFunction) {
					updateFunction(annotationObject, opts, chartInstance);
				}
			});
		}
	},

	afterDraw: function(chartInstance, easingDecimal) {
		// If we have annotations, draw them
		var annotationObjects = chartInstance._annotationObjects;
		if (isArray(annotationObjects)) {
			var ctx = chartInstance.chart.ctx;

			annotationObjects.forEach(function(obj) {
				obj.transition(easingDecimal).draw(ctx);
			});
		}
	}
});

module.exports = AnnotationPlugin;
Chart.pluginService.register(new AnnotationPlugin());
