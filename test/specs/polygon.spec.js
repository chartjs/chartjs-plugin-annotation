describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  for (let i = 3; i <= 10; i++) {
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

    // event point callbacks
    const top = function(xScale, yScale, element, xAdjust, yAdjust) {
      const opts = element.options;
      return {x: xScale.getPixelForValue(opts.xValue) + xAdjust, y: yScale.getPixelForValue(opts.yValue) - opts.radius + yAdjust};
    };

    describe(`(${i} sides, without border)`, function() {
      const options = {
        type: 'point',
        id: 'test',
        xScaleID: 'x',
        yScaleID: 'y',
        xValue: 8,
        yValue: 8,
        rotation: 0,
        radius: 30
      };

      // enter
      window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
      window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));

      // leave
      window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
      window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));

      // click
      window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
      window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));

    });

    describe(`(${i} sides, with border)`, function() {
      const options = {
        type: 'point',
        id: 'test',
        xScaleID: 'x',
        yScaleID: 'y',
        xValue: 8,
        yValue: 8,
        rotation: 0,
        radius: 30,
        borderWidth: 20
      };

      // enter
      window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
      window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));

      // leave
      window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
      window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));

      // click
      window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
      window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));

    });
  }

});
