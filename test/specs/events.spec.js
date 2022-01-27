describe('Common', function() {

  describe('events', function() {
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
          }
        }
      }
    };
    const options = {
      type: 'box',
      id: 'test',
      xMin: 2,
      yMin: 2,
      xMax: 4,
      yMax: 4
    };
    const x0y0 = {x: 0, y: 0};
    const center = function(chart) {
      const xCenter = options.xMax - options.xMin;
      const yCenter = options.yMax - options.yMin;
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      return {x: xScale.getPixelForValue(xCenter), y: yScale.getPixelForValue(yCenter)};
    };

    const pluginOpts = chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {
      it('should not detect any move events (because no callback is set)', function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        window.triggerMouseEvent(chart, 'mousemove', center(chart));
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(0);

          window.triggerMouseEvent(chart, 'mousemove', x0y0);

          window.afterEvent(chart, 'mousemove', function() {
            expect(leaveSpy.calls.count()).toBe(0);
            done();
          });
        });
      });

      it('should not detect any events (because unmanaged event)', function(done) {
        const clickSpy = jasmine.createSpy('click');

        targetOptions.click = clickSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        window.afterEvent(chart, 'touchstart', function() {
          expect(clickSpy.calls.count()).toBe(0);
          delete targetOptions.click;
          done();
        });
        window.triggerMouseEvent(chart, 'touchstart', center(chart));
      });

      it('should not call removed hook', function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        pluginOpts.enter = enterSpy;
        pluginOpts.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        pluginOpts.enter = undefined;
        chart.update();

        window.triggerMouseEvent(chart, 'mousemove', center(chart));
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(0);

          window.triggerMouseEvent(chart, 'mousemove', x0y0);

          window.afterEvent(chart, 'mousemove', function() {
            expect(leaveSpy.calls.count()).toBe(1);
            delete pluginOpts.enter;
            delete pluginOpts.leave;
            done();
          });
        });
      });

      it('should persist properties set in context', function(done) {
        targetOptions.enter = function(ctx) {
          ctx.persistency = true;
        };
        targetOptions.leave = function(ctx) {
          expect(ctx.persistency).toBe(true);
          done();
        };
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        window.triggerMouseEvent(chart, 'mousemove', center(chart));
        window.afterEvent(chart, 'mousemove', function() {

          window.triggerMouseEvent(chart, 'mousemove', x0y0);

          window.afterEvent(chart, 'mousemove', function() {
            delete targetOptions.enter;
            delete targetOptions.leave;
          });
        });
      });

      it('should detect a click event even if 2 clicks are fired', function(done) {
        const dblClickSpy = jasmine.createSpy('dblclick');

        targetOptions.dblclick = dblClickSpy;
        pluginOpts.dblClickSpeed = 1;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = center(chart);

        let dblClick = false;
        window.afterEvent(chart, 'click', function() {
          if (!dblClick) {
            dblClick = true;
            setTimeout(() => {
              window.triggerMouseEvent(chart, 'click', eventPoint);
            }, 50);
          } else {
            expect(dblClickSpy.calls.count()).toBe(0);
            delete targetOptions.dblclick;
            delete pluginOpts.dblClickSpeed;
            done();
          }
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });
    });
  });

  describe('events on overlapped annotations', function() {
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
                xMin: 4,
                xMax: 6,
                yMin: 4,
                yMax: 6,
                borderWidth: 0,
              }
            }
          }
        }
      }
    };
    const modes = ['nearest', 'point'];
    const hookCallsCount = [[1, 1, 2, 0, 1], [1, 2, 2, 1, 2]];

    for (let i = 0; i < modes.length; i++) {
      const mode = modes[i];
      const callsCount = hookCallsCount[i];

      it(`should detect events on annotations with interaction mode ${mode}`, function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const clickSpy = jasmine.createSpy('click');
        const leaveSpy = jasmine.createSpy('leave');

        chartConfig.options.plugins.annotation.enter = enterSpy;
        chartConfig.options.plugins.annotation.click = clickSpy;
        chartConfig.options.plugins.annotation.leave = leaveSpy;
        chartConfig.options.plugins.annotation.interaction.mode = mode;

        const chart = window.acquireChart(chartConfig);
        const large = window.getAnnotationElements(chart)[0];
        const small = window.getAnnotationElements(chart)[1];

        const event1 = {x: large.x + 1, y: large.y + large.height / 2};
        const event2 = {x: small.x + 1, y: small.y + small.height / 2};
        const click = {x: small.x + small.width / 2, y: small.y + small.height / 2};
        const event3 = {x: small.x2 + 1, y: small.y2 - small.height / 2};
        const event4 = {x: large.x2 + 1, y: large.y2 - large.height / 2};

        window.triggerMouseEvent(chart, 'mousemove', event1);
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(callsCount[0]);

          window.triggerMouseEvent(chart, 'mousemove', event2);
          window.afterEvent(chart, 'mousemove', function() {
            expect(enterSpy.calls.count()).toBe(callsCount[1]);

            window.triggerMouseEvent(chart, 'click', click);
            window.afterEvent(chart, 'click', function() {
              expect(clickSpy.calls.count()).toBe(callsCount[2]);

              window.triggerMouseEvent(chart, 'mousemove', event3);
              window.afterEvent(chart, 'mousemove', function() {
                expect(leaveSpy.calls.count()).toBe(callsCount[3]);

                window.triggerMouseEvent(chart, 'mousemove', event4);
                window.afterEvent(chart, 'mousemove', function() {
                  expect(leaveSpy.calls.count()).toBe(callsCount[4]);
                  done();
                });
              });
            });
          });
        });
      });
    }
  });
});
