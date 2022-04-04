module.exports = {
  config: {
    type: 'bar',
    data: {
      datasets: [{
        data: [0, 5, 10, 15, 20, 22]
      }]
    },
    options: {
      scales: {
        x1: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y1: {
          display: true
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            point1: {
              type: 'point',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
            },
            point2: {
              type: 'point',
              xValue: 'May',
              yValue: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1
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
