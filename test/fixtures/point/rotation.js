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
            dash: {
              type: 'point',
              xValue: -5,
              yValue: -5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 15,
              pointStyle: 'dash',
              radius: 7,
              rotation: 20
            },
            triangle: {
              type: 'point',
              xValue: 0,
              yValue: 0,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 5,
              pointStyle: 'triangle',
              radius: 50,
              rotation: 110
            },
            rectRounded: {
              type: 'point',
              xValue: 5,
              yValue: 5,
              backgroundColor: 'rgba(101, 33, 171, 0.5)',
              borderColor: 'rgb(101, 33, 171)',
              borderWidth: 15,
              pointStyle: 'rectRounded',
              radius: 50,
              rotation: 300
            }
          }
        }
      }
    }
  }
};
