module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {min: 0, max: 100},
        y: {min: 0, max: 100}
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            annotation1: {
              type: 'ellipse',
              backgroundColor: '#f00',
              borderColor: '#000',
              borderWidth: 1,
              rotation: -45,
              xMin: 0,
              xMax: 100,
              yMin: 40,
              yMax: 60,
            }
          }
        }
      },
    }
  },
  options: {
    spriteText: true,
  }
};
