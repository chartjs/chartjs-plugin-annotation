module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 100
        },
        y: {
          display: false,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          annotations: {
            left: {
              type: 'line',
              scaleID: 'y',
              value: 25,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'no offset',
                display: true,
                backgroundShadowColor: 'black',
                shadowBlur: 12
              },
            },
            hCenter: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'center',
                backgroundColor: 'red',
                content: 'offset x: 10',
                display: true,
                backgroundShadowColor: 'black',
                shadowBlur: 3,
                shadowOffsetX: 10
              },
            },
            right: {
              type: 'line',
              scaleID: 'y',
              value: 75,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'end',
                backgroundColor: 'black',
                content: 'offset y: 10',
                display: true,
                backgroundShadowColor: 'black',
                shadowBlur: 3,
                shadowOffsetY: 10
              },
            },
            top: {
              type: 'line',
              scaleID: 'x',
              value: 50,
              borderColor: 'blue',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'offset x: 10, y:10',
                display: true,
                backgroundShadowColor: 'black',
                shadowBlur: 3,
                shadowOffsetX: 10,
                shadowOffsetY: 10
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
