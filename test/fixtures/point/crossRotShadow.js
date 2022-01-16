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
            crossRotSmall: {
              type: 'point',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 3,
              pointStyle: 'crossRot',
              radius: 10,
              borderShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            },
            crossRot: {
              type: 'point',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 5,
              pointStyle: 'crossRot',
              radius: 25,
              borderShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            },
            crossRotBig: {
              type: 'point',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(255, 99, 132, 0.25)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 15,
              pointStyle: 'crossRot',
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
