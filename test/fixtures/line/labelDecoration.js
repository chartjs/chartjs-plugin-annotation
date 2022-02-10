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
            line1: {
              type: 'line',
              scaleID: 'y',
              value: 8,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                enabled: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderWidth: 1,
                color: 'black',
                content: ['text stroke width 1', 'text stroke color red'],
                textStrokeWidth: 1,
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
                enabled: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderWidth: 1,
                textStrokeWidth: 2,
                color: 'white',
                content: 'text stroke width 2',
                font: {
                  size: 40
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
                enabled: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderWidth: 1,
                color: 'black',
                content: 'normal',
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
