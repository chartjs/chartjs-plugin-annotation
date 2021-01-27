describe('Event callbacks', function() {

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
                  borderWidth: 2,
                  click() {
                  }
                },
                mydisable: {
                  display: false,
                  type: 'line',
                  scaleID: 'y',
                  value: 20,
                  borderColor: 'red',
                  borderWidth: 2,
                  click() {
                  }
                }
              }
            }
          }
        }
      };

      var chart = acquireChart(config);

      chart.update();
    }
    expect(createAndUpdateChart).not.toThrow();
  });
});
