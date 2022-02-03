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
            const points = [{x: outerEl.x - outerEl.width / 2, y: outerEl.y, what: 'enter outer'},
              {x: innerEl.x - innerEl.width / 2, y: innerEl.y, what: 'enter inner'},
              {x: innerEl.x, y: innerEl.y, what: 'click center of inner'},
              {x: innerEl.x + innerEl.width / 2 + 1, y: innerEl.y, what: 'leave inner'},
              {x: outerEl.x + outerEl.width / 2 + 1, y: outerEl.y, what: 'leave outer'},
              {x: outerEl.x - outerEl.width / 2 + 1, y: outerEl.y - outerEl.height / 2 - 1, what: 'outside of elements'}];

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
