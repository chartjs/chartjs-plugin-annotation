module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: -10,
          max: 10
        },
        y: {
          display: false,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            circle: {
              type: 'arc',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              radius: 80
            },
            halfCircle: {
              type: 'arc',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              circumference: 180,
              radius: 80
            },
            OneThreeCircle: {
              type: 'arc',
              xValue: -5,
              yValue: 5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              circumference: 90,
              radius: 80
            },
            donut: {
              type: 'arc',
              xValue: 5,
              yValue: -5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              cutout: '50%',
              radius: 80
            }
          }
        }
      }
    }
  }
};
