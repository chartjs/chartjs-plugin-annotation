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
                  xValue: 5,
                  yValue: 5,
                  radius: 10,
                  borderWidth: 5,
                  enter: enterSpy,
                  leave: leaveSpy
                }
              }
            }
          }
        },
      });

      const state = Annotation._getState(chart);
      const point = state.elements[0];

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
            x: point.x + 15,
            y: point.y
          });
          window.afterEvent(chart, 'mousemove', function() {
            expect(enterSpy.calls.count()).toBe(2);
            done();
          });
        });
      });

    });
  });
});
