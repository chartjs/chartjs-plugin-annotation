describe('Point annotation', function() {
  describe('auto', jasmine.fixtures('point'));

  window.testEvents({
    type: 'point',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 8,
    yValue: 8,
    radius: 30,
    borderWidth: 5,
    xAdjust: 0,
    yAdjust: 0
  });

  describe('applying defaults', function() {

    it('should not throw any exception', function() {
      function createAndUpdateChart() {
        const config = {
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
                  point: {
                    type: 'point',
                    borderWidth: 5,
                    display(context, options) {
                      if (options) {
                        context.chart.annotationRadius1 = options.radius;
                      }
                      return true;
                    },
                  },
                  point2: {
                    type: 'point',
                    xScaleID: 'x',
                    yScaleID: 'y',
                    xValue: 8,
                    yValue: 8,
                    borderWidth: 0,
                    display(context, options) {
                      if (options) {
                        context.chart.annotationRadius2 = options.radius;
                      }
                      return true;
                    },
                  }
                }
              }
            }
          },
        };

        var chart = acquireChart(config);
        if (isNaN(chart.annotationRadius1) || isNaN(chart.annotationRadius2)) {
          throw new Error('Defaults radius is not applied to annotaions : 1-' + chart.annotationRadius1 + ', 2-' + chart.annotationRadius2);
        }
      }
      expect(createAndUpdateChart).not.toThrow();
    });
  });
});
