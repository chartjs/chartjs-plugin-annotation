module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'line',
    data: {
      labels: ['Data1', 'Data2', 'Data3', 'Data4'],
      datasets: [{
        data: [102, 200, 80, 55],
      }],
    },
    options: {
      events: [],
      scales: {
        x: {
          display: false
        },
        y: {
          display: false
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: [
            {
              type: 'doughnutLabel',
              font: [{size: 24}, {size: 18}, {size: 14}, {size: 20}],
              content: ['row1', 'row2', 'row3', 'row4']
            },
            {
              type: 'label',
              content: 'Normal label to show'
            }
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
