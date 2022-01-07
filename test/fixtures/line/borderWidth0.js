module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: 0,
          max: 100
        },
        y: {
          display: true,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          annotations: {
            line: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderWidth: 0
            },
            line1: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 90,
              yMin: 10,
              xMax: 80,
              yMax: 50,
              borderWidth: 0
            },
            line2: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 30,
              yMin: 80,
              xMax: 60,
              yMax: 85,
              borderWidth: 0
            },
            line3: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 65,
              yMin: 70,
              xMax: 70,
              yMax: 100,
              borderWidth: 0
            },
            line4: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 10,
              yMin: 60,
              xMax: 30,
              yMax: 70,
              borderWidth: 0
            },
            line5: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 10,
              yMin: 30,
              xMax: 40,
              yMax: 50,
              borderWidth: 0
            },
            line6: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 30,
              yMin: 8,
              xMax: 70,
              yMax: 8,
              borderWidth: 0
            },
            line7: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 10,
              yMin: 70,
              xMax: 10,
              yMax: 98,
              borderWidth: 0
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
