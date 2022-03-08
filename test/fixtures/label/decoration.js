module.exports = {
  tolerance: 0.036,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 10
        },
        y: {
          display: false,
          min: 0,
          max: 10
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'label',
              xValue: 5,
              yValue: 8,
              borderWidth: 0,
              content: ['text stroke width 5', 'text stroke color red'],
              textStrokeWidth: 5,
              textStrokeColor: 'red',
              font: {
                size: 40
              }
            },
            {
              type: 'label',
              xValue: 5,
              yValue: 4.5,
              borderWidth: 0,
              textStrokeWidth: 3,
              color: 'white',
              content: 'text stroke width 3',
              font: {
                size: 30
              }
            },
            {
              type: 'label',
              xValue: 5,
              yValue: 2,
              borderWidth: 0,
              color: '#40E0D0',
              content: ['text stroke width 10', 'text stroke color turq'],
              textStrokeWidth: 10,
              textStrokeColor: 'black',
              font: {
                size: 40
              }
            }
          ]
        }
      }
    }
  }
};
