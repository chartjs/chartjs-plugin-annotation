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
            star: {
              type: 'custom',
              xValue: 5,
              yValue: 5,
              draw(ctx, rect) {
                // https://stackoverflow.com/a/25840319
                function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
                  const step = Math.PI / spikes;
                  let rot = Math.PI / 2 * 3;
                  let x = cx;
                  let y = cy;

                  ctx.beginPath();
                  ctx.moveTo(cx, cy - outerRadius);
                  for (let i = 0; i < spikes; i++) {
                    x = cx + Math.cos(rot) * outerRadius;
                    y = cy + Math.sin(rot) * outerRadius;
                    ctx.lineTo(x, y);
                    rot += step;

                    x = cx + Math.cos(rot) * innerRadius;
                    y = cy + Math.sin(rot) * innerRadius;
                    ctx.lineTo(x, y);
                    rot += step;
                  }
                  ctx.lineTo(cx, cy - outerRadius);
                  ctx.closePath();
                  ctx.lineWidth = 5;
                  ctx.strokeStyle = 'blue';
                  ctx.stroke();
                  ctx.fillStyle = 'skyblue';
                  ctx.fill();
                }

                drawStar(rect.x, rect.y, 5, 30, 15);
              }
            }
          }
        }
      }
    }
  }
};
