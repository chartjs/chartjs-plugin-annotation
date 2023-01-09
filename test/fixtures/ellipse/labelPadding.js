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
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                display: true,
                content: 'ellipse1: padding: 30',
                position: 'start',
                padding: 30
              }
            },
            ellipse2: {
              type: 'ellipse',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                display: true,
                content: 'ellipse2: padding: {x: 20}',
                position: 'start',
                padding: {x: 20}
              }
            },
            ellipse3: {
              type: 'ellipse',
              xMin: -0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                display: true,
                content: 'ellipse3: padding: {y: 20}',
                position: 'end',
                padding: {y: 20}
              }
            },
            ellipse4: {
              type: 'ellipse',
              xMin: 'June',
              xMax: 'July',
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                display: true,
                content: ['ellipse4:', 'padding', '{left: 20,', 'top: 20}'],
                color: 'red',
                position: {
                  x: 'start',
                  y: 'start'
                },
                padding() {
                  return {left: 20, top: 20};
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
