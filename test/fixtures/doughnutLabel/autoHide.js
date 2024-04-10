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
        annotation: {
          annotations: [
            {
              type: 'doughnutLabel',
              content: ['Must not be', 'visible'],
            },
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
    },
    run: (chart) => {
      return new Promise(resolve => {
        chart.hide(0, 0);
        chart.hide(0, 1);
        chart.hide(0, 2);
        chart.hide(0, 3);
        resolve();
      });
    }
  }
};
