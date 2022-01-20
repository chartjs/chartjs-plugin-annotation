describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

  describe('inRange', function() {
    const annotation = {
      type: 'point',
      xValue: 5,
      yValue: 5,
      radius: 30
    };

    const chart = window.scatter10x10({test: annotation});
    const element = window.getAnnotationElements(chart)[0];

    it('should return true inside element', function() {
      for (const borderWidth of [0, 10]) {
        const halfBorder = borderWidth / 2;
        element.options.borderWidth = borderWidth;
        for (const x of [element.x - element.width / 2 - halfBorder, element.x + element.width / 2 + halfBorder]) {
          expect(element.inRange(x, element.y)).toEqual(true);
        }
        for (const y of [element.y - element.height / 2 - halfBorder, element.y + element.height / 2 + halfBorder]) {
          expect(element.inRange(element.x, y)).toEqual(true);
        }
      }
    });

    it('should return false outside element', function() {
      for (const borderWidth of [0, 10]) {
        const halfBorder = borderWidth / 2;
        element.options.borderWidth = borderWidth;
        for (const x of [element.x - element.width / 2 - halfBorder - 1, element.x + element.width / 2 + halfBorder + 1]) {
          expect(element.inRange(x, element.y)).toEqual(false);
        }
        for (const y of [element.y - element.height / 2 - halfBorder - 1, element.y + element.height / 2 + halfBorder + 1]) {
          expect(element.inRange(element.x, y)).toEqual(false);
        }
      }
    });

    it('should return false element radius is 0', function() {
      element.width = 0;
      for (const borderWidth of [0, 10]) {
        const halfBorder = borderWidth / 2;
        element.options.borderWidth = borderWidth;
        for (const x of [element.x - halfBorder, element.x + halfBorder]) {
          expect(element.inRange(x, element.y)).toEqual(false);
        }
        for (const y of [element.y - halfBorder, element.y + halfBorder]) {
          expect(element.inRange(element.x, y)).toEqual(false);
        }
      }
    });
  });
});
