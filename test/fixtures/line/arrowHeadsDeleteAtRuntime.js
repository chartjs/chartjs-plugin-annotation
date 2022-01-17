module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: 0,
          max: 10
        },
        y: {
          display: true,
          min: 0,
          max: 10
        }
      },
      plugins: {
        annotation: {
          annotations: [
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 8,
              yMax: 8,
              borderColor: 'blue',
              borderWidth: 4,
              label: {
                enabled: true,
                backgroundColor: 'white',
                content: 'remove start'
              },
              arrowHeads: {
                length: 30,
                width: 15,
                start: {
                  enabled: true,
                },
                end: {
                  enabled: true,
                }
              },
              click({chart, element}) {
                delete element.options.arrowHeads.start;
                chart.draw();
              }
            },
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 5,
              yMax: 5,
              borderColor: 'purple',
              borderWidth: 4,
              label: {
                enabled: true,
                backgroundColor: 'white',
                content: 'remove end'
              },
              arrowHeads: {
                length: 30,
                width: 15,
                start: {
                  enabled: true,
                },
                end: {
                  enabled: true,
                }
              },
              click({chart, element}) {
                delete element.options.arrowHeads.end;
                chart.draw();
              }
            },
            {
              type: 'line',
              xMin: 1,
              xMax: 8,
              yMin: 2,
              yMax: 2,
              borderColor: 'red',
              borderWidth: 4,
              label: {
                enabled: true,
                backgroundColor: 'white',
                content: 'remove start and end'
              },
              arrowHeads: {
                length: 30,
                width: 15,
                start: {
                  enabled: true,
                },
                end: {
                  enabled: true,
                }
              },
              click({chart, element}) {
                delete element.options.arrowHeads.start;
                delete element.options.arrowHeads.end;
                chart.draw();
              }
            }
          ]
        }
      }
    }
  },
  options: {
    spriteText: true,
    async run(chart) {
      const el0 = window['chartjs-plugin-annotation']._getState(chart).elements[0];
      await window.triggerMouseEvent(chart, 'click', el0.getCenterPoint());
      const el1 = window['chartjs-plugin-annotation']._getState(chart).elements[1];
      await window.triggerMouseEvent(chart, 'click', el1.getCenterPoint());
      const el2 = window['chartjs-plugin-annotation']._getState(chart).elements[2];
      await window.triggerMouseEvent(chart, 'click', el2.getCenterPoint());
    }
  }
};
