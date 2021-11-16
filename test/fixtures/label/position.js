module.exports = {
  tolerance: 0.0060,
  config: {
    type: 'line',
    data: {
      datasets: [
        {
          borderWidth: 1,
          borderColor: 'red',
          data: [20, 20, 20, 20, 20, 20, 20]
        }
      ]
    },
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
              xValue: 'February',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: undefined'
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'April',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: end',
              position: 'end'
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'June',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: start',
              position: 'start'
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
