module.exports = {
  tolerance: 0.0150,
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
          annotations: {
            text1: {
              type: 'label',
              xValue: 'January',
              yValue: 20,
              color: ['red', 'green'],
              font: [{size: 24}, {size: 12}],
              content: ['font: [{size: 24}, {size: 12}]', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
              position: {
                x: 'start',
                y: 'center'
              },
              textAlign: 'start'
            },
            text2: {
              type: 'label',
              xValue: 'April',
              yValue: 10,
              color: ['red', 'green', 'blue'],
              font: [{size: 16, weight: 'bold'}, {size: 12}, {size: 8}],
              content: ['font: [{size: 24, weight: bold}, {size: 12}, {size: 8}]', 'This is my text, row 2, longer than other', 'This is my text, row 3'],
            },
            text3: {
              type: 'label',
              xValue: 'May',
              yValue: 15,
              color: ['blue', 'green', 'red'],
              font: [{size: 12}, {size: 20, family: 'courier'}],
              content: ['font: [{size: 12}, {size: 16, style: courier}],', 'This is my text, row 2'],
              position: {
                x: 'end'
              }
            },
          }
        }
      }
    }
  }
};
