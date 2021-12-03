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
            cross: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'January',
              yValue: 22,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'This is my text on cross',
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: 120,
              yAdjust: -35,
              callout: {
                enabled: true,
              },
              point: {
                enabled: true,
                pointStyle: 'cross',
                borderWidth: 4,
                radius: 10
              }
            },
            rectRounded: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 18,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'This is my text on rectRounded',
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: 120,
              yAdjust: -35,
              callout: {
                enabled: true,
              },
              point: {
                enabled: true,
                pointStyle: 'rectRounded',
                backgroundColor: 'white',
                borderWidth: 4,
                radius: 10
              }
            },
            triangle: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'March',
              yValue: 14,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'This is my text on triangle',
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: 120,
              yAdjust: -35,
              callout: {
                enabled: true,
              },
              point: {
                enabled: true,
                pointStyle: 'triangle',
                backgroundColor: 'white',
                borderWidth: 4,
                radius: 10
              }
            },
            star: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'April',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'This is my text on star',
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: -120,
              yAdjust: +35,
              callout: {
                enabled: true,
              },
              point: {
                enabled: true,
                pointStyle: 'star',
                backgroundColor: 'white',
                borderWidth: 4,
                radius: 10
              },
            },
            triangleRot: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 6,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'This is my text on triangle rotated',
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: -120,
              yAdjust: +35,
              callout: {
                enabled: true,
              },
              point: {
                enabled: true,
                pointStyle: 'triangle',
                backgroundColor: 'white',
                borderWidth: 4,
                radius: 20,
                rotation: 45
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
