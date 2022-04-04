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
          min: 0,
          max: 10
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
            centered: {
              type: 'label',
              content: ['Centered', 'no scale values'],
              borderWidth: 2
            },
            xMissing: {
              type: 'label',
              yValue: 8,
              content: ['Only yValue', 'is defined'],
              borderWidth: 2
            },
            yMissing: {
              type: 'label',
              xValue: 'June',
              content: ['Only xValue', 'is defined'],
              borderWidth: 2
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
