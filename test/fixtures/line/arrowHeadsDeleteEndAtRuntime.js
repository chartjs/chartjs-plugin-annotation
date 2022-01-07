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
            line: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderColor: 'black',
              borderWidth: 3,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                borderColor: 'black',
                borderRadius: 10,
                content: 'arrow head end removed',
                enabled: true
              },
              arrowHeads: {
                start: {
                  display: true,
                  borderColor: 'black'
                },
                end: {
                  display: true,
                  borderColor: 'black'
                }
              },
              click({chart, element}) {
                delete element.options.arrowHeads.end;
                chart.draw();
              }
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true,
    async run(chart) {
      const el = window['chartjs-plugin-annotation']._getState(chart).elements[0];
      await window.triggerMouseEvent(chart, 'click', el.getCenterPoint());
    }
  }
};
