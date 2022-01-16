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
            labelcross: {
              type: 'label',
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
              }
            },
            cross: {
              type: 'point',
              xValue: 'January',
              yValue: 22,
              pointStyle: 'cross',
              borderWidth: 4,
              radius: 10
            },
            labelRectRounded: {
              type: 'label',
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
              }
            },
            rectRounded: {
              type: 'point',
              xValue: 'February',
              yValue: 18,
              pointStyle: 'rectRounded',
              backgroundColor: 'white',
              borderWidth: 4,
              radius: 10
            },
            labelTriangle: {
              type: 'label',
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
              }
            },
            triangle: {
              type: 'point',
              xValue: 'March',
              yValue: 14,
              pointStyle: 'triangle',
              backgroundColor: 'white',
              borderWidth: 4,
              radius: 10
            },
            labelStar: {
              type: 'label',
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
            },
            star: {
              type: 'point',
              xValue: 'April',
              yValue: 10,
              pointStyle: 'star',
              backgroundColor: 'white',
              borderWidth: 4,
              radius: 10
            },
            labelTriangleRot: {
              type: 'label',
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
              }
            },
            triangleRot: {
              type: 'point',
              xValue: 'May',
              yValue: 6,
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
  },
  options: {
    spriteText: true
  }
};
