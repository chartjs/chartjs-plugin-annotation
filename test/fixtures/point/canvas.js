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
          annotations: {
            canvas: {
              type: 'point',
              xValue: 0,
              yValue: 0,
              pointStyle: canvas,
              radius: Math.max(canvas.width, canvas.height)
            }
          }
        }
      }
    }
  }
};
