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
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: true,
          stack: 'demo',
          stackWeight: 2,
          min: -10,
          max: 50
        },
        y2: {
          type: 'category',
          display: true,
          labels: ['ON', 'OFF'],
          offset: true,
          position: 'left',
          stack: 'demo',
          stackWeight: 1,
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            first: {
              type: 'box',
              yMax: 1,
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
              yMin: 30,
              backgroundColor: 'rgba(222, 49, 99, 0.5)',
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
