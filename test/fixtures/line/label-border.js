module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 100
        },
        y: {
          display: false,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                borderDash: [6, 6],
                content: 'dashed 3px black border',
                display: true
              },
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
