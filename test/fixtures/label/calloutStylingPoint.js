module.exports = {
  tolerance: 0.0075,
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
            text1: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['This is my text', 'and this is the second row of my text'],
              position: {
                x: 'center',
                y: 'center'
              },
              xAdjust: 150,
              yAdjust: -100,
              callout: {
                enabled: true,
              }
            },
            point1: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              radius: 10,
              backgroundColor: 'red',
              borderColor: 'black',
              borderWidth: 3,
              borderDash: [2, 3],
              borderDashOffset: 0
            }
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
