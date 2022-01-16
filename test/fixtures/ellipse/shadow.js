module.exports = {
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
              type: 'ellipse',
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10
            },
            box2: {
              type: 'ellipse',
              xMin: 'May',
              xMax: 'July',
              yMin: 11,
              yMax: 15,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 1,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetY: 10
            },
            box3: {
              type: 'ellipse',
              xMin: -0.5,
              xMax: 'May',
              yMin: 16,
              yMax: 20,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 1,
              backgroundShadowColor: 'black',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
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
