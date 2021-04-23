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
        y: {
          max: 60
        },
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            annotation1: {
              type: 'ellipse',
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderWidth: 3,
              borderColor: 'black',
              xMin: 'B',
              xMax: 'C',
              yMin: 20,
              yMax: 700,
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
