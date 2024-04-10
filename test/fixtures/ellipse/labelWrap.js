module.exports = {
  tolerance: 0.0075,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          display: false,
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
            box1: {
              type: 'ellipse',
              xMin: 2,
              xMax: 5,
              yMin: 0,
              yMax: 5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              label: {
                display: true,
                content: 'No wrap because ellipse - '.repeat(2),
                textWrap: true,
              }
            },
            box2: {
              type: 'ellipse',
              xMin: 2,
              xMax: 5,
              yMin: 10,
              yMax: 15,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              label: {
                display: true,
                content: ['No wrap!', 'No wrap because ellipse - '.repeat(2), 'No wrap!'],
                textWrap: true,
              }
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
