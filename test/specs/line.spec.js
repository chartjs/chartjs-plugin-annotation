describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  // event point callbacks
  const horizontal = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width + xAdjust, y: element.y + yAdjust};
  };
  const vertical = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + xAdjust, y: element.y + element.height + yAdjust};
  };

  window.testEvents({
    type: 'line',
    id: 'test',
    scaleID: 'y',
    value: 5,
    borderWidth: 10
  }, horizontal);

  window.testEvents({
    type: 'line',
    id: 'test',
    scaleID: 'x',
    value: 5,
    borderWidth: 10
  }, null, null, vertical);

});
