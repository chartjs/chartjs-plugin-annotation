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
            l0: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '0%',
                backgroundColor: 'black',
                content: '0%',
                display: true
              }
            },
            l1: {
              type: 'line',
              scaleID: 'y',
              value: 10,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '10%',
                backgroundColor: 'black',
                content: '10%',
                display: true
              }
            },
            l2: {
              type: 'line',
              scaleID: 'y',
              value: 20,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '20%',
                backgroundColor: 'black',
                content: '20%',
                display: true
              }
            },
            l3: {
              type: 'line',
              scaleID: 'y',
              value: 30,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '30%',
                backgroundColor: 'black',
                content: '30%',
                display: true
              }
            },
            l4: {
              type: 'line',
              scaleID: 'y',
              value: 40,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '40%',
                backgroundColor: 'black',
                content: '40%',
                display: true
              }
            },
            l5: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '50%',
                backgroundColor: 'black',
                content: '50%',
                display: true
              }
            },
            l6: {
              type: 'line',
              scaleID: 'y',
              value: 60,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '60%',
                backgroundColor: 'black',
                content: '60%',
                display: true
              }
            },
            l7: {
              type: 'line',
              scaleID: 'y',
              value: 70,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '70%',
                backgroundColor: 'black',
                content: '70%',
                display: true
              }
            },
            l8: {
              type: 'line',
              scaleID: 'y',
              value: 80,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '80%',
                backgroundColor: 'black',
                content: '80%',
                display: true
              }
            },
            l9: {
              type: 'line',
              scaleID: 'y',
              value: 90,
              curve: true,
              controlPoint: {
                y: -50
              },
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: '90%',
                backgroundColor: 'black',
                content: '90%',
                display: true
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
