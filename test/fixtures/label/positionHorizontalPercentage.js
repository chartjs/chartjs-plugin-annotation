module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'January',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {x: 25%}',
              position: {
                x: '25%',
                y: 'end'
              }
            },
            point1: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'January',
              yValue: 20,
              radius: 5,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: 50%',
              position: {
                x: '50%',
                y: 'end'
              },
            },
            point2: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'February',
              yValue: 10,
              radius: 5,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 20,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: {x: 75%}',
              position: {
                x: '75%',
                y: 'end'
              },
            },
            point3: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 20,
              radius: 5,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
            },
            text4: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 10,
              backgroundColor: 'transparent',
              borderWidth: 0,
              content: 'position: 10%',
              position: {
                x: '10%',
                y: 'end'
              },
            },
            point4: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 10,
              radius: 5,
              rotation: 90,
              borderColor: 'black',
              borderWidth: 3,
              pointStyle: 'line'
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
