function content(ctx, opts) {
  return window.stringifyObject({dash: opts.borderDash, width: opts.borderWidth, radius: opts.borderRadius});
}

module.exports = {
  tolerance: 0.01,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 2
        },
        y: {
          display: false,
          min: 0,
          max: 5
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'label',
              xValue: 1,
              yValue: 4,
              borderColor: 'red',
              borderDash: [6, 6],
              borderWidth: 5,
              content
            },
            {
              type: 'label',
              xValue: 1,
              yValue: 3,
              borderColor: 'red',
              borderRadius: {topLeft: 16, topRight: 8, bottomRight: 4},
              borderWidth: 3,
              content
            },
            {
              type: 'label',
              xValue: 1,
              yValue: 2,
              borderColor: 'red',
              borderDash: [2, 6, 16],
              borderWidth: 2,
              borderRadius: Infinity,
              content
            },
            {
              type: 'label',
              xValue: 1,
              yValue: 1,
              borderColor: 'red',
              borderWidth: 5,
              borderRadius: 4,
              content
            }
          ]
        }
      }
    }
  },
  options: {
    spriteText: true,
    canvas: {
      height: 256,
      width: 512
    }
  }
};
