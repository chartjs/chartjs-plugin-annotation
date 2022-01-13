describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width / 2 + xAdjust, y: element.y + yAdjust};
  };
  const bottom = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width / 2 + xAdjust, y: element.y + element.height + yAdjust};
  };
  const left = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + xAdjust, y: element.y + element.height / 2 + yAdjust};
  };
  const right = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width + xAdjust, y: element.y + element.height / 2 + yAdjust};
  };

  window.testCommonEvents({
    type: 'label',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 5,
    yValue: 5,
    content: 'This is my text',
    position: 'center',
    padding: 6,
    borderWidth: 0,
    callout: {
      enabled: false,
    },
    font: {}
  }, '(located by a point, without border)');

  window.testCommonEvents({
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
    padding: 6,
    borderWidth: 0,
    callout: {
      enabled: false,
    },
    font: {}
  }, '(located by a box, without border)');

  window.testEventsOnBorder({
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
  }, top, bottom, left, right);

});
