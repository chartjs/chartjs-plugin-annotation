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
            ellipse1: {
              type: 'ellipse',
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                display: true,
                content: 'This is a label',
              }
            },
            ellipse2: {
              type: 'ellipse',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'black',
              borderWidth: 15,
              label: {
                display: true,
                borderColor: 'green',
                content: ['This label is very long', 'and is beyond the box of', 'annotation'],
                position: 'start'
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
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                display: true,
                content: 'This is a label with different length',
                position: 'end'
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
              borderDash: [6, 6],
              borderWidth: 5,
              label: {
                display: true,
                content: ['This is', 'a multiline', 'label'],
                color: 'red',
                position: {
                  x: 'center'
                },
                textAlign: 'center'
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
