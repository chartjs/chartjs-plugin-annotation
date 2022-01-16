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
        },
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            annotation1: {
              type: 'line',
              borderWidth: 3,
              borderColor: 'black',
              xMin: 'B',
              xMax: 'D',
              yMin: 0,
              yMax: 60,
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
