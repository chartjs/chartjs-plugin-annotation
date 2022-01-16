module.exports = {
  tolerance: 0.0055,
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
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderDash: [6, 6],
              borderWidth: 5,
            },
            box2: {
              type: 'box',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderDash: [6, 6],
              borderWidth: 5,
            },
            box3: {
              type: 'box',
              xMin: -0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderDash: [6, 6],
              borderWidth: 5,
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
