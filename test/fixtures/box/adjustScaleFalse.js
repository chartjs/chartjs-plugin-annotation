module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'bar',
    data: {
      datasets: [{
        data: [0, 5, 10, 15, 20, 22]
      }]
    },
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: true
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              adjustScaleRange: false,
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
              adjustScaleRange: false,
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
