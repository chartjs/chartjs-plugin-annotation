module.exports = {
  tolerance: 0.0025,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: 0,
          max: 100
        },
        y: {
          display: true,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          clip: false,
          annotations: {
            l0: {
              type: 'line',
              scaleID: 'x',
              value: 0,
              curve: true,
              controlPoint: {
                y: -20
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'black',
                content: 'y: -20',
                display: true
              }
            },
            l1: {
              type: 'line',
              scaleID: 'x',
              value: 10,
              curve: true,
              controlPoint: {
                y: -40
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'black',
                content: 'y: -40',
                position: 'end',
                display: true
              }
            },
            l2: {
              type: 'line',
              scaleID: 'x',
              value: 20,
              curve: true,
              controlPoint: {
                x: -250,
                y: -60
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'black',
                content: 'x: -250, y: -60',
                display: true
              }
            },
            l3: {
              type: 'line',
              scaleID: 'x',
              value: 40,
              curve: true,
              controlPoint: {
                x: 250,
                y: -60
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'black',
                content: 'x: 250, y: -60',
                display: true
              }
            },
            l4: {
              type: 'line',
              scaleID: 'x',
              value: 75,
              curve: true,
              controlPoint: {
                x: -250,
                y: 60
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'black',
                content: 'x: -250, y: 60',
                display: true
              }
            },
            l5: {
              type: 'line',
              scaleID: 'x',
              value: 90,
              curve: true,
              controlPoint: {
                y: 60
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'black',
                content: 'y: 60',
                display: true
              }
            },
            l6: {
              type: 'line',
              scaleID: 'x',
              value: 100,
              curve: true,
              controlPoint: {
                y: 20
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                backgroundColor: 'black',
                content: 'y: 20',
                display: true
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
