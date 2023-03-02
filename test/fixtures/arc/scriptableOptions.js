module.exports = {
  tolerance: 0.0055,
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
          annotations: {
            arc1: {
              type: 'arc',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xValue() {
                return -5;
              },
              yValue() {
                return -5;
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
            },
            arc2: {
              type: 'arc',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xValue() {
                return 0;
              },
              yValue() {
                return 0;
              },
              backgroundColor() {
                return 'rgba(101, 33, 171, 0.5)';
              },
              borderColor() {
                return 'rgb(101, 33, 171)';
              },
              borderWidth() {
                return 3;
              },
              borderDash() {
                return [6, 6];
              },
              circumference() {
                return 180;
              },
              cutout() {
                return '50%';
              },
              radius() {
                return 50;
              },
              rotation() {
                return 45;
              },
            },
            arc3: {
              type: 'arc',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xValue() {
                return 5;
              },
              yValue() {
                return 5;
              },
              backgroundColor() {
                return 'rgba(101, 33, 171, 0.5)';
              },
              borderColor() {
                return 'rgb(101, 33, 171)';
              },
              borderWidth() {
                return 5;
              },
              borderDash() {
                return [6, 6];
              },
              cutout() {
                return 25;
              },
              radius() {
                return 50;
              },
              rotation() {
                return 20;
              },
            }
          }
        }
      }
    }
  }
};
