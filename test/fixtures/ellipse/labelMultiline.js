module.exports = {
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
            ellipse1: {
              type: 'ellipse',
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'red',
              borderWidth: 5,
              label: {
                display: true,
                content: ['This is a label', 'but this is multiline'],
              }
            },
            ellipse2: {
              type: 'ellipse',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'red',
              borderWidth: 5,
              label: {
                display: true,
                content: ['This is a label', 'but this is multiline'],
                position: 'start'
              }
            },
            ellipse3: {
              type: 'ellipse',
              xMin: -0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'red',
              borderWidth: 5,
              label: {
                display: true,
                content: ['This is a label', 'but this is multiline'],
                position: 'end'
              }
            },
            ellipse4: {
              type: 'ellipse',
              xMin: 'June',
              xMax: 'July',
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(178, 255, 102, 0.5)',
              borderColor: 'red',
              borderWidth: 5,
              label: {
                display: true,
                content: (ctx) => ['This is a label', 'type:' + ctx.type],
                color: 'red',
                position: {
                  x: 'start'
                }
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
