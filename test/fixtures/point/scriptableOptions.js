module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: -10,
          max: 10
        },
        y: {
          display: false,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          drawTime: 'afterDraw',
          annotations: {
            point: {
              type: 'point',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xValue() {
                return 1;
              },
              yValue() {
                return 1;
              },
              backgroundColor() {
                return 'rgba(101, 33, 171, 0.5)';
              },
              borderColor() {
                return 'rgb(101, 33, 171)';
              },
              borderWidth() {
                return 15;
              },
              borderDash() {
                return [6, 6];
              },
              radius() {
                return 50;
              }
            }
          }
        }
      }
    }
  }
};
