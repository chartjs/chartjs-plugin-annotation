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
            line1: {
              type: 'line',
              xMin: 'February',
              xMax: 'May',
              yMin: 5,
              yMax: 10,
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 3,
            },
            line2: {
              type: 'line',
              yMin: 15,
              yMax: 15,
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 3,
            },
            line3: {
              type: 'line',
              xMin: 5,
              xMax: 5,
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 3,
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
