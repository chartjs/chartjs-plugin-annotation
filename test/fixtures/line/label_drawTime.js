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
          drawTime: 'beforeDraw',
          annotations: {
            left: {
              drawTime: 'afterDraw',
              type: 'line',
              scaleID: 'y',
              value: 25,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'afterDraw/undefined',
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
                drawTime: 'beforeDraw',
                position: 'center',
                backgroundColor: 'red',
                content: 'beforeDraw/afterDraw',
                enabled: true
              },
            },
            right: {
              drawTime: 'afterDraw',
              type: 'line',
              scaleID: 'y',
              value: 75,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                drawTime: 'beforeDraw',
                position: 'end',
                backgroundColor: 'black',
                content: 'afterDraw/beforeDraw',
                enabled: true
              },
            },
            top: {
              type: 'line',
              scaleID: 'x',
              value: 50,
              borderColor: 'blue',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'fallback/fallback',
                enabled: true
              }
            },
            bottomRight: {
              type: 'line',
              scaleID: 'x',
              value: 85,
              borderColor: 'transparent',
              label: {
                position: 'end',
                backgroundColor: 'green',
                content: 'fallback = beforeDraw',
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
