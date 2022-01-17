describe('Label of line annotation', function() {

  const eventIn = function(xScale, yScale, element) {
    const options = element.options.label;
    const adjust = options.borderWidth / 2 - 1;
    return {x: element.labelX + element.labelWidth / 2, y: element.labelY - element.labelHeight / 2 - adjust};
  };
  const eventOut = function(xScale, yScale, element) {
    const options = element.options.label;
    const adjust = options.borderWidth / 2 + 1;
    return {x: element.labelX + element.labelWidth / 2, y: element.labelY - element.labelHeight / 2 - adjust};
  };

  window.testEvents({
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
  }, eventIn, eventOut);

});
