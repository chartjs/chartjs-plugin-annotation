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
          display: true,
          content: 'Label of the element',
          rotation
        }
      };
      const chart = window.scatterChart(10, 10, {annotation});
      const element = window.getAnnotationElements(chart)[0];
      it('should return true inside label of element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.label.options.borderWidth = borderWidth;
          const rad = rotation / 180 * Math.PI;
          for (const ax of [element.label.x - halfBorder, element.label.x2 + halfBorder]) {
            for (const ay of [element.label.y - halfBorder, element.label.y2 + halfBorder]) {
              const {x, y} = rotated({x: ax, y: ay},
                {x: element.label.centerX, y: element.label.centerY}, rad);
              expect(element.inRange(x, y)).withContext(`rotation: ${rotation}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
            }
          }
        }
      });

      it('should return false outside label of element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.label.options.borderWidth = borderWidth;
          const rad = rotation / 180 * Math.PI;
          for (const ax of [element.label.x - halfBorder - 1, element.label.x2 + halfBorder + 1]) {
            for (const ay of [element.label.y - halfBorder - 1, element.label.y2 + halfBorder + 1]) {
              const {x, y} = rotated({x: ax, y: ay},
                {x: element.label.centerX, y: element.label.centerY}, rad);
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
            const points = [{x: outCenter.x - outHBordeWidth, y: outCenter.y},
              {x: inCenter.x - inHBordeWidth, y: inCenter.y},
              {x: inCenter.x, y: inCenter.y},
              {x: inCenter.x + inHBordeWidth + 1, y: inCenter.y},
              {x: outCenter.x + outHBordeWidth + 1, y: outCenter.y},
              {x: outCenter.x - outHBordeWidth + 1, y: outCenter.y - outerEl.height / 2 - outHBordeWidth - 1}];

            for (let i = 0; i < points.length; i++) {
              const point = points[i];
              const elementsCount = elementsCounts[i];
              const elements = state._getElements(state, point, interactionOpts);
              expect(elements.length).withContext(`with interaction mode ${mode}, axis ${axis}, intersect ${intersect}, {x: ${point.x.toFixed(1)}, y: ${point.y.toFixed(1)}`).toEqual(elementsCount);
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
        display: true,
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
        display: true,
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
            const points = [{x: outerEl.label.x, y: outerEl.label.y},
              {x: innerEl.label.x, y: innerEl.label.y},
              {x: innerEl.label.centerX, y: innerEl.label.centerY},
              {x: innerEl.label.x2 + 1, y: innerEl.label.y},
              {x: outerEl.label.x2 + 1, y: outerEl.label.y},
              {x: outerEl.label.x + 1, y: outCenter.y - outerEl.height / 2 - 1}];

            for (let i = 0; i < points.length; i++) {
              const point = points[i];
              const elementsCount = elementsCounts[i];
              const elements = state._getElements(state, point, interactionOpts);
              expect(elements.length).withContext(`with interaction mode ${mode}, axis ${axis}, intersect ${intersect}, {x: ${point.x.toFixed(1)}, y: ${point.y.toFixed(1)}`).toEqual(elementsCount);
            }
          });
        }
      }
    });
  });

  describe('curve inRange', function() {
    const rotated = window.helpers.rotated;
    const getQuadraticXY = window.getQuadraticXY;
    const getQuadraticAngle = window.getQuadraticAngle;

    const annotation1 = {
      type: 'line',
      scaleID: 'y',
      value: 2,
      curve: true,
      borderWidth: 10
    };
    const annotation2 = {
      type: 'line',
      scaleID: 'x',
      value: 8,
      curve: true,
      borderWidth: 5
    };
    const annotation3 = {
      type: 'line',
      scaleID: 'x',
      value: 8,
      curve: true,
      borderWidth: 1
    };
    const annotation4 = {
      type: 'line',
      scaleID: 'x',
      value: 8,
      curve: true,
      borderWidth: 0.5
    };

    const chart = window.scatterChart(10, 10, {annotation1, annotation2, annotation3, annotation4});
    const elems = window.getAnnotationElements(chart);
    const EPSILON = 0.05;

    elems.forEach(function(element) {
      const cp = element.cp;
      it('should return true inside element', function() {
        const halfBorder = element.options.borderWidth / 2;
        for (let t = 0.1; t <= 0.9; t += 0.1) {
          const point = getQuadraticXY(t, element.x, element.y, cp.x, cp.y, element.x2, element.y2);
          const angle = getQuadraticAngle(t, element.x, element.y, cp.x, cp.y, element.x2, element.y2);
          for (const bw of [-halfBorder + EPSILON, halfBorder - EPSILON]) {
            const x = point.x + bw;
            const y = point.y + bw;
            const rotP = rotated({x, y}, point, angle);
            expect(element.inRange(rotP.x, rotP.y)).withContext(`scaleID: ${element.options.scaleID}, value: ${element.options.value}, tension: ${t}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
          }
        }
      });

      it('should return false outside element', function() {
        const halfBorder = element.options.borderWidth / 2 + 1;
        for (let t = 0.1; t <= 0.9; t += 0.1) {
          const point = getQuadraticXY(t, element.x, element.y, cp.x, cp.y, element.x2, element.y2);
          const angle = getQuadraticAngle(t, element.x, element.y, cp.x, cp.y, element.x2, element.y2);
          for (const bw of [-halfBorder + EPSILON, halfBorder - EPSILON]) {
            const x = point.x + bw;
            const y = point.y + bw;
            const rotP = rotated({x, y}, point, angle);
            expect(element.inRange(rotP.x, rotP.y)).withContext(`scaleID: ${element.options.scaleID}, value: ${element.options.value}, halfBorderWidth: ${bw}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
          }
        }
      });

    });
  });

});
