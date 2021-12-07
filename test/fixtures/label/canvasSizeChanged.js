const canvas = window.createCanvas();
module.exports = {
  tolerance: 0.0055,
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
          drawTime: 'afterDraw',
          annotations: {
            canvasSmall: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -6,
              yValue: 6,
              content: canvas,
              width: 100,
              height: () => 100 * canvas.height / canvas.width,
            },
            canvasPerc: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 6,
              yValue: -6,
              content: canvas,
              width: '50%',
              height: '50%',
            }
          }
        }
      }
    }
  }
};
