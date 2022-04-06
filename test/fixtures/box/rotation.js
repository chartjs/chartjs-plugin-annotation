module.exports = {
  tolerance: 0.0055,
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
            box45: {
              type: 'box',
              xMin: 1,
              xMax: 3,
              yMin: 6,
              yMax: 8,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              rotation: 45,
              label: {
                display: true,
                content: 'rot: 45'
              }
            },
            box90: {
              type: 'box',
              xMin: 4,
              xMax: 6,
              yMin: 6,
              yMax: 8,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              rotation: 90,
              label: {
                display: true,
                content: 'rot: 90'
              }
            },
            box135: {
              type: 'box',
              xMin: 7,
              xMax: 9,
              yMin: 6,
              yMax: 8,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              rotation: 135,
              label: {
                display: true,
                content: 'rot: 135'
              }
            },
            box180: {
              type: 'box',
              xMin: 0.5,
              xMax: 2.5,
              yMin: 2,
              yMax: 4,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              rotation: 180,
              label: {
                display: true,
                content: 'rot: 180'
              }
            },
            box225: {
              type: 'box',
              xMin: 3.5,
              xMax: 5.5,
              yMin: 1,
              yMax: 3,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              rotation: 225,
              label: {
                display: true,
                content: 'rot: 225'
              }
            },
            box270: {
              type: 'box',
              xMin: 5.5,
              xMax: 7.5,
              yMin: 3,
              yMax: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              rotation: 270,
              label: {
                display: true,
                content: 'rot: 270'
              }
            },
            box315: {
              type: 'box',
              xMin: 8,
              xMax: 9.5,
              yMin: 2,
              yMax: 4,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              rotation: 315,
              label: {
                display: true,
                content: 'rot: 315'
              }
            }
          }
        }
      }
    }
  }
};
