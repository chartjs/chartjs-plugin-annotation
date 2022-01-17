describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  // event point callbacks
  const left = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + xAdjust, y: element.y + element.height / 2 + yAdjust};
  };

  window.testEvents({
    type: 'label',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
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
  }, null, null, left);

});
