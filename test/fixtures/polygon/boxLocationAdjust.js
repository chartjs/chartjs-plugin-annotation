module.exports = {
  tolerance: 0.0085,
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
          drawTime: 'afterDraw',
          annotations: {
            polygon1: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              xAdjust: 30,
              yAdjust: 40,
              sides: 8,
              rotation: 22.5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center1: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: 1,
              xMax: 8,
              yMax: 8,
              content: 'x: +30, y: +40',
              position: 'start',
              point: {
                enabled: true,
                backgroundColor: 'black'
              }
            },
            polygon2: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              xAdjust: 30,
              yAdjust: -40,
              sides: 8,
              rotation: 22.5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -1,
              yMin: 1,
              xMax: -8,
              yMax: 8,
              content: 'x: +30, y: -40',
              position: {
                x: 'start',
                y: 'end'
              },
              point: {
                enabled: true,
                backgroundColor: 'black'
              }
            },
            polygon3: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              xAdjust: -30,
              yAdjust: -40,
              sides: 8,
              rotation: 22.5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -1,
              yMin: -1,
              xMax: -8,
              yMax: -8,
              content: 'x: -30, y: -40',
              position: 'end',
              point: {
                enabled: true,
                backgroundColor: 'black'
              }
            },
            polygon4: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              xAdjust: -30,
              yAdjust: 40,
              sides: 8,
              rotation: 22.5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 2,
              radius: NaN
            },
            center4: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: -1,
              xMax: 8,
              yMax: -8,
              content: 'x: -30, y: +40',
              position: {
                x: 'end',
                y: 'start'
              },
              point: {
                enabled: true,
                backgroundColor: 'black'
              }
            },
          }
        }
      }
    }
  }
};
