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
            box1: {
              type: 'box',
              adjustScaleRange: true,
              xMin: 1,
              xMax: 3,
              yMin: -2.3,
              yMax: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 2
            },
            box2: {
              type: 'box',
              adjustScaleRange: true,
              xMin: 4,
              xMax: 6,
              yMin: 10,
              yMax: 27,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 2
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
