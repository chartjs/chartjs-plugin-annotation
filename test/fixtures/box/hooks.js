module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10,
          ticks: {
            display: false
          }
        },
        y: {
          display: true,
          min: -10,
          max: 10,
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        legend: false,
        annotation: {
          drawTime: 'afterDraw',
          annotations: {
            box1: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: 9,
              xMax: -1,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + 10, element.y + 10, 10, 5, 3);
              }
            },
            box2: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: 9,
              xMax: 9,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: 'p: 25%,75%',
                position: {
                  x: '25%',
                  y: '75%'
                }
              },
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + element.width - 10, element.y + 10, 10, 5, 3);
              }
            },
            box3: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: -1,
              xMax: -1,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: 'p: 50%,50%',
                position: {
                  x: '50%',
                  y: '50%'
                }
              },
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + 10, element.y + element.height - 10, 10, 5, 3);
              }
            },
            box4: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: -1,
              xMax: 9,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              label: {
                enabled: true,
                content: 'p: 100%,0%',
                position: {
                  x: '100%',
                  y: '0%'
                }
              },
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + element.width - 10, element.y + element.height - 10, 10, 5, 3);
              }
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
