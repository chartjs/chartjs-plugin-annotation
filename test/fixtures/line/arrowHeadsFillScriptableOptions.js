module.exports = {
  config: {
    type: 'scatter',
    options: {
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
          annotations: {
            arrow: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'start: true, end: true',
                enabled: true
              },
              arrowHeads: {
                start: {
                  enabled: () => true,
                  fill: () => true,
                  length: () => 30,
                  width: () => 15
                },
                end: {
                  enabled: () => true,
                  fill: () => true,
                  length: () => 30,
                  width: () => 15
                }
              }
            },
            arrow1: {
              type: 'line',
              xMin: 90,
              yMin: 10,
              xMax: 80,
              yMax: 50,
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'start: true',
                enabled: true
              },
              arrowHeads: {
                start() {
                  return {
                    enabled: true,
                    fill: true,
                    backgroundColor: 'orange',
                    length: 30,
                    width: 15
                  };
                },
              }
            },
            arrow2: {
              type: 'line',
              xMin: 30,
              yMin: 80,
              xMax: 60,
              yMax: 85,
              borderWidth: 5,
              label: {
                position: '0%',
                rotation: 'auto',
                backgroundColor: 'red',
                content: 'end: true',
                enabled: true
              },
              arrowHeads: {
                end() {
                  return {
                    enabled: true,
                    fill: true,
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                    length: 30,
                    width: 15
                  };
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
