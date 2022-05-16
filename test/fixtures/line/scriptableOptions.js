module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 100
        },
        y: {
          display: false,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          common: {
            drawTime() {
              return 'afterDatasetsDraw';
            }
          },
          annotations: {
            auto1: {
              type: 'line',
              scaleID() {
                return 'y';
              },
              value() {
                return 0;
              },
              endValue() {
                return 80;
              },
              borderColor() {
                return 'black';
              },
              borderWidth() {
                return 5;
              },
              label: {
                rotation: 'auto',
                position: 'start',
                backgroundColor: 'red',
                content: 'auto rotation',
                display: true
              },
            },
            auto2: {
              type: 'line',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return 90;
              },
              yMin() {
                return 10;
              },
              xMax() {
                return 80;
              },
              yMax() {
                return 50;
              },
              borderColor() {
                return 'black';
              },
              borderWidth() {
                return 5;
              },
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'auto rotation',
                display: true
              },
            },
            auto3: {
              type: 'line',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return 30;
              },
              yMin() {
                return 80;
              },
              xMax() {
                return 60;
              },
              yMax() {
                return 85;
              },
              borderColor() {
                return 'black';
              },
              borderWidth() {
                return 5;
              },
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'auto rotation',
                display: true
              },
            },
            auto4: {
              type: 'line',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return 65;
              },
              yMin() {
                return 70;
              },
              xMax() {
                return 70;
              },
              yMax() {
                return 100;
              },
              borderColor() {
                return 'black';
              },
              borderWidth() {
                return 5;
              },
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'auto rotation',
                display: true
              },
            },
            man1: {
              type: 'line',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return 10;
              },
              yMin() {
                return 60;
              },
              xMax() {
                return 30;
              },
              yMax() {
                return 70;
              },
              borderColor() {
                return 'black';
              },
              borderWidth() {
                return 5;
              },
              label: {
                rotation: 90,
                backgroundColor: 'red',
                content: 'rotated 90',
                display: true
              },
            },
            man2: {
              type: 'line',
              xScaleID() {
                return 'x';
              },
              yScaleID() {
                return 'y';
              },
              xMin() {
                return 10;
              },
              yMin() {
                return 30;
              },
              xMax() {
                return 40;
              },
              yMax() {
                return 50;
              },
              borderColor() {
                return 'black';
              },
              borderWidth() {
                return 5;
              },
              label: {
                rotation: -80,
                backgroundColor: 'red',
                content: 'rotated -80',
                display: true
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
