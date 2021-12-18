describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  const options = {
    type: 'box',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 0
  };

  window.testEvents(options);

  window.testHooks(options);

});
