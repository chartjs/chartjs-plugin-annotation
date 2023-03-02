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
            circum0: {
              type: 'arc',
              xValue: -7,
              yValue: -7,
              backgroundColor: 'green',
              circumference: 0
            },
            radiusNeg: {
              type: 'arc',
              xValue: -1,
              yValue: -1,
              backgroundColor: 'yellow',
              radius: -1
            },
          }
        }
      }
    }
  }
};
