module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'line',
    data: {
      datasets: [
        {
          borderWidth: 1,
          borderColor: 'red',
          data: [7, 7, 7, 7, 7, 7, 7]
        },
        {
          borderWidth: 1,
          borderColor: 'red',
          data: [16, 16, 16, 16, 16, 16, 16]
        }
      ]
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        x: {
          display: false,
          min: 0,
          max: 24
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            start: {
              type: 'label',
              yValue: 0.5,
              xValue: 7,
              content: 'position: {x: start}',
              position: {
                x: 'start'
              }
            },
            center: {
              type: 'label',
              yValue: 2,
              xValue: 7,
              content: 'position: {x: center}',
            },
            end: {
              type: 'label',
              yValue: 3.5,
              xValue: 7,
              content: 'position: {x: end}',
              position: {
                x: 'end'
              }
            },
            invalid: {
              type: 'label',
              yValue: 5,
              xValue: 7,
              content: 'position: {x: invalid}',
              position: {
                x: 'invalid'
              }
            },
            perc0: {
              type: 'label',
              yValue: 0.5,
              xValue: 16,
              content: 'position: {x: 0%}',
              position: {
                x: '0%'
              }
            },
            perc25: {
              type: 'label',
              yValue: 1.5,
              xValue: 16,
              content: 'position: {x: 25%}',
              position: {
                x: '25%'
              }
            },
            perc50: {
              type: 'label',
              yValue: 2.5,
              xValue: 16,
              content: 'position: {x: 50%}',
              position: {
                x: '50%'
              },
            },
            perc75: {
              type: 'label',
              yValue: 3.5,
              xValue: 16,
              content: 'position: {x: 75%}',
              position: {
                x: '75%'
              },
            },
            perc100: {
              type: 'label',
              yValue: 4.5,
              xValue: 16,
              content: 'position: {x: 100%}',
              position: {
                x: '100%'
              },
            },
            percMoreThan100: {
              type: 'label',
              yValue: 5.5,
              xValue: 16,
              content: 'position: {x: > 100%}',
              position: {
                x: '850%'
              },
            },
            percLessThan100: {
              type: 'label',
              yValue: 5,
              xValue: 16,
              content: 'position: {x: < 0%}',
              position: {
                x: '-850%'
              },
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
