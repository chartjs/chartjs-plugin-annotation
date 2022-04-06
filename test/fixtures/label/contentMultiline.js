module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xValue: 'January',
              yValue: 20,
              content: ['position: {x: start, y: center}, textAlign: start, xValue: January', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
              position: {
                x: 'start',
                y: 'center'
              },
              textAlign: 'start'
            },
            text2: {
              type: 'label',
              xValue: 'April',
              yValue: 10,
              content: ['position: center, textAlign: center, xValue: April', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
            },
            text3: {
              type: 'label',
              xValue: 'May',
              yValue: 15,
              content: ['position: {x: end}, xValue: May', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
              position: {
                x: 'end'
              }
            },
            noContent: {
              type: 'label',
              xValue: 'March',
              yValue: 5,
            },
            noContentAndCallout: {
              type: 'label',
              xValue: 'March',
              yValue: 5,
              callout: {
                display: true
              }
            },
            emptyContent: {
              type: 'label',
              xValue: 'March',
              yValue: 5,
              content: ''
            },
            emptyContentAndCallout: {
              type: 'label',
              xValue: 'March',
              yValue: 5,
              content: '',
              callout: {
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
