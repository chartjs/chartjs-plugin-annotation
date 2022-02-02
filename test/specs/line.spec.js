describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  describe('inRange', function() {
    const annotation1 = {
      type: 'line',
      scaleID: 'y',
      value: 2,
      borderWidth: 10
    };
    const annotation2 = {
      type: 'line',
      scaleID: 'x',
      value: 8,
      borderWidth: 5
    };
    const annotation3 = {
      type: 'line',
      scaleID: 'x',
      value: 8,
      borderWidth: 1
    };
    const annotation4 = {
      type: 'line',
      scaleID: 'x',
      value: 8,
      borderWidth: 0.5
    };

    const chart = window.scatterChart(10, 10, {annotation1, annotation2, annotation3, annotation4});
    const elems = window.getAnnotationElements(chart);

    elems.forEach(function(element) {
      const center = element.getCenterPoint();
      it('should return true inside element', function() {
        const halfBorder = element.options.borderWidth / 2;
        for (const x of [center.x - halfBorder, center.x, center.x + halfBorder]) {
          for (const y of [center.y - halfBorder, center.y, center.y + halfBorder]) {
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
      const chart = window.scatterChart(10, 10, {annotation});
      const element = window.getAnnotationElements(chart)[0];
      it('should return true inside label of element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.label.borderWidth = borderWidth;
          const rad = rotation / 180 * Math.PI;
          for (const ax of [element.labelX - element.labelWidth / 2 - halfBorder, element.labelX + element.labelWidth / 2 + halfBorder]) {
            for (const ay of [element.labelY - element.labelHeight / 2 - halfBorder, element.labelY + element.labelHeight / 2 + halfBorder]) {
              const {x, y} = rotated({x: ax, y: ay},
                {x: element.labelX, y: element.labelY}, rad);
              expect(element.inRange(x, y)).withContext(`rotation: ${rotation}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
            }
          }
        }
      });

      it('should return false outside label of element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.label.borderWidth = borderWidth;
          const rad = rotation / 180 * Math.PI;
          for (const ax of [element.labelX - element.labelWidth / 2 - halfBorder - 1, element.labelX + element.labelWidth / 2 + halfBorder + 1]) {
            for (const ay of [element.labelY - element.labelHeight / 2 - halfBorder - 1, element.labelY + element.labelHeight / 2 + halfBorder + 1]) {
              const {x, y} = rotated({x: ax, y: ay},
                {x: element.labelX, y: element.labelY}, rad);
              expect(element.inRange(x, y)).withContext(`rotation: ${rotation}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
            }
          }
        }
      });
    }
  });

  describe('interaction', function() {
    const outer = {
      type: 'line',
      xMin: 5,
      xMax: 5,
      yMin: 2,
      yMax: 8,
      borderWidth: 20
    };
    const inner = {
      type: 'line',
      xMin: 5,
      xMax: 5,
      yMin: 2,
      yMax: 8,
      borderWidth: 8
    };

    const chart = window.scatterChart(10, 10, {outer, inner});
    const state = window['chartjs-plugin-annotation']._getState(chart);
    const interactionOpts = {};
    const outerEl = window.getAnnotationElements(chart)[0];
    const outCenter = outerEl.getCenterPoint();
    const outHBordeWidth = outerEl.options.borderWidth / 2;
    const innerEl = window.getAnnotationElements(chart)[1];
    const inCenter = outerEl.getCenterPoint();
    const inHBordeWidth = innerEl.options.borderWidth / 2;

    it('should return the right amount of annotation elements', function() {
      for (const interaction of window.interactionData) {
        const mode = interaction.mode;
        interactionOpts.mode = mode;
        for (const axis of Object.keys(interaction.axes)) {
          interactionOpts.axis = axis;
          [true, false].forEach(function(intersect) {
            interactionOpts.intersect = intersect;
            const elementsCounts = interaction.axes[axis].intersect[intersect];
            const points = [{x: outCenter.x - outHBordeWidth, y: outCenter.y, what: 'enter outer'},
              {x: inCenter.x - inHBordeWidth, y: inCenter.y, what: 'enter inner'},
              {x: inCenter.x, y: inCenter.y, what: 'click center of inner'},
              {x: inCenter.x + inHBordeWidth + 1, y: inCenter.y, what: 'leave inner'},
              {x: outCenter.x + outHBordeWidth + 1, y: outCenter.y, what: 'leave outer'},
              {x: outCenter.x - outHBordeWidth + 1, y: outCenter.y - outerEl.height / 2 - outHBordeWidth - 1, what: 'outside of elements'}];

            for (let i = 0; i < points.length; i++) {
              const point = points[i];
              const elementsCount = elementsCounts[i];
              const elements = state._getElements(state, point, interactionOpts);
              expect(elements.length).withContext(`with interaction mode: ${mode}, axis ${axis}, intersect ${intersect}, ${point.what}`).toEqual(elementsCount);
            }
          });
        }
      }
    });
  });

  describe('with label interaction', function() {
    const outer = {
      type: 'line',
      xMin: 5,
      xMax: 5,
      yMin: 2,
      yMax: 8,
      borderWidth: 0,
      label: {
        enabled: true,
        content: ['outer label row 1', 'outer label row 2', 'outer label row 3'],
        borderWidth: 0
      }
    };
    const inner = {
      type: 'line',
      xMin: 5,
      xMax: 5,
      yMin: 2,
      yMax: 8,
      borderWidth: 0,
      label: {
        enabled: true,
        content: ['inner label 1', 'inner label 2'],
        borderWidth: 0
      }
    };

    const chart = window.scatterChart(10, 10, {outer, inner});
    const state = window['chartjs-plugin-annotation']._getState(chart);
    const interactionOpts = {};
    const outerEl = window.getAnnotationElements(chart)[0];
    const outCenter = outerEl.getCenterPoint();
    const innerEl = window.getAnnotationElements(chart)[1];

    it('should return the right amount of annotation elements', function() {
      for (const interaction of window.interactionData) {
        const mode = interaction.mode;
        interactionOpts.mode = mode;
        for (const axis of Object.keys(interaction.axes)) {
          interactionOpts.axis = axis;
          [true, false].forEach(function(intersect) {
            interactionOpts.intersect = intersect;
            const elementsCounts = interaction.axes[axis].intersect[intersect];
            const points = [{x: outerEl.labelX - outerEl.labelWidth / 2, y: outerEl.labelY, what: 'enter outer'},
              {x: innerEl.labelX - innerEl.labelWidth / 2, y: innerEl.labelY, what: 'enter inner'},
              {x: innerEl.labelX, y: innerEl.labelY, what: 'click center of inner'},
              {x: innerEl.labelX + innerEl.labelWidth / 2 + 1, y: innerEl.labelY, what: 'leave inner'},
              {x: outerEl.labelX + outerEl.labelWidth / 2 + 1, y: outerEl.labelY, what: 'leave outer'},
              {x: outerEl.labelX - outerEl.labelWidth / 2 + 1, y: outCenter.y - outerEl.height / 2 - 1, what: 'outside of elements'}];

            for (let i = 0; i < points.length; i++) {
              const point = points[i];
              const elementsCount = elementsCounts[i];
              const elements = state._getElements(state, point, interactionOpts);
              expect(elements.length).withContext(`with interaction mode: ${mode}, axis ${axis}, intersect ${intersect}, ${point.what}`).toEqual(elementsCount);
            }
          });
        }
      }
    });
  });

});
