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
              xValue: 'January',
              yValue: 20,
              backgroundColor: 'missing',
              borderWidth: 0,
              content: 'This is my text',
              position: {
                x: 'end'
              }
            },
            text3: {
              type: 'label',
              xValue: 'May',
              yValue: 20,
              backgroundColor: 'rgba(250,250,250,0)',
              borderWidth: 0,
              content: 'This is my text',
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
