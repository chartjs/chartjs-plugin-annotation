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
            box1: {
              type: 'box',
              xMin: 1,
              xMax: 3,
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
            box2: {
              type: 'box',
              xMin: 4,
              xMax: 6,
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
            box3: {
              type: 'box',
              xMin: 7,
              xMax: 9,
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
            box4: {
              type: 'box',
              xMin: 1,
              xMax: 3,
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
            box5: {
              type: 'box',
              xMin: 4,
              xMax: 6,
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
            box6: {
              type: 'box',
              xMin: 7,
              xMax: 9,
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
            box7: {
              type: 'box',
              xMin: 1,
              xMax: 3,
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
            box8: {
              type: 'box',
              xMin: 4,
              xMax: 6,
              yMin: 3,
              yMax: 1,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              rotation: 45,
              label: {
                display: true,
                rotation: 0,
                content: ['box rot: 45', 'label rot: 0']
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
