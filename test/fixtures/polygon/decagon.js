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
            decagon: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 1,
              yValue: 1,
              sides: 10,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              radius: 50
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
