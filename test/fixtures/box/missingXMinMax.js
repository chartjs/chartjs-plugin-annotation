module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 50
        },
        y: {
          display: false,
          min: -10,
          max: 50
        }
      },
      plugins: {
        annotation: {
          annotations: {
            first: {
              type: 'box',
              xMax: 1,
              backgroundColor: 'rgba(159, 226, 191, 0.5)',
            },
            second: {
              type: 'box',
              xMax: 30,
              xMin: 1,
              backgroundColor: 'rgba(255, 191, 0, 0.5)',
            },
            third: {
              type: 'box',
              xMin: 30,
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
