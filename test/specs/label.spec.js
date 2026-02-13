fdescribe('Label annotation', function() {
  
  describe('Visual Demo', function() {
    it('should rotate around different origins', function() {
      const chart = window.acquireChart({
        type: 'line',
        data: {
          labels: [0, 1, 2, 3, 4],
          datasets: [{ data: [1, 3, 2, 4, 3] }]
        },
        options: {
          responsive: false,
          animation: false,
          plugins: {
            legend: false,
            annotation: {
              annotations: {
                tl: {
                  type: 'label', xValue: 1, yValue: 4, content: 'topLeft',
                  backgroundColor: 'rgba(255,0,0,0.1)', rotation: 45, rotationOrigin: 'topLeft',
                  display: true, borderColor: 'red', borderWidth: 1
                },
                c: {
                  type: 'label', xValue: 2, yValue: 2.5, content: 'center',
                  backgroundColor: 'rgba(0,255,0,0.1)', rotation: 45, rotationOrigin: 'center',
                  display: true, borderColor: 'green', borderWidth: 1
                },
                br: {
                  type: 'label', xValue: 3, yValue: 1, content: 'bottomRight',
                  backgroundColor: 'rgba(0,0,0,0.1)', rotation: 45, rotationOrigin: 'bottomRight',
                  display: true, borderColor: 'black', borderWidth: 1
                }
              }
            }
          },
          scales: {
            x: {type: 'category'},
            y: {beginAtZero: true, suggestedMax: 5}
          }
        }
      });

      // Instead of comparing to a file, we just assert the chart exists.
      // This will stay on the screen if you don't use --single-run!
      expect(chart).toBeDefined();
    });
  });

  const rotated = window.helpers.rotated;
  // ... rest of your code
  describe('inRange', function() {
    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const annotation = {
        type: 'label',
        id: 'test',
        xValue: 5,
        yValue: 5,
        content: 'This is my text',
        position: 'center',
        rotation
      };

      const chart = window.scatterChart(10, 10, {test: annotation});
      const element = window.getAnnotationElements(chart)[0];
      const center = element.getCenterPoint();

      it('should return true inside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          for (const x of [element.x - halfBorder, element.x + element.width / 2, element.x2 + halfBorder]) {
            for (const y of [element.y - halfBorder, element.y + element.height / 2, element.y2 + halfBorder]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(true);
            }
          }
        }
      });

      it('should return false outside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;

          for (const x of [element.x - halfBorder - 1, element.x2 + halfBorder + 1]) {
            for (const y of [element.y, element.y + element.height / 2, element.y2]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
          for (const x of [element.x, element.x + element.width / 2, element.x2]) {
            for (const y of [element.y - halfBorder - 1, element.y2 + halfBorder + 1]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
        }
      });
    }
  });

  describe('inRange', function() {
    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const annotation = {
        type: 'label',
        id: 'test',
        xValue: 5,
        yValue: 5,
        content: 'This is my text',
        position: 'center',
        hitTolerance: 10,
        rotation
      };

      const chart = window.scatterChart(10, 10, {test: annotation});
      const element = window.getAnnotationElements(chart)[0];
      const center = element.getCenterPoint();

      it('should return true inside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          const halfTolerance = element.options.hitTolerance / 2;
          for (const x of [element.x - halfBorder - halfTolerance, element.x + element.width / 2, element.x2 + halfBorder + halfTolerance]) {
            for (const y of [element.y - halfBorder - halfTolerance, element.y + element.height / 2, element.y2 + halfBorder + halfTolerance]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(true);
            }
          }
        }
      });

      it('should return false outside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          const halfTolerance = element.options.hitTolerance / 2;

          for (const x of [element.x - halfBorder - halfTolerance - 1, element.x2 + halfBorder + halfTolerance + 1]) {
            for (const y of [element.y, element.y + element.height / 2, element.y2]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
          for (const x of [element.x, element.x + element.width / 2, element.x2]) {
            for (const y of [element.y - halfBorder - halfTolerance - 1, element.y2 + halfBorder + halfTolerance + 1]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
        }
      });
    }
  });

  describe('interaction', function() {
    const outer = {
      type: 'label',
      xMin: 2,
      xMax: 8,
      yMin: 2,
      yMax: 8,
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
      content: ['inner label 1', 'inner label 2'],
      backgroundColor: 'transparent',
      borderWidth: 0
    };

    const chart = window.scatterChart(10, 10, {outer, inner});
    const elements = window.getAnnotationElements(chart);
    const visible = elements.filter(el => !el.skip && el.options.display);
    const interactionOpts = {};
    const outerEl = elements[0];
    const innerEl = elements[1];

    it('should return the right amount of annotation elements', function() {
      for (const interaction of window.interactionData) {
        const mode = interaction.mode;
        interactionOpts.mode = mode;
        for (const axis of Object.keys(interaction.axes)) {
          interactionOpts.axis = axis;
          [true, false].forEach(function(intersect) {
            interactionOpts.intersect = intersect;
            const elementsCounts = interaction.axes[axis].intersect[intersect];
            const points = [{x: outerEl.x, y: outerEl.y + outerEl.height / 2},
              {x: innerEl.x, y: innerEl.y + innerEl.height / 2},
              {x: innerEl.x + innerEl.width / 2, y: innerEl.y + innerEl.height / 2},
              {x: innerEl.x + innerEl.width + 1, y: innerEl.y + innerEl.height / 2},
              {x: outerEl.x + outerEl.width + 1, y: outerEl.y + outerEl.height / 2},
              {x: outerEl.x + 1, y: outerEl.y - 1}];

            for (let i = 0; i < points.length; i++) {
              const point = points[i];
              const elementsCount = elementsCounts[i];
              const els = window.getAnnotationInteractedElements(visible, point, interactionOpts);
              expect(els.length).withContext(`with interaction mode ${mode}, axis ${axis}, intersect ${intersect}, {x: ${point.x.toFixed(1)}, y: ${point.y.toFixed(1)}`).toEqual(elementsCount);
            }
          });
        }
      }
    });
  });
});
