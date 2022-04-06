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
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                display: true,
                content: 'box1: This is a label',
                position: 'start',
                padding: 15
              }
            },
            box2: {
              type: 'box',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                display: true,
                content: 'box2: This is a label',
                position: 'start',
                padding: {x: 20}
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
              borderWidth: 5,
              label: {
                display: true,
                content: 'box3: This is a label with different length',
                position: 'end',
                padding: {y: 10}
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
              borderWidth: 5,
              label: {
                display: true,
                content: 'box4: This is the label',
                color: 'red',
                position: {
                  x: 'start',
                  y: 'start'
                },
                padding() {
                  return {left: 10, top: 5};
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
