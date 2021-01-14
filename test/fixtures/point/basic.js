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
          drawTime: 'afterDraw',
          annotations: {
            point: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 1,
              yValue: 1,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 15,
              radius: 50
            }
          }
        }
      }
    }
  }
};
