module.exports = {
  threshold: 0.2,
  tolerance: 0.0071,
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
              backgroundShadowColor: 'black',
              borderShadowColor: 'orange',
              shadowBlur: 3,
              shadowOffsetX: 10,
              content: ['This is my text', 'offset x: 10'],
              padding: {
                x: 10,
                y: 10
              },
              position: {
                y: 'end'
              }
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
              backgroundShadowColor: 'black',
              borderShadowColor: 'orange',
              shadowBlur: 3,
              shadowOffsetY: 10,
              content: ['This is my text', 'offset y: 10'],
              padding: {
                x: 10,
                y: 10
              },
              position: {
                y: 'end'
              },
            },
            label3: {
              type: 'label',
              xMin: -8,
              yMin: 8,
              xMax: -1,
              yMax: 1,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              backgroundShadowColor: 'black',
              borderShadowColor: 'orange',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10,
              content: ['This is my text', 'offset x: 10, y: 10'],
              padding: {
                x: 10,
                y: 10
              },
            }
          }
        }
      }
    }
  }
};
