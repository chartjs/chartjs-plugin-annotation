module.exports = {
  config: {
    type: 'scatter',
    options: {
      layout: {
        padding: {
          right: 50,
          left: 50
        }
      },
      scales: {
        x: {
          display: true,
          min: 0,
          max: 100,
          ticks: {
            display: false
          }
        },
        y: {
          display: true,
          min: 0,
          max: 100,
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        annotation: {
          clip: false,
          annotations: {
            line1: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                borderRadius: 10,
                borderWidth: 3,
                content: 'afterDraw hook',
                display: true
              },
              afterDraw(context) {
                const ctx = context.chart.ctx;
                const {x, y, x2, y2, options} = context.element;
                ctx.save();
                ctx.lineWidth = options.borderWidth;
                ctx.strokeStyle = options.borderColor;
                ctx.setLineDash([6, 6]);
                ctx.lineDashOffset = options.borderDashOffset;
                ctx.beginPath();
                ctx.moveTo(x - 50, y);
                ctx.lineTo(x, y);
                ctx.moveTo(x2, y2);
                ctx.lineTo(x2 + 50, y);
                ctx.stroke();
                ctx.restore();
              }
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
