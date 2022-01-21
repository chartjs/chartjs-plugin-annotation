describe('Ellipse annotation', function() {
  describe('auto', jasmine.fixtures('ellipse'));

  describe('inRange', function() {
    const rotated = window.helpers.rotated;

    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const annotation = {
        type: 'ellipse',
        xMin: 3,
        yMin: 4,
        xMax: 7,
        yMax: 5,
        borderWidth: 0,
        rotation
      };

      const chart = window.scatter10x10({test: annotation});
      const element = window.getAnnotationElements(chart)[0];
      const center = element.getCenterPoint();
      const xRadius = element.width / 2;
      const yRadius = element.height / 2;

      it(`should return true when point is inside element\n{x: ${center.x}, y: ${center.y}, xRadius: ${xRadius.toFixed(1)}, yRadius: ${yRadius.toFixed(1)}}`, function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;

          for (const angle of [0, 45, 90, 135, 180, 225, 270, 315]) {
            const rad = angle / 180 * Math.PI;

            const {x, y} = rotated({
              x: center.x + Math.cos(rad) * (xRadius + halfBorder),
              y: center.y + Math.sin(rad) * (yRadius + halfBorder)
            }, center, rotation / 180 * Math.PI);

            expect(element.inRange(x, y)).withContext(`rotation: ${rotation}, angle: ${angle}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
          }
        }
      });

      it(`should return false when point is outside element\n{x: ${center.x}, y: ${center.y}, xRadius: ${xRadius.toFixed(1)}, yRadius: ${yRadius.toFixed(1)}}`, function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;

          for (const angle of [0, 45, 90, 135, 180, 225, 270, 315]) {
            const rad = angle / 180 * Math.PI;

            const {x, y} = rotated({
              x: center.x + Math.cos(rad) * (xRadius + halfBorder + 1),
              y: center.y + Math.sin(rad) * (yRadius + halfBorder + 1)
            }, center, rotation / 180 * Math.PI);

            expect(element.inRange(x, y)).withContext(`rotation: ${rotation}, angle: ${angle}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
          }
        }
      });
    }

    it('should refurn false for zero width/height ellipse', function() {
      const chart = window.scatter10x10([
        {type: 'ellipse', xMin: 1, xMax: 1, yMin: 1, yMax: 1},
        {type: 'ellipse', xMin: 2, xMax: 3, yMin: 1, yMax: 1},
        {type: 'ellipse', xMin: 1, xMax: 1, yMin: 2, yMax: 3}
      ]);
      const elements = window.getAnnotationElements(chart);
      for (const element of elements) {
        const center = element.getCenterPoint();
        expect(element.inRange(center.x, center.y)).toEqual(false);
      }
    });
  });
});
