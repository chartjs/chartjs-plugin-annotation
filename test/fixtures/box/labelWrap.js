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
              type: 'box',
              xMin: -0.5,
              xMax: 2,
              yMin: 0,
              yMax: 5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              label: {
                display: true,
                content: 'This is a long label - '.repeat(4),
                textWrap: true,
              }
            },
            box2: {
              type: 'box',
              xMin: 2.5,
              xMax: 5,
              yMin: 0,
              yMax: 5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              label: {
                display: true,
                content: ['No wrap!', 'This is a long label - '.repeat(4), 'No wrap!'],
                textWrap: true,
              }
            },
            box3: {
              type: 'box',
              xMin: 1,
              xMax: 5,
              yMin: 15,
              yMax: 20,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              label: {
                display: true,
                content: ['No wrap!', 'Overflow ' + 'This is a long label - '.repeat(3), 'No wrap!'],
                textWrap: false,
                textAlign: 'center'
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
