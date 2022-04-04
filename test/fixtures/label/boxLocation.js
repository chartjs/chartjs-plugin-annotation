module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          ticks: {
            display: false
          },
          min: -10,
          max: 10
        },
        y: {
          display: true,
          ticks: {
            display: false
          },
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            label1: {
              type: 'label',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['This is my text', 'and this is the second row of my text'],
              padding: {
                x: 10,
                y: 10
              },
              position: {
                y: 'end'
              }
            },
            point1: {
              type: 'point',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              radius: 10,
              backgroundColor: 'red',
              borderColor: 'black',
              borderWidth: 1
            },
            box1: {
              type: 'box',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              backgroundColor: 'transparent',
              borderColor: 'red',
              borderWidth: 1,
            },
            label2: {
              type: 'label',
              xMin: -8,
              yMin: -8,
              xMax: 1,
              yMax: 1,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['This is my text', 'and this is the second row of my text'],
              padding: {
                x: 10,
                y: 10
              },
              position: {
                y: 'end'
              },
            },
            point2: {
              type: 'point',
              xMin: -8,
              yMin: -8,
              xMax: 1,
              yMax: 1,
              radius: 10,
              backgroundColor: 'red',
              borderColor: 'black',
              borderWidth: 1
            },
            box2: {
              type: 'box',
              xMin: -8,
              yMin: -8,
              xMax: 1,
              yMax: 1,
              backgroundColor: 'transparent',
              borderColor: 'red',
              borderWidth: 1,
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
