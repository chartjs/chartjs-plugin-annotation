describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  describe('events', function() {
    const Annotation = window['chartjs-plugin-annotation'];

    it('should detect events on label', function(done) {
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
                label: {
                  type: 'label',
                  xScaleID: 'x',
                  yScaleID: 'y',
                  xValue: 5,
                  yValue: 5,
                  content: ['This is my text', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
                  position: {
                    x: 'center',
                    y: 'center'
                  },
                  borderWidth: 0,
                  enter: enterSpy,
                  click: clickSpy,
                }
              }
            }
          }
        },
      });

      const state = Annotation._getState(chart);
      const label = state.elements[0];

      window.triggerMouseEvent(chart, 'mousemove', label);

      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(1);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);

          done();
        });

        window.triggerMouseEvent(chart, 'click', label);

      });

    });

    it('should detect events on point', function(done) {
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
                label: {
                  type: 'label',
                  xScaleID: 'x',
                  yScaleID: 'y',
                  xValue: 5,
                  yValue: 5,
                  content: ['This is my text', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
                  position: {
                    x: 'center',
                    y: 'center'
                  },
                  borderWidth: 0,
                  xAdjust: 200,
                  yAdjust: -200,
                  callout: {
                    enabled: true,
                    drawPoint: true,
                    pointRadius: 30
                  },
                  enter: enterSpy,
                  click: clickSpy,
                }
              }
            }
          }
        },
      });

      const state = Annotation._getState(chart);
      const point = state.elements[0].point;

      window.triggerMouseEvent(chart, 'mousemove', point);

      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(1);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);

          done();
        });

        window.triggerMouseEvent(chart, 'click', point);

      });

    });

  });
});
