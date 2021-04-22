module.exports = {
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            box1: {
              type: 'ellipse',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return 1.5;
              },
              xMax() {
                return 3.5;
              },
              yMin() {
                return 5;
              },
              yMax() {
                return 10;
              },
              backgroundColor() {
                return 'rgba(33, 101, 171, 0.5)';
              },
              borderColor() {
                return 'rgb(33, 101, 171)';
              },
              borderDash() {
                return [6, 6];
              },
              borderWidth() {
                return 5;
              },
            },
            box2: {
              type: 'ellipse',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return 'May';
              },
              xMax() {
                return 'July';
              },
              yMin() {
                return 11;
              },
              yMax() {
                return 15;
              },
              backgroundColor() {
                return 'rgba(101, 33, 171, 0.5)';
              },
              borderColor() {
                return 'rgb(101, 33, 171)';
              },
              borderDash() {
                return [6, 6];
              },
              borderWidth() {
                return 5;
              },
            },
            box3: {
              type: 'ellipse',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return -0.5;
              },
              xMax() {
                return 'May';
              },
              yMin() {
                return 16;
              },
              yMax() {
                return 20;
              },
              backgroundColor() {
                return 'rgba(101, 33, 171, 0.5)';
              },
              borderColor() {
                return 'rgb(101, 33, 171)';
              },
              borderDash() {
                return [6, 6];
              },
              borderWidth() {
                return 5;
              },
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
