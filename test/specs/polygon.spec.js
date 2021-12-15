describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  for (let i = 3; i <= 10; i++) {
    const options = {
      type: 'polygon',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xValue: 8,
      yValue: 8,
      sides: i,
      rotation: 45,
      radius: 50,
      borderWidth: 0,
      xAdjust: 0,
      yAdjust: 0
    };

    window.testEvents(options);

    window.testHooks(options);

  }
});
