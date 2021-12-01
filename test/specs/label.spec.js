describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  describe('events', function() {
    const Annotation = window['chartjs-plugin-annotation'];

    it('should detect enter and click events on label', function(done) {
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

    it('should detect dbl click on label', function(done) {
      const dblClickSpy = jasmine.createSpy('dblclick');

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
              dblClickSpeed: 1000,
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
                  dblclick: dblClickSpy,
                }
              }
            }
          }
        },
      });

      const state = Annotation._getState(chart);
      const label = state.elements[0];

      let clicks = false;
      window.afterEvent(chart, 'click', function() {
        if (!clicks) {
          clicks = true;
          window.triggerMouseEvent(chart, 'click', label);
        } else {
          expect(dblClickSpy.calls.count()).toBe(1);

          done();
        }
      });

      window.triggerMouseEvent(chart, 'click', label);

    });

    it('should detect enter and click events on point', function(done) {
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
                  },
                  point: {
                    enabled: true,
                    radius: 30
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

    it('should detect dbl clik event on point', function(done) {
      const dblClickSpy = jasmine.createSpy('dblclick');

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
              dblClickSpeed: 1000,
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
                  },
                  point: {
                    enabled: true,
                    radius: 30
                  },
                  dblclick: dblClickSpy,
                }
              }
            }
          }
        },
      });

      const state = Annotation._getState(chart);
      const point = state.elements[0].point;

      let clicks = false;
      window.afterEvent(chart, 'click', function() {
        if (!clicks) {
          clicks = true;
          window.triggerMouseEvent(chart, 'click', point);
        } else {
          expect(dblClickSpy.calls.count()).toBe(1);

          done();
        }
      });

      window.triggerMouseEvent(chart, 'click', point);

    });

  });

});
