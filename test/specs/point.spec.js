describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

  const eventIn = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 - 1;
    return {x: element.x, y: element.y - element.height / 2 - adjust};
  };
  const eventOut = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 + 1;
    return {x: element.x, y: element.y - element.height / 2 - adjust};
  };

  window.testEvents({
    type: 'point',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 5,
    yValue: 5,
    radius: 30,
    borderWidth: 12
  }, eventIn, eventOut);

  describe('events, removing borderWidth by callback, ', function() {
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
            annotations: {
              point: {
                type: 'point',
                xScaleID: 'x',
                yScaleID: 'y',
                xValue: 5,
                yValue: 5,
                radius: 20,
                borderWidth: 10
              }
            }
          }
        }
      },
    };

    const pointOpts = chartConfig.options.plugins.annotation.annotations.point;

    it('should detect click event', function(done) {
      const clickSpy = jasmine.createSpy('click');

      pointOpts.click = function(ctx) {
        if (ctx.element.options.borderWidth) {
          delete ctx.element.options.borderWidth;
          ctx.chart.draw();
        } else {
          ctx.element.options.click = clickSpy;
        }
      };

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(5), y: yScale.getPixelForValue(5)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(0);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete pointOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });

  describe('applying defaults', function() {

    it('should not throw any exception', function() {
      function createAndUpdateChart() {
        const config = {
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
                    borderWidth: 5,
                    display(context, options) {
                      if (options) {
                        context.chart.annotationRadius1 = options.radius;
                      }
                      return true;
                    },
                  },
                  point2: {
                    type: 'point',
                    xValue: 8,
                    yValue: 8,
                    borderWidth: 0,
                    display(context, options) {
                      if (options) {
                        context.chart.annotationRadius2 = options.radius;
                      }
                      return true;
                    },
                  }
                }
              }
            }
          },
        };

        var chart = acquireChart(config);
        if (isNaN(chart.annotationRadius1) || isNaN(chart.annotationRadius2)) {
          throw new Error('Defaults radius is not applied to annotaions : 1-' + chart.annotationRadius1 + ', 2-' + chart.annotationRadius2);
        }
      }
      expect(createAndUpdateChart).not.toThrow();
    });
  });

});
