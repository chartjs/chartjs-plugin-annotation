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
            initAnimation: () => true,
          },
          annotations: {
            line1: {
              type: 'line',
              initAnimation: true,
              xMin: 0.5,
              xMax: 2.5,
              yMin: 8,
              yMax: 13,
              borderColor: 'rgb(255, 99, 132)',
              label: {
                display: true,
                content: 'true'
              }
            },
            line2: {
              type: 'line',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              initAnimation: () => undefined,
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                content: 'callback undef'
              }
            },
            line3: {
              type: 'line',
              xMin: 0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              initAnimation: () => true,
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                content: 'callback'
              }
            },
            line4: {
              type: 'line',
              xMin: 0.5,
              xMax: 'May',
              yMin: 0.5,
              yMax: 4,
              initAnimation: () => ({y: 0, y2: 0}),
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                content: 'callback object'
              }
            },
            line5: {
              type: 'line',
              xMin: 'April',
              xMax: 'July',
              yMin: 5,
              yMax: 9,
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                content: 'fallback'
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
