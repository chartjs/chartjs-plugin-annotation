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
          display: true,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xValue: 2.5,
              yValue: 20,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: bottom',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                enabled: true,
                position: 'bottom',
              }
            },
            point1: {
              type: 'point',
              xValue: 2.5,
              yValue: 20,
              radius: 3
            },
            text2: {
              type: 'label',
              xValue: 'May',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: top',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              yAdjust: 50,
              callout: {
                enabled: true,
                position: 'top',
              }
            },
            point2: {
              type: 'point',
              xValue: 'May',
              yValue: 10,
              radius: 3
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
