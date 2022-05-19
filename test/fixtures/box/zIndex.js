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
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              xMin: 3,
              xMax: 7,
              yMin: 1,
              yMax: 4,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'box1 z:+10/z: 0',
                z: 0
              },
              z: 10
            },
            box2: {
              type: 'box',
              xMin: 1.5,
              xMax: 5.5,
              yMin: 15,
              yMax: 23.5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'box2 fallback/z: +100',
                z: 100
              }
            },
            box3: {
              type: 'box',
              xMin: 2.5,
              xMax: 7,
              yMin: 16,
              yMax: 21,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'box3 fallback/z: -1',
                z: -1
              }
            },
            box4: {
              type: 'box',
              xMin: 3,
              xMax: 7,
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'box4 fallback/fallback',
              },
            },
            box5: {
              type: 'box',
              xMin: 1.5,
              xMax: 5.5,
              yMin: 10,
              yMax: 14.5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'box5 z: +100/z: 0',
                position: 'start',
                z: 0
              },
              z: 100
            },
            box6: {
              type: 'box',
              xMin: 2.5,
              xMax: 4.5,
              yMin: 11,
              yMax: 13.5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'box6 z: 0/fallback',
              },
              z: 0
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
