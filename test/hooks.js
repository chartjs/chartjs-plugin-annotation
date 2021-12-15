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

  describe('plugin hooks', function() {
    const myPlugin = {
      id: 'myplugin'
    };
    chartConfig.plugins = [myPlugin];
    const pluginOpts = chartConfig.options.plugins.annotation;

    it(`should detect by a plugin before and after init on ${options.type}`, function(done) {
      const beforeSpy = jasmine.createSpy('beforeAnnotationInit');
      const afterSpy = jasmine.createSpy('afterAnnotationInit');

      myPlugin.beforeAnnotationInit = beforeSpy;
      myPlugin.afterAnnotationInit = afterSpy;
      pluginOpts.annotations = [options];

      window.acquireChart(chartConfig);
      expect(beforeSpy.calls.count()).toBe(1);
      expect(afterSpy.calls.count()).toBe(1);
      delete myPlugin.beforeAnnotationInit;
      delete myPlugin.afterAnnotationInit;
      done();
    });

    it(`should detect by a plugin before and after draw on ${options.type}`, function(done) {
      const beforeSpy = jasmine.createSpy('beforeAnnotationDraw');
      const afterSpy = jasmine.createSpy('afterAnnotationDraw');

      myPlugin.beforeAnnotationDraw = beforeSpy;
      myPlugin.afterAnnotationDraw = afterSpy;
      pluginOpts.annotations = [options];

      window.acquireChart(chartConfig);
      expect(beforeSpy.calls.count()).not.toBe(0);
      expect(afterSpy.calls.count()).not.toBe(0);
      delete myPlugin.beforeAnnotationDraw;
      delete myPlugin.afterAnnotationDraw;
      done();
    });

    it(`should detect by a plugin only before draw on ${options.type}`, function(done) {
      const before = () => false;
      const afterSpy = jasmine.createSpy('afterAnnotationDraw');

      myPlugin.beforeAnnotationDraw = before;
      myPlugin.afterAnnotationDraw = afterSpy;
      pluginOpts.annotations = [options];

      window.acquireChart(chartConfig);
      expect(afterSpy.calls.count()).toBe(0);
      delete myPlugin.beforeAnnotationDraw;
      delete myPlugin.afterAnnotationDraw;
      done();
    });

    if (options.label) {
      it(`should detect by a plugin before and after draw label on ${options.type}`, function(done) {
        const beforeSpy = jasmine.createSpy('beforeAnnotationLabelDraw');
        const afterSpy = jasmine.createSpy('afterAnnotationLabelDraw');

        myPlugin.beforeAnnotationLabelDraw = beforeSpy;
        myPlugin.afterAnnotationLabelDraw = afterSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(beforeSpy.calls.count()).not.toBe(0);
        expect(afterSpy.calls.count()).not.toBe(0);
        delete myPlugin.beforeAnnotationLabelDraw;
        delete myPlugin.afterAnnotationLabelDraw;
        done();
      });

      it(`should detect by a plugin only before draw on ${options.type}`, function(done) {
        const before = () => false;
        const afterSpy = jasmine.createSpy('afterAnnotationLabelDraw');

        myPlugin.beforeAnnotationLabelDraw = before;
        myPlugin.afterAnnotationLabelDraw = afterSpy;
        pluginOpts.annotations = [options];

        window.acquireChart(chartConfig);
        expect(afterSpy.calls.count()).toBe(0);
        delete myPlugin.beforeAnnotationLabelDraw;
        delete myPlugin.afterAnnotationLabelDraw;
        done();
      });

    }

  });

}
