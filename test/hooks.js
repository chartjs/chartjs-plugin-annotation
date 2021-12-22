export function testHooks(options) {
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

  describe('hooks', function() {
    const pluginOpts = chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`should call before and after draw on ${options.type}`, function(done) {
        const beforeSpy = jasmine.createSpy('beforeDraw');
        const afterSpy = jasmine.createSpy('afterDraw');

        targetOptions.beforeDraw = beforeSpy;
        targetOptions.afterDraw = afterSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(beforeSpy.calls.count()).not.toBe(0);
        expect(afterSpy.calls.count()).not.toBe(0);
        delete targetOptions.beforeDraw;
        delete targetOptions.afterDraw;
        done();
      });

      it(`should call only before draw, avoiding drawing, on ${options.type}`, function(done) {
        const before = () => false;
        const afterSpy = jasmine.createSpy('afterDraw');

        targetOptions.beforeDraw = before;
        targetOptions.afterDraw = afterSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(afterSpy.calls.count()).toBe(0);
        delete targetOptions.beforeDraw;
        delete targetOptions.afterDraw;
        done();
      });

      it(`should call before draw on ${options.type}`, function(done) {
        const beforeSpy = jasmine.createSpy('beforeDraw');

        targetOptions.beforeDraw = beforeSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(beforeSpy.calls.count()).toBe(1);
        delete targetOptions.beforeDraw;
        done();
      });

      it(`should call after draw on ${options.type}`, function(done) {
        const afterSpy = jasmine.createSpy('afterDraw');

        targetOptions.afterDraw = afterSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(afterSpy.calls.count()).toBe(1);
        delete targetOptions.afterDraw;
        done();
      });

    });
  });
}
