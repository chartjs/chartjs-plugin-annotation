module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10
        },
        y: {
          display: true,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            triangle1: {
              type: 'polygon',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: 10
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
            triangle2: {
              type: 'polygon',
              xMin: -8,
              yMin: -8,
              xMax: 1,
              yMax: 1,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: 130
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
