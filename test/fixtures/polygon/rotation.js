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
            triangle: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 1,
              yValue: 1,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 1,
              radius: 50,
              rotation: 180
            },
            pentagon: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 6,
              yValue: 6,
              sides: 5,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 1,
              radius: 50,
              rotation: 180
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