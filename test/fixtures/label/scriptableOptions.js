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
              backgroundColor: () => 'transparent',
              borderWidth: () => 0,
              content: (ctx, opts) => 'xValue: ' + opts.xValue + ', position: ' + JSON.stringify(opts.position),
              position() {
                return {x: 'start'};
              }
            },
            text2: {
              type: 'label',
              xValue: 'April',
              yValue: 10,
              backgroundColor: () => 'transparent',
              borderWidth: () => 0,
              content: (ctx, opts) => 'xValue: ' + opts.xValue + ', position: ' + JSON.stringify(opts.position),
            },
            text3: {
              type: 'label',
              xValue: 'May',
              yValue: 15,
              backgroundColor: () => 'transparent',
              borderWidth: () => 0,
              content: (ctx, opts) => 'xValue: ' + opts.xValue + ', position: ' + JSON.stringify(opts.position),
              position() {
                return {x: 'end'};
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
