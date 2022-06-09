module.exports = {
  tolerance: 0.0075,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          min: 0,
          max: 10
        },
        y: {
          min: 0,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            test1: {
              type: 'label',
              xValue: 2.5,
              yValue: 7.5,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 1,
              content: ['callout is', 'not drawn'],
              xAdjust: -10,
              yAdjust: 26,
              callout: {
                display: true,
                margin: 5,
              }
            },
            test2: {
              type: 'point',
              xValue: 2.5,
              yValue: 7.5,
              radius: 2,
              backgroundColor: 'red',
              borderColor: 'red'
            },
            test3: {
              type: 'label',
              xValue: 2.5,
              yValue: 2.5,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 1,
              content: ['callout is', 'not drawn'],
              xAdjust: -10,
              yAdjust: -26,
              callout: {
                display: true,
                margin: 5,
              }
            },
            test4: {
              type: 'point',
              xValue: 2.5,
              yValue: 2.5,
              radius: 2,
              backgroundColor: 'red',
              borderColor: 'red'
            },
            test5: {
              type: 'label',
              xValue: 7.5,
              yValue: 2.5,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 1,
              content: ['callout is', 'not drawn'],
              xAdjust: -44,
              callout: {
                display: true,
                margin: 5,
              }
            },
            test6: {
              type: 'point',
              xValue: 7.5,
              yValue: 2.5,
              radius: 2,
              backgroundColor: 'red',
              borderColor: 'red'
            },
            test7: {
              type: 'label',
              xValue: 7.5,
              yValue: 7.5,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 1,
              content: ['callout is', 'not drawn'],
              xAdjust: 44,
              callout: {
                display: true,
                margin: 5,
              }
            },
            test8: {
              type: 'point',
              xValue: 7.5,
              yValue: 7.5,
              radius: 2,
              backgroundColor: 'red',
              borderColor: 'red'
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
