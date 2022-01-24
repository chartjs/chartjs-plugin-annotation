describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  describe('inRange', function() {
    const annotation1 = {
      type: 'line',
      scaleID: 'y',
      value: 2,
      borderWidth: 10,
      label: {
        enabled: true,
        content: 'Label of the element',
        position: 'start'
      }
    };
    const annotation2 = {
      type: 'line',
      scaleID: 'x',
      value: 8,
      borderWidth: 10,
      label: {
        enabled: true,
        content: 'Label of the element',
        position: 'start'
      }
    };

    const chart = window.scatter10x10({annotation1, annotation2});
    const elems = window.getAnnotationElements(chart);

    elems.forEach(function(element) {
      const center = element.getCenterPoint();
      it('should return true inside element', function() {
        const halfBorder = element.options.borderWidth / 2;
        for (const x of [center.x - halfBorder + 1, center.x, center.x + halfBorder - 1]) {
          for (const y of [center.y - halfBorder + 1, center.y, center.y + halfBorder - 1]) {
            expect(element.inRange(x, y)).withContext(`scaleID: ${element.options.scaleID}, value: ${element.options.value}, center: {x: ${center.x.toFixed(1)}, y: ${center.y.toFixed(1)}}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
          }
        }
      });

      it('should return false outside element', function() {
        const halfBorder = element.options.borderWidth / 2;
        for (const x of [center.x - halfBorder - 1, center.x + halfBorder + 1]) {
          for (const y of [center.y - halfBorder - 1, center.y + halfBorder + 1]) {
            expect(element.inRange(x, y)).withContext(`scaleID: ${element.options.scaleID}, value: ${element.options.value}, center: {x: ${center.x.toFixed(1)}, y: ${center.y.toFixed(1)}}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
          }
        }
      });
    });
  });

  describe('inRange with rotation', function() {
    const rotated = window.helpers.rotated;

    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const annotation = {
        type: 'line',
        scaleID: 'y',
        value: 5,
        label: {
          enabled: true,
          content: 'Label of the element',
          rotation
        }
      };
      const chart = window.scatter10x10({annotation});
      const element = window.getAnnotationElements(chart)[0];

      it('should return true inside label of element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.label.borderWidth = borderWidth;
          const rad = rotation / 180 * Math.PI;
          const {x, y} = rotated({
            x: element.labelX + Math.cos(rad) * (element.labelWidth / 2 + halfBorder),
            y: element.labelY + Math.sin(rad) * (element.labelHeight / 2 + halfBorder)
          }, {x: element.labelX, y: element.labelY}, rad);
          expect(element.inRange(x, y)).withContext(`rotation: ${rotation}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
        }
      });
    }
  });
});
