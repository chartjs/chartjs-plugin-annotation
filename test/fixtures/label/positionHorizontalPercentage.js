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
              borderWidth: 0,
              content: 'position: {x: 0.25}',
              position: {
                x: 0.25,
                y: 'end'
              },
              point: {
                enabled: true,
                radius: 5,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: 0.5',
              position: {
                x: 0.5,
                y: 'end'
              },
              point: {
                enabled: true,
                radius: 5,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {x: 0.75}',
              position: {
                x: 0.75,
                y: 'end'
              },
              point: {
                enabled: true,
                radius: 5,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text4: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: 0.1',
              position: {
                x: 0.1,
                y: 'end'
              },
              point: {
                enabled: true,
                radius: 5,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
