describe('Box annotation', function() {
  describe('auto', jasmine.fixtures('box'));

  describe('inRange', function() {
    const annotation = {
      type: 'box',
      xMin: 2,
      yMin: 4,
      xMax: 8,
      yMax: 6,
      borderWidth: 0,
      rotation: 0
    };

    const chart = window.scatter10x10({box: annotation});
    const element = window['chartjs-plugin-annotation']._getState(chart).elements[0];

    it('should return true inside element', function() {
      for (const x of [element.x, element.x + element.width / 2, element.x + element.width]) {
        for (const y of [element.y, element.y + element.height / 2, element.y + element.height]) {
          expect(element.inRange(x, y)).toEqual(true);
        }
      }
    });

    it('should return false outside element', function() {
      for (const x of [element.x - 1, element.x + element.width + 1]) {
        for (const y of [element.y, element.y + element.height / 2, element.y + element.height]) {
          expect(element.inRange(x, y)).toEqual(false);
        }
      }
      for (const x of [element.x, element.x + element.width / 2, element.x + element.width]) {
        for (const y of [element.y - 1, element.y + element.height + 1]) {
          expect(element.inRange(x, y)).toEqual(false);
        }
      }
    });
  });

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
