export const getCenterPoint = (chart) => window.getAnnotationElements(chart)[0].getCenterPoint();
export const eventPoint0 = {
  x: 0,
  y: 0
};

export function testEvents(options) {
  describe(`events on ${options.type}`, function() {
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
      },
    };

    const pluginOpts = chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it('should detect enter and leave events', function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        targetOptions.enter = enterSpy;
        targetOptions.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);

        window.triggerMouseEvent(chart, 'mousemove', getCenterPoint(chart));
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(1);

          window.triggerMouseEvent(chart, 'mousemove', eventPoint0);

          window.afterEvent(chart, 'mousemove', function() {
            expect(leaveSpy.calls.count()).toBe(1);
            delete targetOptions.enter;
            delete targetOptions.leave;
            done();
          });
        });
      });

      it('should detect enter and leave (by mouseout) events', function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        targetOptions.enter = enterSpy;
        targetOptions.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);

        window.triggerMouseEvent(chart, 'mousemove', getCenterPoint(chart));
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(1);

          window.triggerMouseEvent(chart, 'mouseout', eventPoint0);

          window.afterEvent(chart, 'mouseout', function() {
            expect(leaveSpy.calls.count()).toBe(1);
            delete targetOptions.enter;
            delete targetOptions.leave;
            done();
          });
        });
      });

      it('should detect click event', function(done) {
        const clickSpy = jasmine.createSpy('click');

        targetOptions.click = clickSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete targetOptions.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', getCenterPoint(chart));
      });
    });
  });
}
