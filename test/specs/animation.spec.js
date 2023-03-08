describe('Initial animation', function() {

  const types = {
    box: 'x',
    ellipse: 'width',
    label: 'x',
    line: 'x2',
    point: 'radius',
    polygon: 'y'
  };

  for (const type of Object.keys(types)) {

    it(`should reach the final position once in ${type} annotation`, function(done) {

      const chartConfig = {
        type: 'scatter',
        options: {
          animation: {
            duration: 500
          },
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
        xMin: 4,
        yMin: 4,
        xMax: 6,
        yMax: 6,
        radius: 40,
        borderWidth: 0
      };

      const pluginOpts = chartConfig.options.plugins.annotation;
      const commonOpts = pluginOpts.common;
      const property = types[type];
      let cycles = 0;

      chartConfig.plugins = [{
        id: 'initAnimEnabled',
        afterInit(chart) {
          chart.annotationCount = 0;
        },
        afterDraw(chart) {
          let element = window.getAnnotationElements(chart)[0];
          chart.init = element.options.init;
          if (type === 'polygon') {
            element = element.elements[0];
          }
          const opts = element.getProps([property], true);
          const valueFinal = opts[property];
          const value = element[property];
          if (value === valueFinal) {
            chart.annotationCount++;
          }
        },
        afterRender(chart) {
          cycles++;
          if (cycles === 2) {
            expect(chart.annotationCount <= 1 && chart.init).withContext(`with count ${chart.annotationCount}, init ${chart.init}`).toEqual(true);
            done();
          }
        }
      }];

      [commonOpts, options].forEach(function(targetOptions) {
        delete commonOpts.init;
        delete options.init;
        targetOptions.init = true;
        pluginOpts.annotations = [options];
        window.acquireChart(chartConfig);
      });

    });

    it(`should not update the position in ${type} annotation`, function(done) {

      const chartConfig = {
        type: 'scatter',
        options: {
          animation: {
            duration: 500
          },
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
        xMin: 4,
        yMin: 4,
        xMax: 6,
        yMax: 6,
        radius: 40,
        borderWidth: 0
      };

      const pluginOpts = chartConfig.options.plugins.annotation;
      const commonOpts = pluginOpts.common;
      const property = types[type];
      let cycles = 0;

      chartConfig.plugins = [{
        id: 'initAnimDisabled',
        afterInit(chart) {
          chart.annotationCount = 0;
        },
        afterDraw(chart) {
          let element = window.getAnnotationElements(chart)[0];
          chart.init = element.options.init;
          if (type === 'polygon') {
            element = element.elements[0];
          }
          const opts = element.getProps([property], true);
          const valueFinal = opts[property];
          const value = element[property];
          if (value !== valueFinal) {
            chart.annotationCount++;
          }
        },
        afterRender(chart) {
          expect(chart.annotationCount === 0 && !chart.init).withContext(`with count ${chart.annotationCount}, init ${chart.init}`).toEqual(true);
          cycles++;
          if (cycles === 2) {
            done();
          }
        }
      }];

      [commonOpts, options].forEach(function(targetOptions) {
        delete commonOpts.init;
        delete options.init;
        targetOptions.init = false;
        pluginOpts.annotations = [options];
        window.acquireChart(chartConfig);
      });

    });

    it(` callback should not receive the element properties in ${type} annotation`, function(done) {

      const chartConfig = {
        type: 'scatter',
        options: {
          animation: {
            duration: 500
          },
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
        xMin: 4,
        yMin: 4,
        xMax: 6,
        yMax: 6,
        radius: 40,
        borderWidth: 0
      };

      const pluginOpts = chartConfig.options.plugins.annotation;
      const commonOpts = pluginOpts.common;
      let cycles = 0;

      [commonOpts, options].forEach(function(targetOptions) {
        delete commonOpts.init;
        delete options.init;
        targetOptions.init = function({properties}) {
          expect(typeof properties === 'object').toEqual(true);
          cycles++;
          if (cycles === 2) {
            done();
          }
        };
        pluginOpts.annotations = [options];
        window.acquireChart(chartConfig);
      });

    });

  }

});
