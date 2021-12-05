describe('Custom annotation', function() {
  describe('auto', jasmine.fixtures('custom'));

  window.testEvents({
    type: 'custom',
    id: 'test',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    draw(ctx, rect) {
      ctx.strokeStyle = 'blue';
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    }
  });

});
