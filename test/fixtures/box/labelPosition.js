module.exports = {
  tolerance: 0.0085,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10
        },
        y: {
          display: true,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              xMin: -9,
              yMin: 9,
              xMax: -1,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                display: true,
                content: 'p: 0%,100%',
                position: {
                  x: '0%',
                  y: '100%'
                }
              }
            },
            box2: {
              type: 'box',
              xMin: 1,
              yMin: 9,
              xMax: 9,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                display: true,
                content: 'p: 25%,75%',
                position: {
                  x: '25%',
                  y: '75%'
                }
              }
            },
            box3: {
              type: 'box',
              xMin: -9,
              yMin: -1,
              xMax: -1,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                display: true,
                content: 'p: 50%,50%',
                position: {
                  x: '50%',
                  y: '50%'
                }
              }
            },
            box4: {
              type: 'box',
              xMin: 1,
              yMin: -1,
              xMax: 9,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                display: true,
                content: 'p: 100%,0%',
                position: {
                  x: '100%',
                  y: '0%'
                }
              }
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
