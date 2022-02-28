module.exports = {
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          display: false,
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
            without: {
              type: 'label',
              xValue: 'February',
              yValue: 12.5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['adjusted label', 'without callout'],
              xAdjust: 50,
              yAdjust: -100
            },
            display: {
              type: 'label',
              xValue: 'May',
              yValue: 12.5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['adjusted label', 'with callout'],
              xAdjust: 50,
              yAdjust: -100,
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
