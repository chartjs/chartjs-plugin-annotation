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
              content: 'position: right',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                enabled: true,
                position: 'right'
              }
            },
            text2: {
              type: 'label',
              xValue: 'May',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: left',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 50,
              yAdjust: 50,
              callout: {
                enabled: true,
                position: 'left',
              },
            },
            point2: {
              type: 'point',
              xValue: 'May',
              yValue: 10
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
