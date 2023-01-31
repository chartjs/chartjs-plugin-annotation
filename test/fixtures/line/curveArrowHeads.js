module.exports = {
  config: {
    type: 'scatter',
    options: {
      layout: {
        padding: 20
      },
      scales: {
        x: {
          display: true,
          min: 0,
          max: 100,
          ticks: {
            display: false
          }
        },
        y: {
          display: true,
          min: 0,
          max: 100,
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        annotation: {
          clip: false,
          annotations: {
            arrow: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              curve: true,
              controlPoint: {
                y: -90
              },
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'start: true, end: true',
                display: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 30,
                  width: 15
                },
                end: {
                  display: true,
                  length: 30,
                  width: 15
                }
              }
            },
            arrow1: {
              type: 'line',
              xMin: 90,
              yMin: 10,
              xMax: 80,
              yMax: 50,
              curve: true,
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'start: true',
                display: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 30,
                  width: 15
                },
              }
            },
            arrow2: {
              type: 'line',
              xMin: 30,
              yMin: 80,
              xMax: 60,
              yMax: 85,
              curve: true,
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'end: true',
                display: true
              },
              arrowHeads: {
                end: {
                  display: true,
                  length: 30,
                  width: 15
                },
              },
            },
            arrow4: {
              type: 'line',
              xMin: 10,
              yMin: 60,
              xMax: 30,
              yMax: 70,
              curve: true,
              borderWidth: 5,
              label: {
                position: '0%',
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'end: width 30',
                display: true
              },
              arrowHeads: {
                end: {
                  display: true,
                  length: 40,
                  width: 30
                },
              },
            },
            arrow5: {
              type: 'line',
              xMin: 10,
              yMin: 30,
              xMax: 40,
              yMax: 50,
              curve: true,
              borderWidth: 0,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'borderWidth 0',
                display: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 15,
                  width: 5
                },
                end: {
                  display: true,
                  length: 15,
                  width: 5
                }
              }
            },
            arrow6: {
              type: 'line',
              xMin: 30,
              yMin: 8,
              xMax: 70,
              yMax: 8,
              curve: true,
              borderWidth: 1,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'horizontal',
                display: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 15,
                  width: 5
                },
                end: {
                  display: true,
                  length: 15,
                  width: 5
                }
              }
            },
            arrow7: {
              type: 'line',
              xMin: 10,
              yMin: 70,
              xMax: 10,
              yMax: 98,
              curve: true,
              borderWidth: 1,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'vertical',
                display: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  length: 15,
                  width: 5
                },
                end: {
                  display: true,
                  length: 15,
                  width: 5
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
