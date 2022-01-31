describe('Interaction', function() {

  describe('on overlapped annotations', function() {
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
    const interactions = [{
      mode: 'nearest',
      axes: {
        xy: [1, 1, 1, 0, 1]
      }
    }, {
      mode: 'point',
      axes: {
        xy: [1, 2, 2, 1, 2]
      }
    }];

    for (const interaction of interactions) {
      const mode = interaction.mode;
      for (const axis of Object.keys(interaction.axes)) {
        const callsCount = interaction.axes[axis];
        it(`should detect events on annotations with interaction mode ${mode}, axis ${axis}`, function(done) {
          const enterSpy = jasmine.createSpy('enter');
          const clickSpy = jasmine.createSpy('click');
          const leaveSpy = jasmine.createSpy('leave');

          chartConfig.options.plugins.annotation.enter = enterSpy;
          chartConfig.options.plugins.annotation.click = clickSpy;
          chartConfig.options.plugins.annotation.leave = leaveSpy;
          chartConfig.options.plugins.annotation.interaction.mode = mode;
          chartConfig.options.plugins.annotation.interaction.axis = axis;

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
    }
  });
});
