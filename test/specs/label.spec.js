describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  describe('inRange', function() {
    const annotation = {
      type: 'label',
      id: 'test',
      xValue: 5,
      yValue: 5,
      content: 'This is my text',
      position: 'center',
    };

    const chart = window.scatterChart(10, 10, {test: annotation});
    const element = window.getAnnotationElements(chart)[0];

    it('should return true inside element', function() {
      for (const borderWidth of [0, 10]) {
        const halfBorder = borderWidth / 2;
        element.options.borderWidth = borderWidth;
        for (const x of [element.x - halfBorder, element.x + element.width / 2, element.x + element.width + halfBorder]) {
          for (const y of [element.y - halfBorder, element.y + element.height / 2, element.y + element.height + halfBorder]) {
            expect(element.inRange(x, y)).toEqual(true);
          }
        }
      }
    });

    it('should return false outside element', function() {
      for (const borderWidth of [0, 10]) {
        const halfBorder = borderWidth / 2;
        element.options.borderWidth = borderWidth;

        for (const x of [element.x - halfBorder - 1, element.x + element.width + halfBorder + 1]) {
          for (const y of [element.y, element.y + element.height / 2, element.y + element.height]) {
            expect(element.inRange(x, y)).toEqual(false);
          }
        }
        for (const x of [element.x, element.x + element.width / 2, element.x + element.width]) {
          for (const y of [element.y - halfBorder - 1, element.y + element.height + halfBorder + 1]) {
            expect(element.inRange(x, y)).toEqual(false);
          }
        }
      }
    });
  });

  describe('interaction', function() {
    const outer = {
      type: 'label',
      xMin: 3,
      xMax: 7,
      yMin: 3,
      yMax: 7,
      content: ['outer label row 1', 'outer label row 2', 'outer label row 3'],
      backgroundColor: 'transparent',
      borderWidth: 0
    };
    const inner = {
      type: 'label',
      xMin: 4,
      xMax: 6,
      yMin: 4,
      yMax: 6,
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
          [true].forEach(function(intersect) {
            interactionOpts.intersect = intersect;
            const elementsCounts = interaction.axes[axis].intersect[intersect];
            const points = [{x: outerEl.x, y: outerEl.y + outerEl.height / 2, what: 'enter outer'},
              {x: innerEl.x, y: innerEl.y + innerEl.height / 2, what: 'enter inner'},
              {x: innerEl.x + innerEl.width / 2, y: innerEl.y + innerEl.height / 2, what: 'click center of inner'},
              {x: innerEl.x + innerEl.width + 1, y: innerEl.y + innerEl.height / 2, what: 'leave inner'},
              {x: outerEl.x + outerEl.width + 1, y: outerEl.y + outerEl.height / 2, what: 'leave outer'},
              {x: outerEl.x + 1, y: outerEl.y - 1, what: 'outside of elements'}];

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
