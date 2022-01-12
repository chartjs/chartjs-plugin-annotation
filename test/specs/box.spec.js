describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

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
  });

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

  describe('(without border)', function() {
    const options = {
      type: 'box',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 2,
      yMin: 2,
      xMax: 4,
      yMax: 4,
      borderWidth: 0
    };

    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 1, 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, -1, -1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 1));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, -1));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, -1, -1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 1, 1));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, -1));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 1));

    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, -1, -1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 1, 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, -1));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 1));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 1, 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, -1, -1));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 1));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, -1));

    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 1, 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, -1, -1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 1));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, -1));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, -1, -1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 1, 1));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, -1));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 1));
  });

  describe('(with border)', function() {
    const options = {
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

    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));

    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 1));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 1));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));

    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));
  });

});
