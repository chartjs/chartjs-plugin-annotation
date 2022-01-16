describe('Display options', function() {

  ['box', 'ellipse', 'label', 'line', 'point', 'polygon'].forEach(function(key) {
    it(`should not throw any exception changing display for ${key}`, function() {
      function createChart() {
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
                annotations: {
                  my: {
                    display: true,
                    type: key
                  }
                }
              }
            }
          }
        };
        const chart = acquireChart(config);
        chart.update();
        chart.options.plugins.annotation.annotations.my.display = false;
        chart.update();
        chart.options.plugins.annotation.annotations.my.display = () => true;
        chart.update();
        chart.options.plugins.annotation.annotations.my.display = () => false;
        chart.update();
        chart.options.plugins.annotation.annotations.my.display = () => null;
        chart.update();
      }
      expect(createChart).not.toThrow();
    });
  });
});
