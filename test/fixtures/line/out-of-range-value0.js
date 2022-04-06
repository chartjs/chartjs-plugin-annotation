module.exports = {
  config: {
    type: 'line',
    data: {
      datasets: [{
        data: [40, 20, 30, 60, 55],
      }],
      labels: ['A', 'B', 'C', 'D', 'E']
    },
    options: {
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            annotation1: {
              type: 'line',
              scaleID: 'y',
              borderWidth: 3,
              borderColor: 'black',
              value: 0,
              label: {
                backgroundColor: 'red',
                content: 'should be drawn',
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
