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
              xScaleID: 'x',
              yScaleID: 'missing',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing y scale and', 'then is located to vertical center'],
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
