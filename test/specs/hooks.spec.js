describe('Hooks', function() {

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

  ['box', 'ellipse', 'label', 'line', 'point', 'polygon'].forEach(function(type) {
    const options = {
      type,
      xMin: 2,
      yMin: 2,
      xMax: 8,
      yMax: 8,
      label: {
        display: true,
        content: 'test'
      }
    };

    const pluginOpts = chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`should detect hooks invocations on ${type}`, function() {
        targetOptions.beforeDraw = function({element}) {
          element.invocations = (element.invocations || 0) + 1;
          element.count = (element.count || 0) + 1;
        };
        targetOptions.afterDraw = function({element}) {
          expect(element.invocations).toBe(1);
          element.invocations--;
          expect(element.count).toBe(1);
          element.count++;
        };
        pluginOpts.annotations = [options];
        const chart = window.acquireChart(chartConfig);
        const element = window.getAnnotationElements(chart)[0];
        expect(element.invocations).toBe(0);
        expect(element.count).toBe(2);
      });
    });
  });
});
