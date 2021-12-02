describe('Ellipse annotation', function() {
  describe('auto', jasmine.fixtures('ellipse'));

  window.testEvents({
    type: 'ellispe',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 0
  });

});
