describe('Ellipse annotation', function() {
  describe('auto', jasmine.fixtures('ellipse'));

  const options = {
    type: 'ellipse',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 0
  };

  window.testEvents(options);

  options.rotation = 90;

  window.testEvents(options);

  describe('events on rotated ellipse', function() {

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
              ellipse: {
                type: 'ellipse',
                xScaleID: 'x',
                yScaleID: 'y',
                xMin: 2,
                yMin: 4,
                xMax: 8,
                yMax: 6,
                rotation: 45
              }
            }
          }
        }
      },
    };

    const ellipseOpts = chartConfig.options.plugins.annotation.annotations.ellipse;

    it('should detect click event', function(done) {
      const clickSpy = jasmine.createSpy('click');

      ellipseOpts.click = clickSpy;

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(4), y: yScale.getPixelForValue(6.9)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(1);
        delete ellipseOpts.click;
        done();
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

    it('should not detect click event', function(done) {
      const clickSpy = jasmine.createSpy('click');

      ellipseOpts.click = clickSpy;

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(3), y: yScale.getPixelForValue(5)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(0);
        delete ellipseOpts.click;
        done();
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

    it('should detect click event, removing rotation by callback', function(done) {
      const clickSpy = jasmine.createSpy('click');

      ellipseOpts.click = function(ctx) {
        if (ctx.element.options.rotation) {
          delete ctx.element.options.rotation;
        } else {
          ctx.element.options.click = clickSpy;
        }
      };

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(4), y: yScale.getPixelForValue(6.9)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(0);

        const eventPoint2 = {x: xScale.getPixelForValue(5), y: yScale.getPixelForValue(5)};
        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete ellipseOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint2);
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });

  describe('events on ellipse with radius 0', function() {

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
              ellipse: {
                type: 'ellipse',
                xScaleID: 'x',
                yScaleID: 'y',
                xMin: 5,
                yMin: 5,
                xMax: 5,
                yMax: 5,
              }
            }
          }
        }
      },
    };

    const ellipseOpts = chartConfig.options.plugins.annotation.annotations.ellipse;

    it('should not detect click event', function(done) {
      const clickSpy = jasmine.createSpy('click');

      ellipseOpts.click = clickSpy;

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(5), y: yScale.getPixelForValue(5)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(0);
        delete ellipseOpts.click;
        done();
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });

  window.testHooks(options);

});
