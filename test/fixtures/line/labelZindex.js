module.exports = {
  config: {
    type: 'scatter',
    data: {
      datasets: [{
        backgroundColor: 'rgba(255,165,0,0.9)',
        radius: 20,
        data: [{x: 15, y: 25}, {x: 35, y: 50}, {x: 50, y: 95}, {x: 82, y: 75}, {x: 82, y: 5}]
      }]
    },
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
        legend: false,
        annotation: {
          common: {
            z: -10
          },
          annotations: {
            left: {
              type: 'line',
              scaleID: 'y',
              value: 25,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'left z: +10/undefined',
                display: true
              },
              z: 10
            },
            hCenter: {
              type: 'line',
              scaleID: 'y',
              value: 50,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'center',
                backgroundColor: 'red',
                content: 'hCenter z: -10/z: +10',
                display: true,
                z: 10
              },
              z: -10
            },
            right: {
              type: 'line',
              scaleID: 'y',
              value: 75,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                position: 'end',
                backgroundColor: 'green',
                content: 'right z: +10/z: -10',
                display: true,
                z: -10
              },
              z: 10
            },
            top: {
              type: 'line',
              scaleID: 'x',
              value: 50,
              borderColor: 'blue',
              borderWidth: 5,
              label: {
                position: 'start',
                backgroundColor: 'red',
                content: 'top fallback/fallback',
                display: true
              }
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
