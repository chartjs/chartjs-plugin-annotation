module.exports = {
  tolerance: 0.0075,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
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
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              label: {
                display: true,
                content: 'no offset'
              }
            },
            box2: {
              type: 'box',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              label: {
                display: true,
                content: 'offset x:10'
              }
            },
            box3: {
              type: 'box',
              xMin: 0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetY: 10,
              label: {
                display: true,
                content: 'offset y:10'
              }
            },
            box4: {
              type: 'box',
              xMin: 'June',
              xMax: 'July',
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10,
              label: {
                display: true,
                content: ['offset', 'x:10', 'y:10']
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
