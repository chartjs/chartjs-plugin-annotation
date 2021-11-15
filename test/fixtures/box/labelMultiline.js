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
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'rgb(178, 255, 102)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: ['This is a label', 'but this is multiline'],
              }
            },
            box2: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'rgb(178, 255, 102)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: ['This is a label', 'but this is multiline'],
                align: 'left',
                position: 'top'
              }
            },
            box3: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'rgb(178, 255, 102)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: ['This is a label', 'but this is multiline'],
                align: 'right',
                position: 'bottom'
              }
            },
            box4: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 'June',
              xMax: 'July',
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'rgb(178, 255, 102)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: (ctx) => ['This is a label', 'type:' + ctx.type],
                color: 'red',
                align: 'left',
                position: 'center'
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
