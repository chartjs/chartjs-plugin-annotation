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
              xMin: 1,
              xMax: 9,
              yMin: 1,
              yMax: 9,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132)',
              borderWidth: 5,
              label: {
                display: false,
                content: 'This is dynamic!',
              },
              enter({element}) {
                element.label.options.display = true;
                return true;
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
      const el = window.getAnnotationElements(chart)[0];
      await window.triggerMouseEvent(chart, 'mousemove', el.getCenterPoint());
    }
  }
};
