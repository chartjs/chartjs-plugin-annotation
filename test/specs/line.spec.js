describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  const options = {
    type: 'line',
    id: 'test',
    scaleID: 'x',
    value: 2,
    borderWidth: 6,
    label: {
      enabled: true,
      content: 'This is my label',
      rotation: 0
    }
  };

  window.testEvents(options);

  window.testEvents(options, 'labelRect');

  const optionsLimit = {
    type: 'line',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 0,
    yMin: 2,
    xMax: 10,
    yMax: 2,
    borderWidth: 6,
    label: {
      enabled: true,
      content: 'This is my label',
      rotation: 0
    }
  };

  window.testEvents(optionsLimit);

  window.testEvents(optionsLimit, 'labelRect');

});
