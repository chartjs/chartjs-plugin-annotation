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
            box: {
              type: 'box',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              xMax: 9,
              yMin: 1,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                enabled: false,
                content: 'This is dynamic!',
              },
              enter({chart, element}) {
                element.options.label.enabled = true;
                chart.draw();
              }
            },
          }
        }
      }
    }
  },
  options: {
    canvas: {
      width: 256,
      height: 256
    },
    spriteText: true,
    async run(chart) {
      const el = window['chartjs-plugin-annotation']._getState(chart).elements[0];
      await window.triggerMouseEvent(chart, 'mousemove', el.getCenterPoint());
    }
  }
};
