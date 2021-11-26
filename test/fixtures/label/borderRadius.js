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
              xValue: 3.5,
              yValue: 10,
              backgroundColor: 'rgb(245,245,245)',
              borderWidth: 5,
              borderRadius: {topLeft: 16, topRight: 8, bottomRight: 4},
              content: 'This is my text'
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 11,
              backgroundColor: 'rgb(245,245,245)',
              borderDash: [6, 6],
              borderWidth: 4,
              borderRadius: Infinity,
              content: 'This is my text'
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'July',
              yValue: 20,
              backgroundColor: 'rgb(245,245,245)',
              borderDash: [6, 6],
              borderWidth: 5,
              borderRadius: 4,
              content: ['This is my text', 'position: {x: end}'],
              position: {
                x: 'end'
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
