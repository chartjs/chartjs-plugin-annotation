module.exports = {
  tolerance: 0.0075,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xScaleID: 'missingX',
              yScaleID: 'missingY',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing x and y scales and', 'then is located in the center of the chart'],
              position: {
                x: 'center',
                y: 'center'
              }
            }
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
