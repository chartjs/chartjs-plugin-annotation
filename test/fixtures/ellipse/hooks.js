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
            ellipse1: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: 7,
              xMax: -2,
              yMax: 3,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + 10, element.y + 10, 10, 5, 3);
              }
            },
            ellipse2: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: 7,
              xMax: 9,
              yMax: 3,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + element.width - 10, element.y + 10, 10, 5, 3);
              }
            },
            ellipse3: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: -7,
              xMax: -1,
              yMax: -3,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              rotation: 45,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + 10, element.y + element.height - 10, 10, 5, 3);
              }
            },
            ellipse4: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: -1,
              xMax: 9,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
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
