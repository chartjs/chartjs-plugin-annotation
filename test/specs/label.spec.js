describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  // event point callbacks
  const eventIn = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 - 1;
    return {x: element.x, y: element.y - adjust};
  };
  const eventOut = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 + 1;
    return {x: element.x, y: element.y - adjust};
  };

  window.testEvents({
    type: 'label',
    id: 'test',
    xValue: 5,
    yValue: 5,
    content: 'This is my text',
    position: 'center',
    padding: 6,
    borderWidth: 18,
    callout: {
      enabled: false,
    },
    font: {}
  }, eventIn, eventOut);

});
