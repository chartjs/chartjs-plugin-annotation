module.exports = {
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
          annotations: {
            point: {
              type: 'point',
              xValue: 1,
              yValue: 1,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              radius: 50,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            }
          }
        }
      }
    }
  }
};
