module.exports = {
  tolerance: 0.0210,
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
              content: ['text stroke width 1', 'text stroke color red'],
              textStrokeWidth: 1,
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
              textStrokeWidth: 2,
              color: 'white',
              content: ['text stroke width 2'],
              font: {
                size: 40
              }
            },
            {
              type: 'label',
              xValue: 5,
              yValue: 2,
              borderWidth: 0,
              content: 'normal',
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
