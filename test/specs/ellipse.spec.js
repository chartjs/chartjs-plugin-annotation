describe('Ellipse annotation', function() {
  describe('auto', jasmine.fixtures('ellipse'));

  const options = {
    type: 'ellipse',
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
