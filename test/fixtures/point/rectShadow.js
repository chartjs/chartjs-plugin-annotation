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
            rectSmall: {
              type: 'point',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 3,
              pointStyle: 'rect',
              radius: 10,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            },
            rect: {
              type: 'point',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 5,
              pointStyle: 'rect',
              radius: 25,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            },
            rectBig: {
              type: 'point',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 15,
              pointStyle: 'rect',
              radius: 50,
              backgroundShadowColor: 'black',
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
