const SeedReporter = function(baseReporterDecorator) {
  baseReporterDecorator(this);

  this.onBrowserComplete = function(browser, result) {
    if (result.order && result.order.random && result.order.seed) {
      this.write('%s: Randomized with seed %s\n', browser, result.order.seed);
    }
  };
};

export default {
  'reporter:jasmine-seed': ['type', SeedReporter]
};
