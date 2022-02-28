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
            line1: {
              type: 'line',
              scaleID: 'y',
              value: 8,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                display: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderWidth: 1,
                color: 'black',
                content: ['text stroke width 5', 'text stroke color red'],
                textStrokeWidth: 5,
                textStrokeColor: 'red',
                font: {
                  size: 40
                }
              }
            },
            line2: {
              type: 'line',
              scaleID: 'y',
              value: 4.5,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                display: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderWidth: 1,
                textStrokeWidth: 3,
                color: 'white',
                content: 'text stroke width 3',
                font: {
                  size: 30
                }
              }
            },
            line3: {
              type: 'line',
              scaleID: 'y',
              value: 2,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                display: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderWidth: 1,
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
