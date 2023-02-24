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
              content: 'position: bottom',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                display: true,
                position: 'bottom',
              }
            },
            point1: {
              type: 'point',
              xValue: 2.5,
              yValue: 20,
              radius: 3
            },
            text2: {
              type: 'label',
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
                display: true,
                position: 'top',
              }
            },
            point2: {
              type: 'point',
              xValue: 'May',
              yValue: 10,
              radius: 3
            },
            text3: {
              type: 'label',
              xValue: 'June',
              yValue: 18,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: auto (top)',
              position: 'center',
              yAdjust: 50,
              callout: {
                display: true,
                position: 'auto',
              }
            },
            point3: {
              type: 'point',
              xValue: 'June',
              yValue: 18,
              radius: 3
            },
            text4: {
              type: 'label',
              xValue: 'February',
              yValue: 7,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: auto (bottom)',
              position: 'center',
              yAdjust: -50,
              callout: {
                display: true,
                position: 'auto',
              }
            },
            point4: {
              type: 'point',
              xValue: 'February',
              yValue: 7,
              radius: 3
            },
            text5: {
              type: 'label',
              xValue: 'February',
              yValue: 15,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'no callout',
              position: 'center',
              yAdjust: -50,
              callout: {
                display: true,
                position: 'auto',
                borderWidth: 0
              }
            },
            point5: {
              type: 'point',
              xValue: 'February',
              yValue: 15,
              radius: 3
            },
            text6: {
              type: 'label',
              xValue: 'April',
              yValue: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'invalid position (auto)',
              position: 'center',
              yAdjust: 50,
              callout: {
                display: true,
                position: 'wrong'
              }
            },
            point6: {
              type: 'point',
              xValue: 'April',
              yValue: 5,
              radius: 3
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
