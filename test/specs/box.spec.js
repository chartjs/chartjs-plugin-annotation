describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x, y: element.y + yAdjust};
  };

  window.testEvents({
    type: 'box',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 10
  }, top);

});
