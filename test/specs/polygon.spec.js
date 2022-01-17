describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

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
    type: 'polygon',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 5,
    yValue: 5,
    rotation: 0,
    radius: 30
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
              polygon: {
                type: 'polygon',
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

    const polygonOpts = chartConfig.options.plugins.annotation.annotations.polygon;

    it('should detect click event', function(done) {
      const clickSpy = jasmine.createSpy('click');

      polygonOpts.click = function(ctx) {
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
          delete polygonOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });
});
