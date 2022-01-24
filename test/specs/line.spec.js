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
    const annotation3 = {
      type: 'line',
      scaleID: 'y',
      value: 2,
      endValue: 8,
      borderWidth: 10,
      label: {
        enabled: true,
        content: 'Label of the element',
        position: 'start'
      }
    };

    const chart = window.scatter10x10({annotation1, annotation2, annotation3});
    const elemsStraightLines = window.getAnnotationElements(chart).filter(el => el.options.value && !el.options.endValue);
    const elemsLabels = window.getAnnotationElements(chart).filter(el => el.options.label && el.options.label.enabled);

    elemsStraightLines.forEach(function(element) {
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

    elemsLabels.forEach(function(element) {
      it('should return true inside label of element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.label.borderWidth = borderWidth;
          for (const x of [element.labelX - element.labelWidth / 2 - halfBorder, element.labelX - element.labelWidth / 2 - halfBorder, element.labelX + element.labelWidth / 2 + halfBorder]) {
            for (const y of [element.labelY - element.labelHeight / 2 - halfBorder, element.labelY - element.labelHeight / 2 - halfBorder, element.labelY + element.labelHeight / 2 + halfBorder]) {
              expect(element.inRange(x, y)).withContext(`scaleID: ${element.options.scaleID}, value: ${element.options.value}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
            }
          }
        }
      });
      it('should return false inside label of element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.label.borderWidth = borderWidth;
          for (const x of [element.labelX - element.labelWidth / 2 - halfBorder - 1, element.labelX - element.labelWidth / 2 - halfBorder - 1, element.labelX + element.labelWidth / 2 + halfBorder - 1]) {
            for (const y of [element.labelY - element.labelHeight / 2 - halfBorder - 1, element.labelY - element.labelHeight / 2 - halfBorder - 1, element.labelY + element.labelHeight / 2 + halfBorder + 1]) {
              expect(element.inRange(x, y)).withContext(`scaleID: ${element.options.scaleID}, value: ${element.options.value}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
            }
          }
        }
      });
    });
  });
});
