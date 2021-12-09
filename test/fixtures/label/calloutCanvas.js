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
            canvas: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 6,
              yValue: -6,
              content: window.createCanvas,
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: -150,
              yAdjust: -230,
              callout: {
                enabled: true,
                position: 'bottom'
              }
            }
          }
        }
      }
    }
  }
};
