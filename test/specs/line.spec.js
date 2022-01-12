describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  window.testCommonEvents({
    type: 'line',
    id: 'test',
    scaleID: 'y',
    value: 5
  }, '(horizontal line)');

  window.testCommonEvents({
    type: 'line',
    id: 'test',
    scaleID: 'y',
    value: 5,
    endValue: 9
  }, '(oblique horizontal line)');

  window.testCommonEvents({
    type: 'line',
    id: 'test',
    scaleID: 'x',
    value: 5
  }, '(vertical line)');

  window.testCommonEvents({
    type: 'line',
    id: 'test',
    scaleID: 'x',
    value: 5,
    endValue: 9
  }, '(oblique vertical line)');

  window.testCommonEvents({
    type: 'line',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 0,
    yMin: 2,
    xMax: 10,
    yMax: 2
  }, '(limited horizontal line)');

  window.testCommonEvents({
    type: 'line',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 0,
    yMin: 2,
    xMax: 10,
    yMax: 9
  }, '(limited oblique horizontal line)');

  // event point callbacks
  const horizontal = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width + xAdjust, y: element.y + yAdjust};
  };

  const vertical = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + xAdjust, y: element.y + element.height + yAdjust};
  };

  [2, 5, 10].forEach(function(borderWidth) {
    describe(`(horizontal line with ${borderWidth}px border)`, function() {
      const options = {
        type: 'line',
        id: 'test',
        scaleID: 'y',
        value: 5,
        borderWidth: borderWidth
      };

      // enter
      window.catchEnterEvent(options, 'top', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
      window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
      window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
      window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));

      // leave
      window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
      window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
      window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
      window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));

      // click
      window.catchClickEvent(options, 'top', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
      window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
      window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
      window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => horizontal(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    });

    describe(`(vertical line with ${borderWidth}px border)`, function() {
      const options = {
        type: 'line',
        id: 'test',
        scaleID: 'x',
        value: 5,
        borderWidth: borderWidth
      };

      // enter
      window.catchEnterEvent(options, 'left', (xScale, yScale, element) => vertical(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
      window.catchEnterEvent(options, 'right', (xScale, yScale, element) => vertical(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
      window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => vertical(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
      window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => vertical(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));

      // leave
      window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => vertical(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 1));
      window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => vertical(xScale, yScale, element, element.options.borderWidth / 2 + 1, 1));
      window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => vertical(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
      window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => vertical(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));

      // click
      window.catchClickEvent(options, 'left', (xScale, yScale, element) => vertical(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
      window.catchClickEvent(options, 'right', (xScale, yScale, element) => vertical(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
      window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => vertical(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
      window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => vertical(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));
    });
  });

});
