module.exports = {
  tolerance: 0.0099,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'label',
              xValue: 3.5,
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderDash: [6, 6],
              borderWidth: 5,
              content: 'This is my text'
            },
            {
              type: 'label',
              xValue: 'February',
              yValue: 11,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderDash: [6, 6],
              borderWidth: 4,
              content: 'This is my text'
            },
            {
              type: 'label',
              xValue: 'July',
              yValue: 20,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderDash: [6, 6],
              borderWidth: 5,
              content: 'This is my text position: {x: end}',
              position: {
                x: 'end'
              }
            }
          ]
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
