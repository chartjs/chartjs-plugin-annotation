module.exports = {
  tolerance: 0.0080,
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
          drawTime: 'afterDraw',
          annotations: {
            box1: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: 9,
              xMax: -1,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: 'p: 0.25-0.25',
                position: {
                  x: 0.25,
                  y: 0.25
                }
              }
            },
            box2: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: 9,
              xMax: 9,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: 'p: 25%-25%',
                position: {
                  x: '25%',
                  y: '25%'
                }
              }
            },
            box3: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: -1,
              xMax: -1,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: 'p: 0.50-0.75',
                position: {
                  x: 0.50,
                  y: 0.75
                }
              }
            },
            box4: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: -1,
              xMax: 9,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: 'p: 50%-75%',
                position: {
                  x: '50%',
                  y: '75%'
                }
              }
            },
          }
        }
      }
    }
  }
};
