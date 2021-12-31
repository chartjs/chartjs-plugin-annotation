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
            crossSmall: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 3,
              pointStyle: 'cross',
              radius: 10,
              borderShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            },
            cross: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              pointStyle: 'cross',
              radius: 25,
              borderShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            },
            crossBig: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 15,
              pointStyle: 'cross',
              radius: 50,
              borderShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 15,
              shadowOffsetY: 15
            }
          }
        }
      }
    }
  }
};
