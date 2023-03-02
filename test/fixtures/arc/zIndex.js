module.exports = {
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
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            arc1: {
              type: 'arc',
              xMin: 3,
              xMax: 7,
              yMin: 10,
              yMax: 15,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgb(255, 99, 132)',
              borderWidth: 1,
              radius: NaN,
              z: 10
            },
            label1: {
              type: 'label',
              xMin: 3,
              xMax: 7,
              yMin: 10,
              yMax: 15,
              content: 'arc1 z:+10',
              z: 10
            },
            arc2: {
              type: 'arc',
              xMin: 2,
              xMax: 7,
              yMin: 8,
              yMax: 20,
              backgroundColor: 'rgba(255, 199, 132, 0.5)',
              borderColor: 'rgba(255, 199, 132)',
              borderWidth: 1,
              radius: NaN,
            },
            label2: {
              type: 'label',
              xMin: 2,
              xMax: 7,
              yMin: 8,
              yMax: 20,
              content: 'arc2 z: 0',
              z: 1
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
