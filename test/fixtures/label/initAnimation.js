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
            label1: {
              type: 'label',
              init: true,
              xMin: 0.5,
              xMax: 2.5,
              yMin: 8,
              yMax: 13,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              content: 'true'
            },
            label2: {
              type: 'label',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              init: () => undefined,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              content: 'callback undef'
            },
            label3: {
              type: 'label',
              xMin: 0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              init: () => true,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              content: 'callback'
            },
            label4: {
              type: 'label',
              xMin: 0.5,
              xMax: 'May',
              yMin: 0.5,
              yMax: 4,
              init: () => ({y: 0, y2: 0}),
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              content: 'callback object'
            },
            label5: {
              type: 'label',
              xMin: 'April',
              xMax: 'July',
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              content: 'fallback'
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
