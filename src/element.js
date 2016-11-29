module.exports = function(Chart) {
	var AnnotationElement = Chart.Element.extend({
		initialize: function() {
			this.hidden = false;
			this.setDataLimits();
		},
		destroy: function() {},
		setDataLimits: function() {},
		configure: function() {},
		inRange: function() {},
		getCenterPoint: function() {},
		getWidth: function() {},
		getHeight: function() {},
		getArea: function() {},
		draw: function() {}
	});

	return AnnotationElement;
};
