module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            box: {
              type: 'box',
              xScaleID: 'missing',
              yScaleID: 'y',
              xMin: 'February',
              xMax: 'May',
              yMin: 5,
              yMax: 18,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 0,
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
