describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

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
    type: 'point',
    id: 'test',
    xValue: 5,
    yValue: 5,
    radius: 30,
    borderWidth: 12
  }, eventIn, eventOut);
});
