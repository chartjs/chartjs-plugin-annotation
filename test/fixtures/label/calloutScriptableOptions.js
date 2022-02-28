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
                display: true,
                margin: () => 10,
                side: () => 10,
                start: () => '80%',
                borderColor: () => 'green',
                borderWidth: () => 2,
                borderDash: () => [1],
                borderDashOffset: () => 0,
              }
            },
            point1: {
              type: 'point',
              xValue: 'February',
              yValue: 10,
              radius: () => 10,
              backgroundColor: () => 'green',
              borderColor: () => 'black',
              borderWidth: () => 1,
              borderDash: () => [1],
              borderDashOffset: () => 0
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
