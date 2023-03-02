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
          min: -4,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            arc: {
              type: 'arc',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 15,
              cutout: '50%',
              radius: 100
            }
          }
        }
      }
    }
  }
};
