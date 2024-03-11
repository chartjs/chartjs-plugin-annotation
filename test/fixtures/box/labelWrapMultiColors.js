module.exports = {
  tolerance: 0.0137,
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
              xMin: 2,
              xMax: 5,
              yMin: 1,
              yMax: 6,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              label: {
                display: true,
                content: 'This is a long label - '.repeat(4),
                textWrap: true,
                color: ['green', 'white', 'blue']
              }
            },
            box2: {
              type: 'box',
              xMin: 2,
              xMax: 5,
              yMin: 10,
              yMax: 15,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              label: {
                display: true,
                content: ['No wrap!', 'This is a long label - '.repeat(4), 'No wrap!'],
                textWrap: true,
                color: ['blank', 'green', 'blue']
              }
            }
          }
        }
      }
    }
  }
};
