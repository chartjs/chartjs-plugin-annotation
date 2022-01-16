module.exports = {
  config: {
    type: 'scatter',
    data: {
      datasets: [{
        backgroundColor: 'rgba(255,165,0,0.9)',
        radius: 20,
        data: [{x: 15, y: 25}, {x: 35, y: 50}, {x: 50, y: 95}, {x: 82, y: 75}, {x: 82, y: 5}]
      }]
    },
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
        legend: false,
        annotation: {
          common: {
            drawTime: 'beforeDraw',
          },
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
                drawTime: 'afterDraw',
                position: 'center',
                backgroundColor: 'red',
                content: 'beforeDraw/afterDraw',
                display: true
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
                backgroundColor: 'green',
                content: 'afterDraw/beforeDraw',
                display: true
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
                display: true
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
