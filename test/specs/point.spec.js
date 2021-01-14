describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

  describe('events', function() {
    const Annotation = window['chartjs-plugin-annotation'];

    it('should detect events', function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');

      const chart = window.acquireChart({
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
              annotations: {
                point: {
                  type: 'point',
                  radius: 10,
                  borderWidth: 5,
                  enter: enterSpy,
                  leave: leaveSpy
                },
                point2: {
                  type: 'point',
                  xScaleID: 'x',
                  yScaleID: 'y',
                  xValue: 8,
                  yValue: 8,
                  radius: 0,
                  borderWidth: 0,
                  enter: enterSpy
                }
              }
            }
          }
        },
      });

      const state = Annotation._getState(chart);
      const point = state.elements[0];
      const point2 = state.elements[1];

      // should be centered when there are no scales or values
      expect(point.x).toEqual(256);
      expect(point.y).toEqual(256);

      expect(enterSpy.calls.count()).toBe(0);
      expect(leaveSpy.calls.count()).toBe(0);

      window.triggerMouseEvent(chart, 'mousemove', point);

      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(1);

        window.triggerMouseEvent(chart, 'mousemove', {
          x: point.x + 16,
          y: point.y
        });

        window.afterEvent(chart, 'mousemove', function() {
          expect(leaveSpy.calls.count()).toBe(1);

          window.triggerMouseEvent(chart, 'mousemove', {
            x: point.x + 14.5,
            y: point.y
          });

          window.afterEvent(chart, 'mousemove', function() {
            expect(enterSpy.calls.count()).toBe(2);

            window.triggerMouseEvent(chart, 'mousemove', point2);

            window.afterEvent(chart, 'mousemove', function() {
              expect(leaveSpy.calls.count()).toBe(2);
              expect(enterSpy.calls.count()).toBe(2);
              done();
            });
          });
        });
      });

    });
  });
});
