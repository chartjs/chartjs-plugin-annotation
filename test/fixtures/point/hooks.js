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
            point1: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: 9,
              xMax: -1,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              radius: 50,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x, element.y, 10, 5, 3);
              }
            },
            point2: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: 9,
              xMax: 9,
              yMax: 1,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              radius: 50,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + 10, element.y + 10, 10, 5, 3);
              }
            },
            point3: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: -1,
              xMax: -1,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              radius: 50,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x - 10, element.y - 10, 10, 5, 3);
              }
            },
            point4: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: -1,
              xMax: 9,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              radius: 50,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + (element.width / 2), element.y + (element.height / 2), 10, 5, 3);
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
