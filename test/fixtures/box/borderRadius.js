module.exports = {
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          display: false,
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
              borderRadius: {topLeft: 16, topRight: 8, bottomRight: 4},
              borderWidth: 5,
            },
            box2: {
              type: 'box',
              xMin: 'July',
              xMax: 'May',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderRadius: Infinity,
              borderWidth: 5,
            },
            box3: {
              type: 'box',
              xMin: 0,
              xMax: 'May',
              yMin: 20,
              yMax: 16,
              backgroundColor: 'rgba(171, 101, 33, 0.5)',
              borderColor: 'rgb(171, 101, 33)',
              borderRadius: 4,
              borderWidth: 5,
            }
          }
        }
      }
    }
  }
};
