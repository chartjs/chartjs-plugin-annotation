describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  const options = {
    type: 'label',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 5,
    yValue: 5,
    content: 'This is my text',
    position: 'center',
    borderWidth: 1,
    padding: 6,
    xAdjust: 0,
    yAdjust: -100,
    callout: {
      enabled: false,
    },
    font: {}
  };

  window.testEvents(options);

  const optionsWithBorder = {
    type: 'label',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    content: 'This is my text',
    position: 'center',
    borderWidth: 18,
    backgroundColor: 'yellow',
    padding: 6,
    callout: {
      enabled: false,
    },
    font: {}
  };

  window.testEventsOnBorder(optionsWithBorder, 'top', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: element.x, y: element.y - opts.borderWidth / 2 + 1};
  });
  window.testEventsOnBorder(optionsWithBorder, 'bottom', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: element.x, y: element.y + element.height + opts.borderWidth / 2 - 1};
  });
  window.testEventsOnBorder(optionsWithBorder, 'left', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: element.x - opts.borderWidth / 2 + 1, y: element.y};
  });
  window.testEventsOnBorder(optionsWithBorder, 'right', function(xScale, yScale, element) {
    const opts = element.options;
    return {x: element.x + element.width + opts.borderWidth / 2 - 1, y: element.y};
  });

});
