describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  describe('inRange', function() {
    const annotation = {
      type: 'box',
      xMin: 2,
      yMin: 4,
      xMax: 8,
      yMax: 6,
      borderWidth: 0,
      rotation: 0
    };

    const chart = window.scatter10x10({test: annotation});
    const element = window.getAnnotationElements(chart)[0];

    it('should return true inside element', function() {
      for (const borderWidth of [0, 10]) {
        const halfBorder = borderWidth / 2;
        element.options.borderWidth = borderWidth;
        for (const x of [element.x - halfBorder, element.x + element.width / 2, element.x + element.width + halfBorder]) {
          for (const y of [element.y - halfBorder, element.y + element.height / 2, element.y + element.height + halfBorder]) {
            expect(element.inRange(x, y)).toEqual(true);
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
            expect(element.inRange(x, y)).toEqual(false);
          }
        }
        for (const x of [element.x, element.x + element.width / 2, element.x + element.width]) {
          for (const y of [element.y - halfBorder - 1, element.y + element.height + halfBorder + 1]) {
            expect(element.inRange(x, y)).toEqual(false);
          }
        }
      }
    });
  });
});
