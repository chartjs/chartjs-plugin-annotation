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
            dashSmall: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 3,
              pointStyle: 'dash',
              radius: 10
            },
            dash: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 5,
              pointStyle: 'dash',
              radius: 25
            },
            dashBig: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 15,
              pointStyle: 'dash',
              radius: 50
            }
          }
        }
      }
    }
  }
};
