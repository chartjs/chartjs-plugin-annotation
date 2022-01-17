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
          min: 0,
          max: 10
        }
      },
      plugins: {
        annotation: {
          clip: false,
          annotations: {
            text1: {
              type: 'label',
              xValue: 4,
              yValue: 0,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['This is my text', 'and this is the second row of my text'],
              position: {
                x: 'end',
                y: 'start'
              },
            }
          }
        }
      }
    }
  },
  options: {
    spriteText: true,
    canvas: {
      width: 256,
      height: 256
    }
  }
};
