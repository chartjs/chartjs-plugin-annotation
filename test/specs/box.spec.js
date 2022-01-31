describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  describe('inRange', function() {
    const annotation = {
      type: 'box',
      xMin: 2,
      yMin: 4,
      xMax: 8,
      yMax: 6,
      borderWidth: 0,
      rotation: 0
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

  describe('scriptable options', function() {
    it('element should have dimensions when backgroundColor is resolved', function(done) {
      window.scatterChart(8, 8, {
        test: {
          type: 'box',
          xMin: 1,
          yMin: 1,
          xMax: 7,
          yMax: 4,
          backgroundColor(ctx) {
            expect(ctx.element.x).toBe(64);
            expect(ctx.element.y).toBe(256);
            expect(ctx.element.x2).toBe(448);
            expect(ctx.element.y2).toBe(448);
            expect(ctx.element.width).toBe(384);
            expect(ctx.element.height).toBe(192);
            done();
          }
        }
      });
    });
  });

  describe('interaction', function() {
    const chartConfig = {
      type: 'scatter',
      options: {
        animation: false,
        scales: {
          x: {
            display: false,
            min: 0,
            max: 10
          },
          y: {
            display: false,
            min: 0,
            max: 10
          }
        },
        plugins: {
          legend: false,
          annotation: {
            interaction: {
              intersect: true,
            },
            annotations: {
              large: {
                type: 'box',
                xMin: 2,
                xMax: 8,
                yMin: 2,
                yMax: 8,
                borderWidth: 0,
              },
              small: {
                type: 'box',
                xMin: 4.5,
                xMax: 6,
                yMin: 4.5,
                yMax: 6,
                borderWidth: 0,
              }
            }
          }
        }
      }
    };

    const chart = window.acquireChart(chartConfig);
    const state = window['chartjs-plugin-annotation']._getState(chart);
    const interactionOpts = chartConfig.options.plugins.annotation.interaction;
    const large = window.getAnnotationElements(chart)[0];
    const small = window.getAnnotationElements(chart)[1];

    const interactions = [{
      mode: 'point',
      axes: {
        xy: {
          intersect: {
            true: [1, 2, 2, 1, 0, 0],
            false: [1, 2, 2, 1, 0, 0]
          }
        },
        x: {
          intersect: {
            true: [1, 2, 2, 1, 0, 0],
            false: [1, 2, 2, 1, 0, 0]
          }
        },
        y: {
          intersect: {
            true: [1, 2, 2, 1, 0, 0],
            false: [1, 2, 2, 1, 0, 0]
          }
        }
      },
    }, {
      mode: 'nearest',
      axes: {
        xy: {
          intersect: {
            true: [1, 1, 1, 1, 0, 0],
            false: [1, 1, 1, 1, 1, 1]
          }
        },
        x: {
          intersect: {
            true: [1, 1, 1, 1, 0, 0],
            false: [1, 1, 1, 1, 0, 1]
          }
        },
        y: {
          intersect: {
            true: [1, 1, 1, 1, 0, 0],
            false: [1, 1, 1, 1, 1, 0]
          }
        }
      }
    }];

    it('should return the right amount of annotation elements', function() {
      for (const interaction of interactions) {
        const mode = interaction.mode;
        interactionOpts.mode = mode;
        for (const axis of Object.keys(interaction.axes)) {
          interactionOpts.axis = axis;
          [true, false].forEach(function(intersect) {
            interactionOpts.intersect = intersect;
            const elementsCounts = interaction.axes[axis].intersect[intersect];
            const points = [{x: large.x + 1, y: large.y + large.height / 2, what: 'enter large'},
              {x: small.x + 1, y: small.y + small.height / 2, what: 'enter small'},
              {x: small.x + small.width / 2, y: small.y + small.height / 2, what: 'click center of small'},
              {x: small.x2 + 1, y: small.y2 - small.height / 2, what: 'leave small'},
              {x: large.x2 + 1, y: large.y2 - large.height / 2, what: 'leave large'},
              {x: large.x + 1, y: large.y - 1, what: 'outside of elements'}];

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
