module.exports = {
  config: {
    type: 'line',
    data: {
      datasets: [{
        data: [10, 20, 30, 0, 55],
      }],
      labels: ['A', 'B', 'C', 'D', 'E']
    },
    options: {
      scales: {
        x: {
          min: 'C'
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            annotation1: {
              type: 'line',
              scaleID: 'x',
              borderWidth: 3,
              borderColor: 'black',
              value: 'B',
              label: {
                backgroundColor: 'red',
                content: 'shold not be drawn',
                display: true
              }
            }
          }
        }
      },
    }
  },
  options: {
    spriteText: true,
  }
};
