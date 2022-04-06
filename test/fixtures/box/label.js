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
            box2: {
              type: 'box',
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
                content: 'This label tests clipping',
                position: 'start'
              }
            },
            box3: {
              type: 'box',
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
            box4: {
              type: 'box',
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
                content: 'This is the label',
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
