module.exports = {
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
          annotations: {
            triangle: {
              type: 'polygon',
              xValue: -6,
              yValue: -6,
              backgroundColor: 'rgba(255, 99, 132, 0.25',
              borderColor: 'black',
              borderDash: [2, 2],
              borderWidth: 6,
              radius: 50
            },
            pentagon: {
              type: 'polygon',
              xValue: 1,
              yValue: 1,
              sides: 5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderDash: [4, 4],
              borderWidth: 6,
              radius: 50
            },
            rhombus: {
              type: 'polygon',
              xValue: 6,
              yValue: 6,
              sides: 4,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderDash: [6, 6],
              borderWidth: 5,
              radius: 50
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
