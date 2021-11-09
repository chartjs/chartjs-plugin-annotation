module.exports = {
  tolerance: 0.0070,
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
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: 'This is a label',
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
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: 'This is a label',
                textAlign: 'left',
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
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: (ctx) => ['This is a label', 'created by callback, type ' + ctx.type],
                font: {
                  size: 18
                },
                textAlign: 'right',
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
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                enabled: true,
                content: 'This is the label',
                color: 'red',
                textAlign: 'left',
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
