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
          annotations: {
            pentagon: {
              type: 'polygon',
              xValue: 1,
              yValue: 1,
              sides: 5,
              backgroundColor: 'rgba(153, 153, 102, 0.5)',
              borderColor: 'rgb(153, 153, 102)',
              borderWidth: 3,
              radius: 50,
              backgroundShadowColor: 'black',
              borderShadowColor: 'orange',
              shadowBlur: 3,
              shadowOffsetX: 10,
              shadowOffsetY: 10
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
