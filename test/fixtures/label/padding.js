function singleLine(ctx, opts) {
  return 'padding: ' + window.stringifyObject(opts.padding);
}

function multiLine(ctx, opts) {
  return ['padding: ' + window.stringifyObject(opts.padding), 'align: ' + opts.textAlign];
}

module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 10
        },
        y: {
          display: false,
          min: 0,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xValue: 5,
              yValue: 9,
              borderWidth: 3,
              borderColor: 'red',
              content: singleLine,
              padding: 15
            },
            text2: {
              type: 'label',
              xValue: 5,
              yValue: 8,
              borderWidth: 3,
              borderColor: 'red',
              content: singleLine,
              padding: {x: 15}
            },
            text3: {
              type: 'label',
              xValue: 5,
              yValue: 6.5,
              backgroundColor: 'transparent',
              borderWidth: 3,
              borderColor: 'red',
              content: singleLine,
              padding: {y: 30}
            },
            text4: {
              type: 'label',
              xValue: 5,
              yValue: 4.5,
              borderWidth: 3,
              borderColor: 'red',
              content: multiLine,
              textAlign: 'right',
              padding() {
                return {left: 40, top: 10, right: 5, bottom: 20};
              }
            },
            text5: {
              type: 'label',
              xValue: 5,
              yValue: 3,
              borderWidth: 3,
              borderColor: 'red',
              content: multiLine,
              textAlign: 'left',
              padding() {
                return {left: 40, top: 10, right: 5, bottom: 20};
              }
            },
            text6: {
              type: 'label',
              xValue: 5,
              yValue: 1,
              borderWidth: 3,
              borderColor: 'red',
              content: multiLine,
              padding() {
                return {left: 5, top: 10, right: 50, bottom: 30};
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
