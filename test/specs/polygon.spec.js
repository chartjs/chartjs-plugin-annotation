describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  const eventIn = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 - 1;
    return {x: element.x, y: element.y - element.height / 2 - adjust};
  };
  const eventOut = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 + 1;
    return {x: element.x, y: element.y - element.height / 2 - adjust};
  };

  window.testEvents({
    type: 'polygon',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 5,
    yValue: 5,
    rotation: 0,
    radius: 30,
    borderWidth: 10
  }, eventIn, eventOut);

});
