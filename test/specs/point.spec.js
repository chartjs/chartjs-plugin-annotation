describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

  window.testEvents({
    type: 'point',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 8,
    yValue: 8,
    radius: 30,
    borderWidth: 5,
    xAdjust: 0,
    yAdjust: 0
  });

  const optionsWithBorder = {
    type: 'point',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 5,
    yValue: 5,
    radius: 20,
    borderWidth: 5,
    xAdjust: 0,
    yAdjust: 0
  };

  window.testEventsOnBorder(optionsWithBorder, 'bottom', function(xScale, yScale, opts) {
    return {x: xScale.getPixelForValue(5) + opts.radius + opts.borderWidth / 2 - 1, y: yScale.getPixelForValue(5)};
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
                    xScaleID: 'x',
                    yScaleID: 'y',
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

  describe('events on point with radius 0', function() {

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
                radius: 0,
                borderWidth: 5,
                xAdjust: 0,
                yAdjust: 0
              }
            }
          }
        }
      },
    };

    const pointOpts = chartConfig.options.plugins.annotation.annotations.point;

    it('should not detect any enter and leave events on the point', function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');

      pointOpts.enter = enterSpy;
      pointOpts.leave = leaveSpy;

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(5), y: yScale.getPixelForValue(5)};

      window.triggerMouseEvent(chart, 'mousemove', eventPoint);
      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(0);

        window.triggerMouseEvent(chart, 'mousemove', {
          x: 0,
          y: 0
        });

        window.afterEvent(chart, 'mousemove', function() {
          expect(leaveSpy.calls.count()).toBe(0);
          delete pointOpts.enter;
          delete pointOpts.leave;
          done();
        });
      });
    });

    it('should not detect click event on the point', function(done) {
      const clickSpy = jasmine.createSpy('click');

      pointOpts.click = clickSpy;

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(5), y: yScale.getPixelForValue(5)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(0);
        delete pointOpts.click;
        done();
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });

});
