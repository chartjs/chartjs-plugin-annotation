module.exports = {
  config: {
    type: 'scatter',
    data: {
      datasets: [{
        borderColor: 'red',
        backgroundColor: 'black',
        radius: 5,
        data: [{x: 2, y: 2}, {x: 2, y: 8}, {x: 8, y: 2}, {x: 8, y: 8}]
      }]
    },
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 10,
        },
        y: {
          display: false,
          min: 0,
          max: 10,
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 5,
              content: '',
            }
          }
        }
      }
    }
  },
  options: {
    spriteText: true,
    canvas: {
      width: 256,
      height: 256
    }
  }
};
