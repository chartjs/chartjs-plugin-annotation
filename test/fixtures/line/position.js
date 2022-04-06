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
                display: true
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
                display: true
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
                display: true
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
                display: true
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
                display: true
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
                display: true
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
