module.exports = {
  config: {
    type: 'scatter',
    plugins: [{
      id: 'myplugin',
      afterAnnotationInit(chart, args) {
        const props = args.properties;
        props.x2 = chart.canvas.width;
        props.width = props.x2 - props.x;
      }
    }],
    options: {
      layout: {
        padding: {
          right: 80
        }
      },
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
          drawTime: 'afterDatasetsDraw',
          clip: false,
          annotations: {
            auto1: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                position: 'start',
                backgroundColor: 'red',
                content: 'init hook',
                enabled: true,
                padding: 10
              }
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
