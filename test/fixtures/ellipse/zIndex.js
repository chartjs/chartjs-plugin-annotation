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
            ellipse1: {
              type: 'ellipse',
              xMin: 3,
              xMax: 7,
              yMin: 1,
              yMax: 4,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'ellipse1 z:+10/z: 0',
                z: 0
              },
              z: 10
            },
            ellipse2: {
              type: 'ellipse',
              xMin: 1.5,
              xMax: 5.5,
              yMin: 15,
              yMax: 23.5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'ellipse2 fallback/z: +100',
                z: 100
              }
            },
            ellipse3: {
              type: 'ellipse',
              xMin: 2.5,
              xMax: 7,
              yMin: 16,
              yMax: 21,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'ellipse3 fallback/z: -1',
                z: -1
              }
            },
            ellipse4: {
              type: 'ellipse',
              xMin: 3,
              xMax: 7,
              yMin: 5,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'ellipse4 fallback/fallback',
              },
            },
            ellipse5: {
              type: 'ellipse',
              xMin: 1.5,
              xMax: 5.5,
              yMin: 10,
              yMax: 14.5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'ellipse5 z: +100/z: 0',
                position: 'start',
                z: 0
              },
              z: 100
            },
            ellipse6: {
              type: 'ellipse',
              xMin: 2.5,
              xMax: 4.5,
              yMin: 11,
              yMax: 13.5,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 1,
              label: {
                display: true,
                content: 'ellipse6 z: 0/fallback',
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
