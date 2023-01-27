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
            polygon1: {
              type: 'polygon',
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
              sides: 5,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.centerX - element.options.radius, element.y + element.options.radius, 10, 5, 3);
              }
            },
            polygon2: {
              type: 'polygon',
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
              sides: 8,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.centerX + element.options.radius, element.y + element.options.radius, 10, 5, 3);
              }
            },
            polygon3: {
              type: 'polygon',
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
              sides: 10,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x, element.y, 10, 5, 3);
              }
            },
            polygon4: {
              type: 'polygon',
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
                window.drawStar(chart.ctx, element.centerX, element.centerY, 10, 5, 3);
              }
            }
          }
        }
      }
    }
  }
};
