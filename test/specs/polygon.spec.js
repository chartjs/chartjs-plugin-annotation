describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xValue) + xAdjust, y: yScale.getPixelForValue(opts.yValue) - opts.radius + yAdjust};
  };

  describe('(triangle)', function() {
    window.testEvents({
      type: 'point',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xValue: 8,
      yValue: 8,
      rotation: 0,
      radius: 30,
      borderWidth: 20
    }, top);
  });
});
