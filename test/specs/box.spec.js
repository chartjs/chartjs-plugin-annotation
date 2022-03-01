describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  describe('inRange', function() {
    const rotated = window.helpers.rotated;

    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const annotation = {
        type: 'box',
        xMin: 2,
        yMin: 4,
        xMax: 8,
        yMax: 6,
        borderWidth: 0,
        rotation
      };

      const chart = window.scatterChart(10, 10, {test: annotation});
      const element = window.getAnnotationElements(chart)[0];
      const center = element.getCenterPoint();

      it('should return true inside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          for (const x of [element.x - halfBorder, element.x + element.width / 2, element.x2 + halfBorder]) {
            for (const y of [element.y - halfBorder, element.y + element.height / 2, element.y2 + halfBorder]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(true);
            }
          }
        }
      });

      it('should return false outside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;

          for (const x of [element.x - halfBorder - 1, element.x2 + halfBorder + 1]) {
            for (const y of [element.y, element.y + element.height / 2, element.y2]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
          for (const x of [element.x, element.x + element.width / 2, element.x2]) {
            for (const y of [element.y - halfBorder - 1, element.y2 + halfBorder + 1]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
        }
      });
    }
  });

  describe('scriptable options', function() {
    it('element should have dimensions when backgroundColor is resolved', function(done) {
      window.scatterChart(8, 8, {
        test: {
          type: 'box',
          xMin: 1,
          yMin: 1,
          xMax: 7,
          yMax: 4,
          backgroundColor(ctx) {
            expect(ctx.element.x).toBe(64);
            expect(ctx.element.y).toBe(256);
            expect(ctx.element.x2).toBe(448);
            expect(ctx.element.y2).toBe(448);
            expect(ctx.element.width).toBe(384);
            expect(ctx.element.height).toBe(192);
            done();
          }
        }
      });
    });
  });
});
