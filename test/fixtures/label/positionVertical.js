module.exports = {
  tolerance: 0.0060,
  config: {
    type: 'line',
    data: {
      datasets: [
        {
          borderWidth: 1,
          borderColor: 'red',
          data: [8, 8, 8, 8, 8, 8, 8]
        },
        {
          borderWidth: 1,
          borderColor: 'red',
          data: [16, 16, 16, 16, 16, 16, 16]
        },
      ]
    },
    options: {
      scales: {
        x: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 24
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            center: {
              type: 'label',
              xValue: 0.5,
              yValue: 8,
              content: ['position', '{y: center}'],
              position: {
                y: 'center'
              }
            },
            start: {
              type: 'label',
              xValue: 2,
              yValue: 8,
              content: ['position', '{y: start}'],
              position: {
                y: 'start'
              }
            },
            end: {
              type: 'label',
              xValue: 3.5,
              yValue: 8,
              content: ['position', '{y: end}'],
              position: {
                y: 'end'
              }
            },
            invalid: {
              type: 'label',
              xValue: 5,
              yValue: 8,
              content: ['position', '{y: invalid}'],
              position: {
                y: 'invalid'
              }
            },
            perc0: {
              type: 'label',
              xValue: 0.3,
              yValue: 16,
              content: ['position', '{y: 0%}'],
              position: {
                y: '0%'
              }
            },
            perc25: {
              type: 'label',
              xValue: 1.3,
              yValue: 16,
              content: ['position', '{y: 25%}'],
              position: {
                y: '25%'
              }
            },
            perc50: {
              type: 'label',
              xValue: 2.3,
              yValue: 16,
              content: ['position', '{y: 50%}'],
              position: {
                y: '50%'
              },
            },
            perc75: {
              type: 'label',
              xValue: 3.3,
              yValue: 16,
              content: ['position', '{y: 75%}'],
              position: {
                y: '75%'
              },
            },
            perc100: {
              type: 'label',
              xValue: 4.3,
              yValue: 16,
              content: ['position', '{y: 100%}'],
              position: {
                y: '100%'
              },
            },
            percMoreThan100: {
              type: 'label',
              xValue: 5.5,
              yValue: 16,
              content: ['position', '{y: > 100%}'],
              position: {
                y: '850%'
              },
            },
            percLessThan100: {
              type: 'label',
              xValue: 5,
              yValue: 16,
              content: ['position', '{y: < 0%}'],
              position: {
                y: '-850%'
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
