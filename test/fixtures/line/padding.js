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
                content: 'padding: 10',
                display: true,
                padding: 10
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
                content: 'padding: {x: 10, y: 15}',
                display: true,
                padding: {x: 10, y: 15}
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
                content: 'padding: {left: 10, top: 15, right: 3, bottom: 2}',
                display: true,
                padding() {
                  return {left: 10, top: 15, right: 3, bottom: 2};
                }
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
