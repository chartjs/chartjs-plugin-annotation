describe('Animation', function() {

  for (const type of ['box', 'ellipse', 'label', 'line', 'point', 'polygon']) {
    let count = 0;

    const plugin = {
      id: 'initAnim',
      afterInit() {
        count = 0;
      },
      afterDraw(chart) {
        const element = window.getAnnotationElements(chart)[0];
        const {width} = element.getProps(['width'], true);
        if (element.width === width) {
          count++;
        }
        expect(count).toBeLessThanOrEqual(1);
      }
    };

    const chartConfig = {
      type: 'scatter',
      plugins: [plugin],
      options: {
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
            common: {
            }
          }
        }
      }
    };

    const options = {
      type,
      xMin: 2,
      yMin: 4,
      xMax: 8,
      yMax: 6,
      borderWidth: 0
    };

    const pluginOpts = chartConfig.options.plugins.annotation;
    const commonOpts = pluginOpts.common;

    it(`should reach the final position once in ${type} annotation`, function() {

      [commonOpts, options].forEach(function(targetOptions) {
        targetOptions.initAnimation = true;
        pluginOpts.annotations = [options];
        window.acquireChart(chartConfig);
        delete targetOptions.initAnimation;
      });

    });
  }

});
