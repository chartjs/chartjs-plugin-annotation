module.exports = {
  config: {
    type: 'scatter',
    options: {
      layout: {
        padding: {
          right: 80
        }
      },
      scales: {
        x: {
          display: true,
          min: 0,
          max: 100
        },
        y: {
          display: true,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          drawTime: 'afterDatasetsDraw',
          clip: false,
          annotations: {
            auto1: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              borderColor: 'black',
              borderWidth: 5,
              afterDraw(ctx) {
                const {chart, element} = ctx;
                window.drawStar(chart.ctx, element.x + 50, element.y, 20, 5, 2);
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
