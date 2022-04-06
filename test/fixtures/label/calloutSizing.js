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
            margin10: {
              type: 'label',
              xValue: 2.5,
              yValue: 20,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 3,
              content: ['position: right', 'margin: 10'],
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                display: true,
                margin: 10,
                position: 'right',
              }
            },
            pointMargin10: {
              type: 'point',
              xValue: 2.5,
              yValue: 20,
              radius: 3
            },
            noMargin: {
              type: 'label',
              xValue: 'May',
              yValue: 24,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 4,
              content: ['position: left', 'margin: 0'],
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              yAdjust: 50,
              callout: {
                display: true,
                margin: 0,
                position: 'left',
              }
            },
            pointNoMargin: {
              type: 'point',
              xValue: 'May',
              yValue: 24,
              radius: 3
            },
            side20: {
              type: 'label',
              xValue: 2.5,
              yValue: 12.5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['position: bottom', 'side: 20', 'start: 10%'],
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                display: true,
                start: '10%',
                side: 20,
                position: 'bottom',
              }
            },
            pointSide20: {
              type: 'point',
              xValue: 2.5,
              yValue: 12.5,
              radius: 3
            },
            topSide20: {
              type: 'label',
              xValue: 'May',
              yValue: 15,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['position: top', 'side: 20', 'start: 80'],
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              yAdjust: 50,
              callout: {
                display: true,
                start: 80,
                side: 20,
                position: 'top',
              }
            },
            pointTopSide20: {
              type: 'point',
              xValue: 'May',
              yValue: 15,
              radius: 3
            },
            start10Perc: {
              type: 'label',
              xValue: 2.5,
              yValue: 6,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: bottom, start: 10%',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -20,
              yAdjust: -40,
              callout: {
                display: true,
                start: '10%',
                position: 'bottom'
              }
            },
            pointStart10Perc: {
              type: 'point',
              xValue: 2.5,
              yValue: 6,
              radius: 3
            },
            start80: {
              type: 'label',
              xValue: 3.5,
              yValue: 7,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: top, start: 40',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 20,
              yAdjust: 50,
              callout: {
                display: true,
                start: 40,
                position: 'top'
              }
            },
            pointStart80: {
              type: 'point',
              xValue: 3.5,
              yValue: 7,
              radius: 3
            },
            startInvalid: {
              type: 'label',
              xValue: 'April',
              yValue: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: auto, start invalid',
              position: 'center',
              xAdjust: -70,
              yAdjust: 70,
              callout: {
                display: true,
                start: 'invalid'
              }
            },
            pointStartInvalid: {
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
