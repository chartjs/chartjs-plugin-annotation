describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  const rotated = window.helpers.rotated;
  
  describe('inRange', function() {
    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const annotation = {
        type: 'label',
        id: 'test',
        xValue: 5,
        yValue: 5,
        content: 'This is my text',
        position: 'center',
        rotation
      };

      const chart = window.scatterChart(10, 10, {test: annotation});
      const element = window.getAnnotationElements(chart)[0];
      const center = element.getCenterPoint();

      it('should return true inside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          for (const x of [element.x - halfBorder, element.x + element.width / 2, element.x + element.width + halfBorder]) {
            for (const y of [element.y - halfBorder, element.y + element.height / 2, element.y + element.height + halfBorder]) {
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

          for (const x of [element.x - halfBorder - 1, element.x + element.width + halfBorder + 1]) {
            for (const y of [element.y, element.y + element.height / 2, element.y + element.height]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
          for (const x of [element.x, element.x + element.width / 2, element.x + element.width]) {
            for (const y of [element.y - halfBorder - 1, element.y + element.height + halfBorder + 1]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
        }
      });
    }
  });
});
