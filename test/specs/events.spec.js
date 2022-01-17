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
});
