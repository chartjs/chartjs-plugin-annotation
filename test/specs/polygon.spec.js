describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xValue) + xAdjust, y: yScale.getPixelForValue(opts.yValue) - opts.radius + yAdjust};
  };

  for (let i = 3; i <= 6; i++) {
    window.testCommonEvents({
      type: 'polygon',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xValue: 8,
      yValue: 8,
      sides: i,
      rotation: 45,
      radius: 50,
      borderWidth: 0
    }, `(${i} sides, located by a point)`);

    window.testCommonEvents({
      type: 'polygon',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 2,
      yMin: 2,
      xMax: 4,
      yMax: 4,
      sides: i,
      rotation: 45,
      radius: 50,
      borderWidth: 0
    }, `(${i} sides, located by a box)`);

    describe(`(${i} sides, with border)`, function() {
      window.testEventsOnBorder({
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
  }

});
