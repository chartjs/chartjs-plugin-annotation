module.exports = {
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
                borderRadius: 0,
                borderWidth: 1,
                content: 'yAdjust: -40, callout position: auto',
                yAdjust: -40,
                callout: {
                  display: true
                }
              }
            },
            line2: {
              type: 'line',
              scaleID: 'y',
              value: 6,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                display: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderRadius: 0,
                borderWidth: 1,
                content: ['yAdjust: -40, xAdjust: -150', 'callout position: auto'],
                yAdjust: -40,
                xAdjust: -150,
                callout: {
                  display: true
                }
              }
            },
            line3: {
              type: 'line',
              scaleID: 'y',
              value: 4,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                display: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderRadius: 0,
                borderWidth: 1,
                content: ['yAdjust: 40, xAdjust: 150', 'callout position: auto'],
                yAdjust: 40,
                xAdjust: 150,
                callout: {
                  display: true
                }
              }
            },
            line4: {
              type: 'line',
              scaleID: 'y',
              value: 2,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                display: true,
                backgroundColor: '#f5f5f5',
                borderColor: 'black',
                borderRadius: 0,
                borderWidth: 1,
                content: 'yAdjust: 40, callout position: auto',
                yAdjust: 40,
                callout: {
                  display: true
                }
              }
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
