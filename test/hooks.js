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

    it(`should detect before and after init on ${options.type}`, function(done) {
      const beforeSpy = jasmine.createSpy('beforeInit');
      const afterSpy = jasmine.createSpy('afterInit');

      options.beforeInit = beforeSpy;
      options.afterInit = afterSpy;
      pluginOpts.annotations = [options];

      window.acquireChart(chartConfig);
      expect(beforeSpy.calls.count()).toBe(1);
      expect(afterSpy.calls.count()).toBe(1);
      delete options.beforeInit;
      delete options.afterInit;
      done();
    });

    it(`should detect before and after draw on ${options.type}`, function(done) {
      const beforeSpy = jasmine.createSpy('beforeDraw');
      const afterSpy = jasmine.createSpy('afterDraw');

      options.beforeDraw = beforeSpy;
      options.afterDraw = afterSpy;
      pluginOpts.annotations = [options];

      window.acquireChart(chartConfig);
      expect(beforeSpy.calls.count()).not.toBe(0);
      expect(afterSpy.calls.count()).not.toBe(0);
      delete options.beforeDraw;
      delete options.afterDraw;
      done();
    });

    it(`should detect only before draw on ${options.type}`, function(done) {
      const before = () => false;
      const afterSpy = jasmine.createSpy('afterDraw');

      options.beforeDraw = before;
      options.afterDraw = afterSpy;
      pluginOpts.annotations = [options];

      window.acquireChart(chartConfig);
      expect(afterSpy.calls.count()).toBe(0);
      delete options.beforeDraw;
      delete options.afterDraw;
      done();
    });

    if (options.label) {
      it(`should detect before and after draw label on ${options.type}`, function(done) {
        const beforeSpy = jasmine.createSpy('beforeDrawLabel');
        const afterSpy = jasmine.createSpy('afterDrawLabel');

        options.beforeDrawLabel = beforeSpy;
        options.afterDrawLabel = afterSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(beforeSpy.calls.count()).not.toBe(0);
        expect(afterSpy.calls.count()).not.toBe(0);
        delete options.beforeDrawLabel;
        delete options.afterDrawLabel;
        done();
      });

      it(`should detect only before draw on ${options.type}`, function(done) {
        const before = () => false;
        const afterSpy = jasmine.createSpy('afterDrawLabel');

        options.beforeDrawLabel = before;
        options.afterDrawLabel = afterSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(afterSpy.calls.count()).toBe(0);
        delete options.beforeDrawLabel;
        delete options.afterDrawLabel;
        done();
      });
    }
  });
}
