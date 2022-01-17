describe('Ellipse annotation', function() {
  describe('auto', jasmine.fixtures('ellipse'));

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width / 2 + xAdjust, y: element.y + yAdjust};
  };

  window.testEvents({
    type: 'ellipse',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 10
  }, top);

  describe('(with rotation)', function() {
    const options = {
      type: 'ellipse',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 2,
      yMin: 4,
      xMax: 8,
      yMax: 6,
      rotation: 45
    };
    const eventIn = function(xScale, yScale) {
      return {x: xScale.getPixelForValue(4), y: yScale.getPixelForValue(6.9)};
    };
    const eventOut = function(xScale, yScale) {
      return {x: xScale.getPixelForValue(3), y: yScale.getPixelForValue(5)};
    };
    // enter
    window.catchEnterEvent(options, 'point', eventIn);
    window.notCatchEnterEvent(options, 'point', eventOut);
    // leave
    window.catchLeaveEvent(options, 'point', eventOut);
    window.notCatchLeaveEvent(options, 'point', eventIn);
    // click
    window.catchClickEvent(options, 'point', eventIn);
    window.notCatchClickEvent(options, 'point', eventOut);
  });

  describe('events on rotated ellipse, removing rotation by callback, ', function() {
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

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete ellipseOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', {
          x: xScale.getPixelForValue(5),
          y: yScale.getPixelForValue(5)
        });
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });

});
