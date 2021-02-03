describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  describe('Use image as label content', function() {

    it('should not throw any exception', function() {
      function createAndUpdateChart() {
        const htmlText = new Image();
        htmlText.src = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="80">' +
        '<foreignObject width="100%" height="100%">' +
        '<div xmlns="http://www.w3.org/1999/xhtml" style="color: white;">Here is a <strong style="color: black;">HTML</strong> text, used as image, which can be styled as <em style="font-size: 16px;">YOU</em> like!</div>' +
        '</foreignObject></svg>';

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
                  image: {
                    type: 'line',
                    scaleID: 'y',
                    value: 25,
                    borderColor: 'black',
                    borderWidth: 5,
                    label: {
                      position: 'start',
                      backgroundColor: 'black',
                      content: htmlText,
                      enabled: true
                    },
                  },
                }
              }
            }
          },
        };

        var chart = acquireChart(config);
        chart.update();
      }
      expect(createAndUpdateChart).not.toThrow();
    });
  });
});
