describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  for (let i = 3; i <= 10; i++) {
    window.testEvents({
      type: 'polygon',
      id: 'test',
      xValue: 8,
      yValue: 8,
      sides: i,
      rotation: 45,
      radius: 50,
      borderWidth: 0
    });
  }
});
