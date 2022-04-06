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

    const chart = window.scatterChart(10, 10, {annotation1, annotation2, annotation3});
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
              x: element.centerX + Math.cos(rad) * (radius + halfBorder - 1),
              y: element.centerY + Math.sin(rad) * (radius + halfBorder - 1)
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
              x: element.centerX + Math.cos(rad) * (radius + halfBorder + 1),
              y: element.centerY + Math.sin(rad) * (radius + halfBorder + 1)
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
          for (const x of [element.centerX - halfBorder, element.centerX + halfBorder]) {
            expect(element.inRange(x, element.centerY)).toEqual(false);
          }
          for (const y of [element.centerY - halfBorder, element.centerY + halfBorder]) {
            expect(element.inRange(element.centerY, y)).toEqual(false);
          }
        }
      });
    });
  });

  describe('interaction', function() {
    const outer = {
      type: 'point',
      xValue: 5,
      yValue: 5,
      radius: 40,
      borderWidth: 0
    };
    const inner = {
      type: 'point',
      xValue: 5,
      yValue: 5,
      radius: 20,
      borderWidth: 0
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
            const points = [{x: outerEl.x, y: outerEl.centerY},
              {x: innerEl.x, y: innerEl.centerY},
              {x: innerEl.centerX, y: innerEl.centerY},
              {x: innerEl.x2 + 1, y: innerEl.centerY},
              {x: outerEl.x2 + 1, y: outerEl.centerY},
              {x: outerEl.x + 1, y: outerEl.y - 1}];

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

});
