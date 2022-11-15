module.exports = {
  config: {
    type: 'bar',
    data: {
      datasets: [{
        data: [0, 5, 10, 15, 20, 22],
        yAxisID: 'y1'
      }]
    },
    options: {
      scales: {
        x1: {
          display: false,
          axis: 'x',
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y1: {
          display: true,
          axis: 'y'
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            polygon1: {
              type: 'polygon',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
            },
            polygon2: {
              type: 'polygon',
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
