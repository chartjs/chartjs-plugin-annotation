module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 100
        },
        y: {
          display: false,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          annotations: {
            left: {
              type: 'line',
              scaleID: 'y',
              value: 25,
              curve: true,
              controlPoint: {
                y: -90
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'black',
                content: 'start',
                display: true,
                z: 1
              },
            },
            hCenter: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              curve: true,
              controlPoint: {
                y: -90
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'center',
                backgroundColor: 'black',
                content: 'center',
                display: true,
                z: 1
              },
            },
            right: {
              type: 'line',
              scaleID: 'y',
              value: 75,
              curve: true,
              controlPoint: {
                y: -90
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'end',
                backgroundColor: 'black',
                content: 'end',
                display: true,
                z: 1
              },
            },
            top: {
              type: 'line',
              scaleID: 'x',
              value: 15,
              curve: true,
              borderColor: 'red',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'start',
                display: true,
                z: 1
              }
            },
            vCenter: {
              type: 'line',
              scaleID: 'x',
              value: 25,
              curve: true,
              borderColor: 'red',
              borderWidth: 5,
              label: {
                position: 'center',
                backgroundColor: 'red',
                content: 'center',
                display: true,
                z: 1
              }
            },
            bottom: {
              type: 'line',
              scaleID: 'x',
              value: 35,
              curve: true,
              borderColor: 'red',
              borderWidth: 5,
              label: {
                position: 'end',
                backgroundColor: 'red',
                content: 'end',
                display: true,
                z: 1
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
