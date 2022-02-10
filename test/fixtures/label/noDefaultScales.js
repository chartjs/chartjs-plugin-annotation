module.exports = {
  config: {
    type: 'bar',
    data: {
      datasets: [{
        data: [0, 5, 10, 15, 20, 22]
      }]
    },
    options: {
      scales: {
        x1: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y1: {
          display: true
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            label1: {
              type: 'label',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing x and y scaleID options', 'located to', 'the center']
            },
            label2: {
              type: 'label',
              xValue: 'May',
              yValue: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Missing x and y scaleID options', 'located to', 'the center']
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
