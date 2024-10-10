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
              content: 'test',
              init: true
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
