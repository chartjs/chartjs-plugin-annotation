const canvas = window.createCanvas();
canvas.style.opacity = 0.2;
module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: -10,
          max: 10
        },
        y: {
          display: false,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            canvas: {
              type: 'label',
              xValue: 0,
              yValue: 0,
              content: canvas
            },
            canvasSmall: {
              type: 'label',
              xValue: -6,
              yValue: 6,
              content: canvas,
              width: 100,
              height: () => 100 * canvas.height / canvas.width,
              opacity: 0.6,
            },
            canvasPerc: {
              type: 'label',
              xValue: 6,
              yValue: -6,
              content: canvas,
              opacity: 'mistake',
              width: '50%',
              height: '50%',
            }
          }
        }
      }
    }
  }
};
