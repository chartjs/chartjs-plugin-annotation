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
            auto1: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                position: 'start',
                backgroundColor: 'red',
                content: 'auto rotation',
                enabled: true
              },
            },
            auto2: {
              type: 'line',
              xMin: 90,
              yMin: 10,
              xMax: 80,
              yMax: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'auto rotation',
                enabled: true
              },
            },
            auto3: {
              type: 'line',
              xMin: 30,
              yMin: 80,
              xMax: 60,
              yMax: 85,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'auto rotation',
                enabled: true
              },
            },
            auto4: {
              type: 'line',
              xMin: 65,
              yMin: 70,
              xMax: 70,
              yMax: 100,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'auto rotation',
                enabled: true
              },
            },
            man1: {
              type: 'line',
              xMin: 10,
              yMin: 60,
              xMax: 30,
              yMax: 70,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 90,
                backgroundColor: 'red',
                content: 'rotated 90',
                enabled: true
              },
            },
            man2: {
              type: 'line',
              xMin: 10,
              yMin: 30,
              xMax: 40,
              yMax: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: -80,
                backgroundColor: 'red',
                content: 'rotated -80',
                enabled: true
              },
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
