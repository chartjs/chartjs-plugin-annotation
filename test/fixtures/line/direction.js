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
              xMin: 3,
              xMax: 5,
              yMin: 11,
              yMax: 8,
              borderColor: 'blue'
            },
            {
              type: 'line',
              xMin: 5,
              xMax: 5,
              yMin: 8,
              yMax: 11,
              borderColor: 'purple'
            },
            {
              type: 'line',
              xMin: 5,
              xMax: 7,
              yMin: 8,
              yMax: 11,
              borderColor: 'red'
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
