module.exports = {
  config: {
    type: 'line',
    options: {
      scales: {
        x: {type: 'linear', min: 0, max: 10},
        y: {type: 'linear', min: 0, max: 10}
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: [
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 8,
              yMax: 8,
              borderColor: 'blue',
              borderWidth: 4,
              borderShadowColor: 'black',
              shadowBlur: 12
            },
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 5,
              yMax: 5,
              borderColor: 'purple',
              borderWidth: 4,
              borderShadowColor: 'black',
              shadowBlur: 12,
              shadowOffsetX: 10
            },
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 2,
              yMax: 2,
              borderColor: 'red',
              borderWidth: 4,
              borderShadowColor: 'black',
              shadowBlur: 12,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            }
          ]
        }
      },
    }
  },
  options: {
    spriteText: true,
  }
};
