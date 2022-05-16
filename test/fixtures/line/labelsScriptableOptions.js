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
                rotation() {
                  return 'auto';
                },
                position() {
                  return 'start';
                },
                backgroundColor() {
                  return 'red';
                },
                content() {
                  return 'auto rotation';
                },
                display() {
                  return true;
                },
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
                rotation() {
                  return 'auto';
                },
                backgroundColor() {
                  return 'red';
                },
                content() {
                  return 'auto rotation';
                },
                display() {
                  return true;
                },
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
                rotation() {
                  return 'auto';
                },
                backgroundColor() {
                  return 'red';
                },
                content() {
                  return 'auto rotation';
                },
                display() {
                  return true;
                },
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
                rotation() {
                  return 'auto';
                },
                backgroundColor() {
                  return 'red';
                },
                content() {
                  return 'auto rotation';
                },
                display() {
                  return true;
                },
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
                rotation() {
                  return 90;
                },
                backgroundColor() {
                  return 'red';
                },
                content() {
                  return 'rotated 90';
                },
                display() {
                  return true;
                },
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
                rotation() {
                  return -80;
                },
                backgroundColor() {
                  return 'red';
                },
                content() {
                  return 'rotated -80';
                },
                display() {
                  return true;
                },
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
