module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10
        },
        y: {
          display: true,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            arc1: {
              type: 'arc',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              xAdjust: 30,
              yAdjust: 40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center1: {
              type: 'label',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              content: 'x: +30, y: +40',
              position: 'start'
            },
            pointCenter1: {
              type: 'point',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              backgroundColor: 'black',
              radius: 3
            },
            arc2: {
              type: 'arc',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              xAdjust: 30,
              yAdjust: -40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center2: {
              type: 'label',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              content: 'x: +30, y: -40',
              position: {
                x: 'start',
                y: 'end'
              }
            },
            pointCenter2: {
              type: 'point',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              backgroundColor: 'black',
              radius: 3
            },
            arc3: {
              type: 'arc',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              xAdjust: -30,
              yAdjust: -40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              cutout: '50%',
              radius: NaN
            },
            center3: {
              type: 'label',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              content: 'x: -30, y: -40',
              position: 'end'
            },
            pointCenter3: {
              type: 'point',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              backgroundColor: 'black',
              radius: 3
            },
            arc4: {
              type: 'arc',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              xAdjust: -30,
              yAdjust: 40,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              cutout: '50%',
              radius: NaN
            },
            center4: {
              type: 'label',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              content: 'x: -30, y: +40',
              position: {
                x: 'end',
                y: 'start'
              }
            },
            pointCenter4: {
              type: 'point',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              backgroundColor: 'black',
              radius: 3
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
