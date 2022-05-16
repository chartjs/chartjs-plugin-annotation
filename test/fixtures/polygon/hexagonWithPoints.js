module.exports = {
  tolerance: 0.0055,
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
          common: {
            drawTime: 'afterDraw'
          },
          annotations: {
            octagon: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 1,
              yValue: 1,
              sides: 6,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 1,
              radius: 50,
              point: {
                radius: 3,
                backgroundColor: 'red',
                borderColor: 'black',
                borderWidth: 1
              }
            }
          }
        }
      }
    }
  },
  options: {
    canvas: {
      width: 256,
      height: 256
    }
  }
};
