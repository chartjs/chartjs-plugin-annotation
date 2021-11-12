module.exports = {
  tolerance: 0.0055,
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
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'January',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'This is my text',
              align: 'right'
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'This is my text'
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'This is my text',
              align: 'left'
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
