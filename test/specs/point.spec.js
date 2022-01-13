describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xValue) + xAdjust, y: yScale.getPixelForValue(opts.yValue) - opts.radius + yAdjust};
  };
  const bottom = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xValue) + xAdjust, y: yScale.getPixelForValue(opts.yValue) + opts.radius + yAdjust};
  };
  const left = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xValue) - opts.radius + xAdjust, y: yScale.getPixelForValue(opts.yValue) + yAdjust};
  };
  const right = function(xScale, yScale, element, xAdjust, yAdjust) {
    const opts = element.options;
    return {x: xScale.getPixelForValue(opts.xValue) + opts.radius + xAdjust, y: yScale.getPixelForValue(opts.yValue) + yAdjust};
  };

  window.testCommonEvents({
    type: 'point',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 8,
    yValue: 8,
    radius: 30,
  }, '(located by a point, without border)');

  window.testCommonEvents({
    type: 'point',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    radius: 30,
  }, '(located by a box, without border)');

  window.testEventsOnBorder({
    type: 'point',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 8,
    yValue: 8,
    radius: 30,
    borderWidth: 12
  }, top, bottom, left, right);

  describe('(with radius 0)', function() {
    const options = {
      type: 'point',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xValue: 5,
      yValue: 5,
      radius: 0,
      borderWidth: 12
    };
    const center = function(xScale, yScale, element) {
      const opts = element.options;
      return {x: xScale.getPixelForValue(opts.xValue), y: yScale.getPixelForValue(opts.yValue)};
    };
    window.notCatchEnterEvent(options, 'center', center);
    window.notCatchClickEvent(options, 'center', center);
  });

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
          ctx.element.debug = true;
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

});
