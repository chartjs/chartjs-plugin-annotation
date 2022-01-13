describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMin) + xAdjust, y: yScale.getPixelForValue(opts.yMax) + yAdjust};
  };
  const bottom = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMax) + xAdjust, y: yScale.getPixelForValue(opts.yMin) + yAdjust};
  };
  const left = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMin) + xAdjust, y: yScale.getPixelForValue(opts.yMax) + yAdjust};
  };
  const right = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMax) + xAdjust, y: yScale.getPixelForValue(opts.yMin) + yAdjust};
  };

  window.testCommonEvents({
    type: 'box',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 0
  }, '(without border)');

  window.testEventsOnBorder({
    type: 'box',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 10
  }, top, bottom, left, right);

});
