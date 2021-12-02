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
            triangleSmall: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 3,
              pointStyle: 'triangle',
              radius: 10
            },
            triangle: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 5,
              pointStyle: 'triangle',
              radius: 25
            },
            triangleBig: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 15,
              pointStyle: 'triangle',
              radius: 50
            }
          }
        }
      }
    }
  }
};
