module.exports = {
  tolerance: 0.0075,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July']
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          common: {
            init: () => true,
          },
          annotations: {
            polygon1: {
              type: 'polygon',
              init: true,
              xMin: 0.5,
              xMax: 2.5,
              yMin: 8,
              yMax: 13,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              sides: 5,
              radius: 40
            },
            polygon2: {
              type: 'polygon',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              init: () => undefined,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              sides: 6,
              radius: 40
            },
            polygon3: {
              type: 'polygon',
              xMin: 0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              init: () => true,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              sides: 7,
              radius: 40
            },
            polygon4: {
              type: 'polygon',
              xMin: 'April',
              xMax: 'July',
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              sides: 4,
              radius: 40
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
