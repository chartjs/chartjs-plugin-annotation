describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  const eventIn = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 - 1;
    return {x: element.x, y: element.y - adjust};
  };
  const eventOut = function(xScale, yScale, element) {
    const options = element.options;
    const adjust = options.borderWidth / 2 + 1;
    return {x: element.x, y: element.y - adjust};
  };

  window.testEvents({
    type: 'box',
    id: 'test',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 10
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
              box: {
                type: 'box',
                xMin: 2,
                yMin: 2,
                xMax: 4,
                yMax: 4,
                borderWidth: 10
              }
            }
          }
        }
      },
    };

    const boxOpts = chartConfig.options.plugins.annotation.annotations.box;

    it('should detect click event', function(done) {
      const clickSpy = jasmine.createSpy('click');

      boxOpts.click = function(ctx) {
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
      const eventPoint = {x: xScale.getPixelForValue(3), y: yScale.getPixelForValue(3)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(0);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete boxOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });
});
