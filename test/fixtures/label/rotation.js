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
          max: 10
        }
      },
      plugins: {
        annotation: {
          annotations: {
            label45: {
              type: 'label',
              content: 'rot: 45',
              xMin: 1,
              xMax: 3,
              yMin: 6,
              yMax: 8,
              rotation: 45
            },
            label90: {
              type: 'label',
              content: 'rot: 90',
              xMin: 4,
              xMax: 6,
              yMin: 6,
              yMax: 8,
              rotation: 90
            },
            label135: {
              type: 'label',
              content: 'rot: 135',
              xMin: 7,
              xMax: 9,
              yMin: 6,
              yMax: 8,
              rotation: 135
            },
            label180: {
              type: 'label',
              content: 'rot: 180',
              xMin: 0.5,
              xMax: 2.5,
              yMin: 2,
              yMax: 4,
              rotation: 180
            },
            label225: {
              type: 'label',
              content: 'rot: 225',
              xMin: 3.5,
              xMax: 5.5,
              yMin: 1,
              yMax: 3,
              rotation: 225
            },
            label270: {
              type: 'label',
              content: 'rot: 270',
              xMin: 5.5,
              xMax: 7.5,
              yMin: 3,
              yMax: 5,
              rotation: 270
            },
            label315: {
              type: 'label',
              content: 'rot: 315',
              xMin: 8,
              xMax: 9.5,
              yMin: 2,
              yMax: 4,
              rotation: 315
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
