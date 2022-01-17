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
              xValue: -8,
              yValue: 8,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 50%}',
              position: {
                x: 'start',
                y: '50%'
              }
            },
            point1: {
              type: 'point',
              xValue: -8,
              yValue: 8,
              radius: 20,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text2: {
              type: 'label',
              xValue: -4,
              yValue: 4,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 25%}',
              position: {
                x: 'start',
                y: '25%'
              }
            },
            point2: {
              type: 'point',
              xValue: -4,
              yValue: 4,
              radius: 20,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text3: {
              type: 'label',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 75%}',
              position: {
                x: 'start',
                y: '75%'
              }
            },
            point3: {
              type: 'point',
              xValue: 0,
              yValue: 0,
              radius: 20,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text4: {
              type: 'label',
              xValue: 4,
              yValue: -4,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 0%}',
              position: {
                x: 'end',
                y: '0%'
              },
            },
            point4: {
              type: 'point',
              xValue: 4,
              yValue: -4,
              radius: 20,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text5: {
              type: 'label',
              xValue: 8,
              yValue: -8,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: 100%}',
              position: {
                x: 'end',
                y: '100%'
              }
            },
            point5: {
              type: 'point',
              xValue: 8,
              yValue: -8,
              radius: 20,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text6: {
              type: 'label',
              xValue: -8,
              yValue: -6,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: > 100%}',
              position: {
                x: 'start',
                y: '850%'
              },
            },
            point6: {
              type: 'point',
              xValue: -8,
              yValue: -6,
              radius: 20,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text7: {
              type: 'label',
              xValue: 8,
              yValue: 8,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {y: < 0%}',
              position: {
                x: 'end',
                y: '-850%'
              }
            },
            point7: {
              type: 'point',
              xValue: 8,
              yValue: 8,
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
  },
  options: {
    spriteText: true
  }
};
