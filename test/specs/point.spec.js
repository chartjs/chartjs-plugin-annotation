describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

  describe('inRange', function() {
    const annotation1 = {
      type: 'point',
      xValue: 7,
      yValue: 7,
      radius: 30
    };
    const annotation2 = {
      type: 'point',
      xValue: 3,
      yValue: 3,
      radius: 5
    };
    const annotation3 = {
      type: 'point',
      xValue: 5,
      yValue: 5,
      radius: 0
    };

    const chart = window.scatter10x10({annotation1, annotation2, annotation3});
    const elems = window.getAnnotationElements(chart).filter(el => el.options.radius > 0);
    const elemsNoRad = window.getAnnotationElements(chart).filter(el => el.options.radius === 0);

    elems.forEach(function(element) {
      it(`should return true inside element '${element.options.id}'`, function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          const radius = element.height / 2;
          for (const angle of [0, 45, 90, 135, 180, 225, 270, 315]) {
            const rad = angle * (Math.PI / 180);
            const {x, y} = {
              x: element.x + Math.cos(rad) * (radius + halfBorder - 1),
              y: element.y + Math.sin(rad) * (radius + halfBorder - 1)
            };
            expect(element.inRange(x, y)).withContext(`angle: ${angle}, radius: ${radius}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
          }
        }
      });

      it(`should return false outside element '${element.options.id}'`, function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          const radius = element.height / 2;
          for (const angle of [0, 45, 90, 135, 180, 225, 270, 315]) {
            const rad = angle * (Math.PI / 180);
            const {x, y} = {
              x: element.x + Math.cos(rad) * (radius + halfBorder + 1),
              y: element.y + Math.sin(rad) * (radius + halfBorder + 1)
            };
            expect(element.inRange(x, y)).withContext(`angle: ${angle}, radius: ${radius}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
          }
        }
      });
    });

    elemsNoRad.forEach(function(element) {
      it(`should return false radius is 0 element '${element.options.id}'`, function() {
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
});
