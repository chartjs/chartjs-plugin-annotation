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
              type: 'label',
              xValue: 0,
              yValue: 0,
              content: window.createCanvas
            }
          }
        }
      }
    }
  }
};
