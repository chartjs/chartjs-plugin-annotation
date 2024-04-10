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
      circumference: 145,
      rotation: 135,
      plugins: {
        legend: false,
        annotation: {
          annotations: [
            {
              type: 'doughnutLabel',
              backgroundColor: 'red',
              borderColor: 'black',
              borderWidth: 2,
              content: 't'
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
