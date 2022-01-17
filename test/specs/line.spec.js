describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  const eventIn = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 - 1;
    return {x: element.x - adjust, y: element.y};
  };
  const eventOut = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 + 1;
    return {x: element.x - adjust, y: element.y};
  };

  window.testEvents({
    type: 'line',
    id: 'test',
    scaleID: 'y',
    value: 5,
    borderWidth: 10
  }, eventIn, eventOut);

});
