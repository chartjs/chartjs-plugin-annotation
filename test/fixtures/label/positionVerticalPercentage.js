module.exports = {
  tolerance: 0.0060,
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
            text1: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -8,
              yValue: 8,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 0.5}',
              position: {
                x: 'start',
                y: 0.5
              },
              point: {
                enabled: true,
                radius: 20,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -4,
              yValue: 4,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 0.25}',
              position: {
                x: 'start',
                y: 0.25
              },
              point: {
                enabled: true,
                radius: 20,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 0.75}',
              position: {
                x: 'start',
                y: 0.75
              },
              point: {
                enabled: true,
                radius: 20,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text4: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 4,
              yValue: -4,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 0}',
              position: {
                x: 'end',
                y: 0
              },
              point: {
                enabled: true,
                radius: 20,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text5: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 8,
              yValue: -8,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 1}',
              position: {
                x: 'end',
                y: 1
              },
              point: {
                enabled: true,
                radius: 20,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text6: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -8,
              yValue: -6,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: > 1}',
              position: {
                x: 'start',
                y: 10
              },
              point: {
                enabled: true,
                radius: 20,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
              }
            },
            text7: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 8,
              yValue: 8,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: < 0}',
              position: {
                x: 'end',
                y: -10
              },
              point: {
                enabled: true,
                radius: 20,
                rotation: 90,
                borderColor: 'black',
                borderWidth: 3,
                pointStyle: 'line'
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