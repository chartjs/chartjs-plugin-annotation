module.exports = {
  tolerance: 0.0075,
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
            missingBoth: {
              type: 'label',
              xScaleID: 'missingX',
              yScaleID: 'missingY',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing x and y scales', 'located to', 'the center']
            },
            missingX: {
              type: 'label',
              xScaleID: 'missing',
              xValue: 'February',
              yValue: 2,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing x scale', 'located to', 'horizontal center']
            },
            missingY: {
              type: 'label',
              yScaleID: 'missing',
              xValue: 0.5,
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing y scale', 'located to', 'vertical center']
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
