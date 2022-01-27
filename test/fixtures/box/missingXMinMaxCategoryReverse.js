module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'bar',
    data: {
      datasets: [{
        data: [0, 0, 0, 0, 0, 0]
      }]
    },
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          reverse: true
        },
        y: {
          display: false
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            first: {
              type: 'box',
              xMax: 'February',
              backgroundColor: 'rgba(159, 226, 191, 0.5)',
            },
            second: {
              type: 'box',
              xMax: 'April',
              xMin: 'February',
              backgroundColor: 'rgba(255, 191, 0, 0.5)',
            },
            third: {
              type: 'box',
              xMin: 'April',
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
