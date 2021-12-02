describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  describe('events', function() {
    const Annotation = window['chartjs-plugin-annotation'];

    it('should detect events', function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const clickSpy = jasmine.createSpy('click');

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
                square: {
                  type: 'polygon',
                  xScaleID: 'x',
                  yScaleID: 'y',
                  xValue: 8,
                  yValue: 8,
                  sides: 4,
                  rotation: 45,
                  radius: 50,
                  borderWidth: 0,
                  enter: enterSpy,
                  click: clickSpy
                }
              }
            }
          }
        },
      });

      const state = Annotation._getState(chart);
      const square = state.elements[0];

      window.triggerMouseEvent(chart, 'mousemove', square);

      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(1);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          done();
        });

        window.triggerMouseEvent(chart, 'click', square);

      });

    });
  });
});
