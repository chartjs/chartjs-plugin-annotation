module.exports = {
  tolerance: 0.0075,
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
            half: {
              type: 'arc',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              radius: 80,
              circumference: 180,
              cutout: '50%',
              rotation: -90
            },
            sector: {
              type: 'arc',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              circumference: 90,
              radius: 50,
              rotation: -45
            },
            gauge: {
              type: 'arc',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              circumference: 235,
              radius: 80,
              rotation: -135
            }
          }
        }
      }
    }
  }
};
