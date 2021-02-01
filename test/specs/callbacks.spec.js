describe('Scriptable options', function() {

  it('should not throw any exception', function() {
    function createAndUpdateChart() {
      const config = {
        type: 'line',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3]
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            annotation: {
              drawTime: 'afterDatasetsDraw',
              dblClickSpeed: 350,
              annotations: {
                my: {
                  display: true,
                  type: 'line',
                  scaleID: 'y',
                  value(context) {
                    let count = 0;
                    let sum = 0;
                    context.chart.data.datasets.forEach(function(dataset) {
                      dataset.data.forEach(function(data) {
                        count++;
                        sum += data;
                      });
                    });
                    context.chart.annotationAverage = sum / count;
                    return context.chart.annotationAverage;
                  },
                  borderColor: 'red',
                  borderWidth: 2
                }
              }
            }
          }
        }
      };
      var chart = acquireChart(config);
      var count = 0;
      var sum = 0;
      var average = 0;
      chart.data.datasets.forEach(function(dataset) {
        dataset.data.forEach(function(data) {
          count++;
          sum += data;
        });
      });
      average = sum / count;
      if (chart.annotationAverage !== average) {
        throw new Error('Average value ' + average + ' is not equals to average calculated by scriptable option ' + chart.annotationAverage);
      }
      chart.annotationAverage = NaN;
      chart.options.plugins.annotation.annotations.my.value = 10;
      chart.update();
      if (!isNaN(chart.annotationAverage)) {
        throw new Error('Average value is not equals NaN');
      }
    }
    expect(createAndUpdateChart).not.toThrow();
  });
});
