const canvas = window.createCanvas();
canvas.style.opacity = 0.2;

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
              type: 'ellipse',
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
                content: canvas,
                width: '25%',
                height: '25%'
              }
            },
            canvas2: {
              type: 'ellipse',
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
                content: canvas,
                opacity: 0.5,
                width: '25%',
                height: '25%'
              }
            },
            canvas3: {
              type: 'ellipse',
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
                opacity: 0.2,
                width: '25%',
                height: '25%'
              }
            },
            canvas4: {
              type: 'ellipse',
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
                opacity: 'mistake',
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
