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
            arrow: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderWidth: 0,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  fill: true,
                  length: 30,
                  width: 15
                },
                end: {
                  display: true,
                  fill: true,
                  length: 30,
                  width: 15
                }
              }
            },
            arrow1: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 90,
              yMin: 10,
              xMax: 80,
              yMax: 50,
              borderWidth: 0,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  fill: true,
                  backgroundColor: 'orange',
                  length: 30,
                  width: 15
                },
              }
            },
            arrow2: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 30,
              yMin: 80,
              xMax: 60,
              yMax: 85,
              borderWidth: 0,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                end: {
                  display: true,
                  fill: true,
                  backgroundColor: 'orange',
                  borderColor: 'orange',
                  length: 30,
                  width: 15
                },
              },
            },
            arrow3: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 65,
              yMin: 70,
              xMax: 70,
              yMax: 100,
              borderWidth: 0,
              label: {
                position: '100%',
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  borderDash: [3, 6],
                  borderDashOffset: 0,
                  fill: true,
                  backgroundColor: 'transparent',
                  length: 30,
                  width: 15
                },
              },
            },
            arrow4: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 10,
              yMin: 60,
              xMax: 30,
              yMax: 70,
              borderWidth: 0,
              label: {
                position: '0%',
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                end: {
                  display: true,
                  fill: true,
                  backgroundColor: 'transparent',
                  length: 40,
                  width: 30
                },
              },
            },
            arrow5: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 10,
              yMin: 30,
              xMax: 40,
              yMax: 50,
              borderWidth: 0,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 15,
                  width: 5,
                  fill: true,
                },
                end: {
                  display: true,
                  length: 15,
                  width: 5,
                  fill: true,
                  backgroundColor: 'orange',
                }
              }
            },
            arrow6: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 30,
              yMin: 8,
              xMax: 70,
              yMax: 8,
              borderWidth: 0,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 15,
                  width: 5,
                  fill: true,
                  backgroundColor: 'lightGreen',
                },
                end: {
                  display: true,
                  length: 15,
                  width: 5,
                  fill: true,
                  backgroundColor: 'blue',
                }
              }
            },
            arrow7: {
              type: 'line',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 10,
              yMin: 70,
              xMax: 10,
              yMax: 98,
              borderWidth: 0,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'only label',
                enabled: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 15,
                  width: 5,
                  fill: true,
                  backgroundColor: 'lightGreen',
                },
                end: {
                  display: true,
                  length: 15,
                  width: 5,
                  fill: true,
                  backgroundColor: 'transparent',
                }
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
