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
          display: true,
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
              xValue: 2.5,
              yValue: 20,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: bottom',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                enabled: true,
                start: '10%',
                position: 'bottom'
              }
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: top',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              yAdjust: 50,
              callout: {
                enabled: true,
                start: 80,
                position: 'top',
              },
              point: {
                enabled: true
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
