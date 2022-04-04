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
            crossScales: {
              type: 'line',
              scaleID: 'x',
              borderWidth: 2,
              value: 1,
              label: {
                display: true,
                content: 'Cross scales',
                backgroundColor: 'white',
                color: 'black'
              }
            },
            limitedBottom: {
              type: 'line',
              yScaleID: 'y',
              borderWidth: 2,
              xMin: 3,
              xMax: 3,
              label: {
                display: true,
                content: ['Limited to', 'bottom scale'],
                backgroundColor: 'white',
                color: 'black'
              }
            },
            limitedTop: {
              type: 'line',
              yScaleID: 'y2',
              borderWidth: 2,
              xMin: 5,
              xMax: 5,
              label: {
                display: true,
                content: ['Limited to', 'top scale'],
                backgroundColor: 'white',
                color: 'black'
              }
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
