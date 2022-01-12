describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

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
    callout: {
      enabled: false,
    },
    font: {}
  }, '(located by a point)');

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
    callout: {
      enabled: false,
    },
    font: {}
  }, '(located by a box)');

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

  describe('(without border)', function() {
    const options = {
      type: 'label',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xValue: 5,
      yValue: 5,
      content: 'This is my text',
      position: 'center',
      padding: 6,
      callout: {
        enabled: false,
      },
      font: {}
    };

    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));

    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));

    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));

  });

  describe('(with border)', function() {
    const options = {
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
    };

    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));

    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 1));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 1));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));

    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));
  });

});
