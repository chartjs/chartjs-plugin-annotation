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
              content: ['This is my text', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
              position: {
                x: 'end',
                y: 'center'
              },
              textAlign: 'start'
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'April',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: ['This is my text', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'June',
              yValue: 15,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: ['This is my text', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
              position: {
                x: 'start'
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
