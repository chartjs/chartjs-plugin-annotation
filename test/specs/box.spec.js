describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  window.testEvents({
    type: 'box',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 0
  });

  const optionsWithBorder = {
    type: 'box',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 10
  };

  window.testEvents(optionsWithBorder, 'top', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMin), y: yScale.getPixelForValue(opts.yMin) - opts.borderWidth / 2 + 1};
  });
  window.testEvents(optionsWithBorder, 'bottom', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMax), y: yScale.getPixelForValue(opts.yMax) + opts.borderWidth / 2 - 1};
  });
  window.testEvents(optionsWithBorder, 'left', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMin) - opts.borderWidth / 2 + 1, y: yScale.getPixelForValue(opts.yMin)};
  });
  window.testEvents(optionsWithBorder, 'right', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xMax) + opts.borderWidth / 2 - 1, y: yScale.getPixelForValue(opts.yMax)};
  });

});
