describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  describe('inRange', function() {
    const annotation1 = {
      type: 'polygon',
      xValue: 1,
      yValue: 1,
      borderWidth: 0,
      sides: 3,
      radius: 30
    };
    const annotation2 = {
      type: 'polygon',
      xValue: 2,
      yValue: 2,
      borderWidth: 10,
      sides: 4,
      radius: 5
    };
    const annotation3 = {
      type: 'polygon',
      xValue: 3,
      yValue: 3,
      borderWidth: 0,
      sides: 5,
      radius: 27
    };
    const annotation4 = {
      type: 'polygon',
      xValue: 4,
      yValue: 4,
      sides: 3,
      borderWidth: 10,
      rotation: 21,
      radius: 20
    };
    const annotation5 = {
      type: 'polygon',
      xValue: 5,
      yValue: 5,
      sides: 4,
      borderWidth: 0,
      rotation: 131,
      radius: 33
    };
    const annotation6 = {
      type: 'polygon',
      xValue: 6,
      yValue: 6,
      sides: 5,
      borderWidth: 10,
      rotation: 241,
      radius: 24
    };
    const annotation7 = {
      type: 'polygon',
      xValue: 7,
      yValue: 7,
      sides: 5,
      radius: 0
    };
    const annotation8 = {
      type: 'polygon',
      xValue: 8,
      yValue: 8,
      borderWidth: 10,
      sides: 5,
      radius: 0
    };

    const chart = window.scatterChart(10, 10, {annotation1, annotation2, annotation3, annotation4, annotation5, annotation6, annotation7, annotation8});
    const elems = window.getAnnotationElements(chart).filter(el => el.options.radius > 0);
    const elemsNoRad = window.getAnnotationElements(chart).filter(el => el.options.radius === 0);

    elems.forEach(function(element) {
      const center = element.getCenterPoint();
      const rotation = element.options.rotation;
      const sides = element.options.sides;
      const borderWidth = element.options.borderWidth;
      const radius = element.height / 2;
      const angle = (2 * Math.PI) / sides;

      it(`should return true inside element '${element.options.id}'`, function() {
        const halfBorder = borderWidth / 2;
        let rad = rotation * (Math.PI / 180);
        for (let i = 0; i < sides; i++, rad += angle) {
          const sin = Math.sin(rad);
          const cos = Math.cos(rad);
          const x = center.x + sin * (radius + halfBorder - 1);
          const y = center.y - cos * (radius + halfBorder - 1);
          expect(element.inRange(x, y)).withContext(`sides: ${sides}, rotation: ${rotation}, radius: ${radius}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(true);
        }
      });

      it(`should return false outside element '${element.options.id}'`, function() {
        const halfBorder = borderWidth / 2;
        let rad = rotation * (Math.PI / 180);
        for (let i = 0; i < sides; i++, rad += angle) {
          const sin = Math.sin(rad);
          const cos = Math.cos(rad);
          const x = center.x + sin * (radius + halfBorder + 1);
          const y = center.y - cos * (radius + halfBorder + 1);
          expect(element.inRange(x, y)).withContext(`sides: ${sides}, rotation: ${rotation}, radius: ${radius}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
        }
      });
    });

    elemsNoRad.forEach(function(element) {
      it(`should return false radius is 0 element '${element.options.id}'`, function() {
        expect(element.inRange(element.centerX, element.centerY)).toEqual(false);
      });
    });
  });

  describe('interaction', function() {
    const rotated = window.helpers.rotated;

    for (const rotation of [0, 90, 180, 270]) {
      const outer = {
        type: 'polygon',
        xValue: 5,
        yValue: 5,
        radius: 50,
        sides: 4,
        borderWidth: 1,
        rotation
      };
      const inner = {
        type: 'polygon',
        xValue: 5,
        yValue: 5,
        radius: 25,
        sides: 4,
        borderWidth: 1,
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
              const points = [{x: outerEl.x, y: outerEl.centerY, el: outerEl},
                {x: innerEl.x, y: innerEl.centerY, el: innerEl},
                {x: innerEl.centerX, y: innerEl.centerY, el: innerEl},
                {x: innerEl.x2 + 1, y: innerEl.centerY, el: innerEl},
                {x: outerEl.x2 + 1, y: outerEl.centerY, el: outerEl},
                {x: outerEl.x + 1, y: outerEl.y - 1, el: outerEl}];

              for (let i = 0; i < points.length; i++) {
                const point = points[i];
                const elementsCount = elementsCounts[i];
                const {x, y} = rotated(point, point.el.getCenterPoint(), rotation / 180 * Math.PI);
                const elements = state._getElements(state, {x, y}, interactionOpts);
                expect(elements.length).withContext(`with rotation ${rotation}, interaction mode ${mode}, axis ${axis}, intersect ${intersect}, {x: ${point.x.toFixed(1)}, y: ${point.y.toFixed(1)}`).toEqual(elementsCount);
              }
            });
          }
        }
      });
    }
  });

});
