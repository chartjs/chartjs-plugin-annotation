describe('Ellipse annotation', function() {
  describe('auto', jasmine.fixtures('ellipse'));

  const rotated = window.helpers.rotated;

  describe('inRange', function() {

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

      const chart = window.scatterChart(10, 10, {test: annotation});
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
      const chart = window.scatterChart(10, 10, [
        {type: 'ellipse', xMin: 1, xMax: 1, yMin: 1, yMax: 1},
        {type: 'ellipse', xMin: 2, xMax: 3, yMin: 1, yMax: 1},
        {type: 'ellipse', xMin: 1, xMax: 1, yMin: 2, yMax: 3}
      ]);
      const elements = window.getAnnotationElements(chart);
      for (const element of elements) {
        expect(element.inRange(element.clientX, element.clientY)).toEqual(false);
      }
    });
  });

  describe('interaction', function() {

    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const outer = {
        type: 'ellipse',
        xMin: 3,
        xMax: 7,
        yMin: 3,
        yMax: 7,
        borderWidth: 0,
        rotation
      };
      const inner = {
        type: 'ellipse',
        xMin: 4.5,
        xMax: 6,
        yMin: 4.5,
        yMax: 6,
        borderWidth: 0,
        rotation
      };

      const chart = window.scatterChart(10, 10, {outer, inner});
      const state = window['chartjs-plugin-annotation']._getState(chart);
      const interactionOpts = {};
      const outerEl = window.getAnnotationElements(chart)[0];
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
              const points = [{x: outerEl.x, y: outerEl.y + outerEl.height / 2, el: outerEl},
                {x: innerEl.x, y: innerEl.y + innerEl.height / 2, el: innerEl},
                {x: innerEl.x + innerEl.width / 2, y: innerEl.y + innerEl.height / 2, el: innerEl},
                {x: innerEl.x2 + 1, y: innerEl.y2 - innerEl.height / 2, el: innerEl},
                {x: outerEl.x2 + 1, y: outerEl.y2 - outerEl.height / 2, el: outerEl},
                {x: outerEl.x + 1, y: outerEl.y - 1, el: outerEl}];

              for (let i = 0; i < points.length; i++) {
                const point = points[i];
                const elementsCount = elementsCounts[i];
                const {x, y} = rotated(point, point.el.getCenterPoint(), rotation / 180 * Math.PI);
                const elements = state._getElements(state, {x, y}, interactionOpts);
                expect(elements.length).withContext(`with rotation ${rotation}, interaction mode ${mode}, axis ${axis}, intersect ${intersect}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`).toEqual(elementsCount);
              }
            });
          }
        }
      });
    }
  });
});
