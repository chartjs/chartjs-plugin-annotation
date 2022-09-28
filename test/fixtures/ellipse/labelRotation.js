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
            ellipse1: {
              type: 'ellipse',
              xMin: 1,
              xMax: 4,
              yMin: 9,
              yMax: 7,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                rotation: 45,
                content: 'rotation: 45',
              }
            },
            ellipse2: {
              type: 'ellipse',
              xMin: 4,
              xMax: 7,
              yMin: 9,
              yMax: 7,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                rotation: 90,
                content: 'rotation: 90',
              }
            },
            ellipse3: {
              type: 'ellipse',
              xMin: 7,
              xMax: 10,
              yMin: 9,
              yMax: 7,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                rotation: 135,
                content: 'rotation: 135',
              }
            },
            ellipse4: {
              type: 'ellipse',
              xMin: 1,
              xMax: 4,
              yMin: 6,
              yMax: 4,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                rotation: 180,
                content: 'rotation: 180',
              }
            },
            ellipse5: {
              type: 'ellipse',
              xMin: 4,
              xMax: 7,
              yMin: 6,
              yMax: 4,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                rotation: 225,
                content: 'rotation: 225',
              }
            },
            ellipse6: {
              type: 'ellipse',
              xMin: 7,
              xMax: 10,
              yMin: 6,
              yMax: 4,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                rotation: 270,
                content: 'rotation: 270',
              }
            },
            ellipse7: {
              type: 'ellipse',
              xMin: 1,
              xMax: 4,
              yMin: 3,
              yMax: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              label: {
                display: true,
                rotation: 315,
                content: 'rotation: 315',
              }
            },
            ellipse8: {
              type: 'ellipse',
              xMin: 4,
              xMax: 7,
              yMin: 3,
              yMax: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              rotation: 45,
              label: {
                display: true,
                rotation: 0,
                content: ['ellipse rot: 45', 'label rot: 0']
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
