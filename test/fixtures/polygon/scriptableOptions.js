module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10
        },
        y: {
          display: true,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          drawTime: 'afterDraw',
          annotations: {
            triangle: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: -6,
              yValue: -6,
              backgroundColor: () => 'rgba(255, 99, 132, 0.25)',
              borderColor: () => 'black',
              borderWidth: () => 2,
              radius: () => 50
            },
            pentagon: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 1,
              yValue: 1,
              sides: () => 5,
              backgroundColor: () => 'rgba(101, 33, 171, 0.5)',
              borderColor: () => 'red',
              borderDash: () => [4, 4],
              borderWidth: () => 3,
              radius: () => 50
            },
            rhombus: {
              type: 'polygon',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 6,
              yValue: 6,
              sides: () => 4,
              backgroundColor: () => 'rgba(153, 153, 102, 0.5)',
              borderColor: () => 'green',
              borderWidth: () => 1,
              radius: () => 60
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
