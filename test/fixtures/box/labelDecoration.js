module.exports = {
  tolerance: 0.0210,
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
                enabled: true,
                content: ['text stroke width 1', 'text stroke color red'],
                textStrokeWidth: 1,
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
              yMin: 2.5,
              yMax: 6,
              backgroundColor: '#f5f5f5',
              borderColor: 'black',
              borderWidth: 1,
              label: {
                enabled: true,
                textStrokeWidth: 2,
                color: 'white',
                content: 'text stroke width 2',
                font: {
                  size: 40
                },
                position: {
                  x: 'start',
                  y: 'start'
                }
              }
            },
            box3: {
              type: 'box',
              xMin: 0.5,
              xMax: 9.5,
              yMin: 0.5,
              yMax: 1.5,
              backgroundColor: '#f5f5f5',
              borderColor: 'black',
              borderWidth: 1,
              label: {
                enabled: true,
                content: 'normal',
                font: {
                  size: 40
                },
                position: {
                  x: 'end',
                  y: 'start'
                }
              }
            }
          }
        }
      }
    }
  }
};
