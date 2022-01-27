module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: true,
          reverse: true,
          min: -10,
          max: 50
        }
      },
      plugins: {
        annotation: {
          annotations: {
            first: {
              type: 'box',
              yMin: 30,
              backgroundColor: 'rgba(159, 226, 191, 0.5)',
            },
            second: {
              type: 'box',
              yMax: 30,
              yMin: 1,
              backgroundColor: 'rgba(255, 191, 0, 0.5)',
            },
            third: {
              type: 'box',
              yMax: 1,
              backgroundColor: 'rgba(222, 49, 99, 0.5)',
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
