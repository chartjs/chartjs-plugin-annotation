describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  for (let i = 3; i <= 10; i++) {
    window.testEvents({
      type: 'polygon',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xValue: 8,
      yValue: 8,
      sides: i,
      rotation: 45,
      radius: 50,
      borderWidth: 0,
      xAdjust: 0,
      yAdjust: 0
    });
  }

  const optionsWithBorder = {
    type: 'polygon',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 8,
    yValue: 8,
    rotation: 0,
    radius: 50,
    borderWidth: 20,
    xAdjust: 0,
    yAdjust: 0
  };

  for (let i = 3; i <= 10; i++) {
    optionsWithBorder.sides = i;
    window.testEvents(optionsWithBorder, 'top', function(xScale, yScale, element) {
      const opts = element.options;
      return {x: xScale.getPixelForValue(opts.xValue), y: yScale.getPixelForValue(opts.yValue) - opts.radius - opts.borderWidth / 2 + 1};
    });
  }

});
