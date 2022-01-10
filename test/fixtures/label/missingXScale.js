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
              xScaleID: 'missing',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing x scale and', 'then is located to horizontal center'],
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: 0,
              yAdjust: -100,
              callout: {
                enabled: true,
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
