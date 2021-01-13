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
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'black',
                content: 'start',
                enabled: true
              },
            },
            hCenter: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'center',
                backgroundColor: 'black',
                content: 'center',
                enabled: true
              },
            },
            right: {
              type: 'line',
              scaleID: 'y',
              value: 75,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'end',
                backgroundColor: 'black',
                content: 'end',
                enabled: true
              },
            },
            top: {
              type: 'line',
              scaleID: 'x',
              value: 15,
              borderColor: 'red',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'start',
                enabled: true
              }
            },
            vCenter: {
              type: 'line',
              scaleID: 'x',
              value: 25,
              borderColor: 'red',
              borderWidth: 5,
              label: {
                position: 'center',
                backgroundColor: 'red',
                content: 'center',
                enabled: true
              }
            },
            bottom: {
              type: 'line',
              scaleID: 'x',
              value: 35,
              borderColor: 'red',
              borderWidth: 5,
              label: {
                position: 'end',
                backgroundColor: 'red',
                content: 'end',
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
