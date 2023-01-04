module.exports = {
  tolerance: 0.0060,
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
              content: ['row1', 'row2 with different length', 'row3', 'row4 with different length']
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
