module.exports = {
  tolerance: 0.0315,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 10
        },
        y: {
          display: false,
          min: 0,
          max: 10
        }
      },
      plugins: {
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              xMin: 0.5,
              xMax: 9.5,
              yMin: 6.5,
              yMax: 9.5,
              backgroundColor: '#f5f5f5',
              borderColor: 'black',
              borderWidth: 1,
              label: {
                display: true,
                content: ['text stroke width 5', 'text stroke color red'],
                textStrokeWidth: 5,
                textStrokeColor: 'red',
                font: {
                  size: 40
                }
              }
            },
            box2: {
              type: 'box',
              xMin: 0.5,
              xMax: 9.5,
              yMin: 4,
              yMax: 6,
              backgroundColor: '#f5f5f5',
              borderColor: 'black',
              borderWidth: 1,
              label: {
                display: true,
                textStrokeWidth: 3,
                color: 'white',
                content: 'text stroke width 3',
                font: {
                  size: 30
                }
              }
            },
            box3: {
              type: 'box',
              xMin: 0.5,
              xMax: 9.5,
              yMin: 0.5,
              yMax: 3.5,
              backgroundColor: '#f5f5f5',
              borderColor: 'black',
              borderWidth: 1,
              label: {
                display: true,
                color: '#40E0D0',
                content: ['text stroke width 10', 'text stroke color turq'],
                textStrokeWidth: 10,
                textStrokeColor: 'black',
                font: {
                  size: 40
                }
              }
            }
          }
        }
      }
    }
  }
};
