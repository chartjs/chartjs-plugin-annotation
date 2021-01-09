describe('Display options', function() {

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
                  value: 10,
                  borderColor: 'red',
                  borderWidth: 2
                }
              }
            }
          }
        }
      };

      var chart = acquireChart(config);

      chart.update();
      chart.options.plugins.annotation.annotations.my.display = false;
      chart.update();
      chart.options.plugins.annotation.annotations.my.display = function() {
        return true;
      };
      chart.update();
      chart.options.plugins.annotation.annotations.my.display = function() {
        return false;
      };
      chart.update();
      chart.options.plugins.annotation.annotations.my.display = function() {
        return null;
      };
      chart.update();
    }
    expect(createAndUpdateChart).not.toThrow();
  });
});
