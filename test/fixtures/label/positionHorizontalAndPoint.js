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
        legend: false,
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xValue: 'January',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {x: start}',
              position: {
                x: 'start'
              }
            },
            point1: {
              type: 'point',
              xValue: 'January',
              yValue: 20,
              backgroundColor: 'red',
              radius: 5
            },
            text2: {
              type: 'label',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: center',
            },
            point2: {
              type: 'point',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'red',
              radius: 5
            },
            text3: {
              type: 'label',
              xValue: 'May',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {x: end}',
              position: {
                x: 'end'
              }
            },
            point3: {
              type: 'point',
              xValue: 'May',
              yValue: 20,
              backgroundColor: 'red',
              radius: 5
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
