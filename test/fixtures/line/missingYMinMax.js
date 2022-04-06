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
          display: true,
          stack: 'demo',
          stackWeight: 1,
          min: 0,
          max: 10
        },
        y2: {
          display: true,
          reverse: true,
          min: 0,
          max: 10,
          offset: true,
          position: 'left',
          stack: 'demo',
          stackWeight: 1,
        },
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            yMin: {
              type: 'line',
              borderWidth: 2,
              yMin: 3,
              label: {
                display: true,
                content: ['yMin: 3', 'yMax: scale.top'],
                backgroundColor: 'white',
                color: 'black'
              }
            },
            yMax: {
              type: 'line',
              borderWidth: 2,
              yMax: 5,
              label: {
                display: true,
                content: ['yMin: scale:bottom', 'yMax: 5'],
                backgroundColor: 'white',
                color: 'black'
              }
            },
            yMinReverse: {
              type: 'line',
              yScaleID: 'y2',
              borderWidth: 2,
              yMin: 3,
              label: {
                display: true,
                content: ['reverse', 'yMin: 3', 'yMax: scale.bottom'],
                backgroundColor: 'white',
                color: 'black'
              }
            },
            yMaxReverse: {
              type: 'line',
              yScaleID: 'y2',
              borderWidth: 2,
              yMax: 5,
              label: {
                display: true,
                content: ['reverse', 'yMin: scale:top', 'yMax: 5'],
                backgroundColor: 'white',
                color: 'black'
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
