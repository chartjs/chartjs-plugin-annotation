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
        legend: false,
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'January',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 1,
              content: 'position: {x: start}, padding: 15',
              position: {
                x: 'start'
              },
              padding: 15
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 1,
              content: 'position: {x: start}, padding: {x: 15}',
              position: {
                x: 'start'
              },
              padding: {x: 15}
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 15,
              backgroundColor: 'transparent',
              borderWidth: 1,
              content: 'position: {x: end}, padding: {y: 20}',
              position: {
                x: 'end'
              },
              padding: {y: 30}
            },
            text4: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 5,
              backgroundColor: 'transparent',
              borderWidth: 1,
              content: 'position: {x: end}, padding: {y: 20}',
              position: 'start',
              padding: {left: 40, top: 10, right: 5, bottom: 20}
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
