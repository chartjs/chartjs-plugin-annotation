describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  window.testEvents({
    type: 'box',
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
