module.exports = {
  tolerance: 0.0060,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10
        },
        y: {
          display: true,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            canvas1: {
              type: 'box',
              xMin: -9,
              xMax: -1,
              yMin: 9,
              yMax: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 2,
              label: {
                display: true,
                position: 'start',
                content: window.createCanvas,
                width: '25%',
                height: '25%'
              }
            },
            canvas2: {
              type: 'box',
              xMin: 1,
              xMax: 9,
              yMin: 9,
              yMax: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 2,
              label: {
                display: true,
                position: 'end',
                content: window.createCanvas,
                width: '25%',
                height: '25%'
              }
            },
            canvas3: {
              type: 'box',
              xMin: -9,
              xMax: -1,
              yMin: -1,
              yMax: -9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 2,
              label: {
                display: true,
                position: {
                  x: 'start',
                  y: 'center'
                },
                content: window.createCanvas,
                width: '25%',
                height: '25%'
              }
            },
            canvas4: {
              type: 'box',
              xMin: 1,
              xMax: 9,
              yMin: -1,
              yMax: -9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 2,
              label: {
                display: true,
                position: {
                  x: 'center',
                  y: 'end'
                },
                content: window.createCanvas,
                width: '25%',
                height: '25%'
              }
            }
          }
        }
      }
    }
  }
};
