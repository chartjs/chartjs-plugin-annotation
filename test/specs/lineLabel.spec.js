describe('Label of line annotation', function() {

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.labelX + xAdjust, y: element.labelY - element.labelHeight / 2 + yAdjust};
  };
  const bottom = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.labelX + xAdjust, y: element.labelY + element.labelHeight / 2 + yAdjust};
  };
  const left = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.labelX - element.labelWidth / 2 + xAdjust, y: element.labelY + yAdjust};
  };
  const right = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.labelX + element.labelWidth / 2 + xAdjust, y: element.labelY + yAdjust};
  };

  const opts = {
    type: 'line',
    id: 'test',
    scaleID: 'x',
    value: 5,
    borderWidth: 0,
    label: {
      enabled: true,
      content: ['This is the first row', 'This is the second row'],
      borderWidth: 10,
      rotation: 0
    }
  };
  window.testEventsOnBorder(opts, top, bottom, left, right, opts.label.borderWidth);

  describe('(with rotation)', function() {
    const options = {
      type: 'line',
      id: 'test',
      scaleID: 'x',
      value: 5,
      borderWidth: 0,
      label: {
        enabled: true,
        content: ['This is the first row', 'This is the second row'],
        borderWidth: 0,
        rotation: 90
      }
    };
    const adjust = (element) => element.labelWidth / 2 - element.labelHeight / 2;
    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -adjust(element) + 1));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -adjust(element) - 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, adjust(element) - 1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, adjust(element) + 1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, adjust(element) + 1, 0));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, adjust(element) - 1, 0));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -adjust(element) - 1, 0));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -adjust(element) + 1, 0));
    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -adjust(element) - 1));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -adjust(element) + 1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, adjust(element) + 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, adjust(element) - 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, adjust(element) - 1, 0));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, adjust(element) + 1, 0));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -adjust(element) + 1, 0));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -adjust(element) - 1, 0));
    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -adjust(element) + 1));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -adjust(element) - 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, adjust(element) - 1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, adjust(element) + 1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, adjust(element) + 1, 0));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, adjust(element) - 1, 0));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -adjust(element) - 1, 0));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -adjust(element) + 1, 0));
  });

});
