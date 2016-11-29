var Chart = require('chart.js');
Chart = typeof(Chart) === 'function' ? Chart : window.Chart;
var chartHelpers = Chart.helpers;

function isValid(num) {
	return !isNaN(num) && isFinite(num);
}

function decorate(obj, prop, func) {
	var prefix = '$';
	if (!obj[prefix + prop]) {
		obj[prefix + prop] = obj[prop].bind(obj);
		obj[prop] = function() {
			return func(obj[prefix + prop]);
		};
	}
}

function getEventHandlerName(eventName) {
	return 'on' + eventName[0].toUpperCase() + eventName.substring(1);
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

function getNearestItems(annotations, position) {
	var minDistance = Number.POSITIVE_INFINITY;

	return annotations
		.filter(function(element) {
			return element.inRange(position.x, position.y);
		})
		.reduce(function(nearestItems, element) {
			var center = element.getCenterPoint();
			var distance = chartHelpers.distanceBetweenPoints(position, center);

			if (distance < minDistance) {
				nearestItems = [element];
				minDistance = distance;
			} else if (distance === minDistance) {
				// Can have multiple items at the same distance in which case we sort by size
				nearestItems.push(element);
			}

			return nearestItems;
		}, [])
		.sort(function(a, b) {
			// If there are multiple elements equally close,
			// sort them by size, then by index
			var sizeA = a.getArea(), sizeB = b.getArea();
			return (sizeA > sizeB || sizeA < sizeB) ? sizeA - sizeB : a._index - b._index;
		})
		.slice(0, 1)[0]; // return only the top item
}

module.exports = {
	isValid: isValid,
	decorate: decorate,
	getEventHandlerName: getEventHandlerName,
	getScaleLimits: getScaleLimits,
	getNearestItems: getNearestItems
};
