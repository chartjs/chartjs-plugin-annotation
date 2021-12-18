module.exports = {
  config: {
    type: 'scatter',
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
                content: 'shows only label',
                enabled: true,
                padding: 10
              },
              beforeDraw: () => false
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
