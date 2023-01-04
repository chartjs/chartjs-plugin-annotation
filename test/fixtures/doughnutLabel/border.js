function content(ctx, opts) {
  return window.stringifyObject({dash: opts.borderDash, width: opts.borderWidth, radius: opts.borderRadius});
}

module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'doughnut',
    data: {
      labels: ['Data1', 'Data2', 'Data3', 'Data4'],
      datasets: [{
        data: [102, 200, 80, 55],
      }],
    },
    options: {
      events: [],
      plugins: {
        legend: false,
        annotation: {
          annotations: [
            {
              type: 'doughnutLabel',
              borderColor: 'red',
              borderWidth: 1,
              content
            },
          ]
        }
      }
    }
  },
  options: {
    canvas: {
      height: 256,
      width: 512
    }
  }
};
