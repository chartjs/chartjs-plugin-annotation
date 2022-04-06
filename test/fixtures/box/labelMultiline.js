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
            box1: {
              type: 'box',
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
            box2: {
              type: 'box',
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
            box3: {
              type: 'box',
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
            box4: {
              type: 'box',
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
