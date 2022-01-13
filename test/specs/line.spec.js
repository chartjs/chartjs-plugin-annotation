describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  // event point callbacks
  const horizontal = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width + xAdjust, y: element.y + yAdjust};
  };
  const vertical = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + xAdjust, y: element.y + element.height + yAdjust};
  };

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

  [2, 5, 10].forEach(function(borderWidth) {
    describe(`(horizontal line with ${borderWidth}px border)`, function() {
      window.testEventsOnBorder({
        type: 'line',
        id: 'test',
        scaleID: 'y',
        value: 5,
        borderWidth: borderWidth
      }, horizontal, horizontal);
    });

    describe(`(vertical line with ${borderWidth}px border)`, function() {
      window.testEventsOnBorder({
        type: 'line',
        id: 'test',
        scaleID: 'x',
        value: 5,
        borderWidth: borderWidth
      }, null, null, vertical, vertical);
    });
  });

});
