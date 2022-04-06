module.exports = {
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
              xValue: 2.5,
              yValue: 20,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: right',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                display: true,
                position: 'right'
              }
            },
            point1: {
              type: 'point',
              xValue: 2.5,
              yValue: 20
            },
            text2: {
              type: 'label',
              xValue: 'May',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: left',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              yAdjust: 50,
              callout: {
                display: true,
                position: 'left',
              },
            },
            point2: {
              type: 'point',
              xValue: 'May',
              yValue: 10
            },
            text3: {
              type: 'label',
              xValue: 'June',
              yValue: 16,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: auto (left)',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              callout: {
                display: true,
                position: 'auto',
              },
            },
            point3: {
              type: 'point',
              xValue: 'June',
              yValue: 16
            },
            text4: {
              type: 'label',
              xValue: 'February',
              yValue: 4,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: auto (right)',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              callout: {
                display: true,
                position: 'auto',
              },
            },
            point4: {
              type: 'point',
              xValue: 'February',
              yValue: 4
            },
            text5: {
              type: 'label',
              xValue: 'January',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'no callout',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              callout: {
                display: true,
                position: 'left',
                borderWidth: 0
              },
            },
            point5: {
              type: 'point',
              xValue: 'January',
              yValue: 10
            },
            text6: {
              type: 'label',
              xValue: 'January',
              yValue: 14,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'invalid position (auto)',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              callout: {
                display: true,
                position: 'wrong'
              },
            },
            point6: {
              type: 'point',
              xValue: 'January',
              yValue: 14
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
