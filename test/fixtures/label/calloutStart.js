module.exports = {
  tolerance: 0.0075,
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: true,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            text1: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 3.5,
              yValue: 20,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: bottom, start: 10%',
              position: {
                x: 'end',
                y: 'center'
              },
              xAdjust: -50,
              yAdjust: -50,
              callout: {
                enabled: true,
                start: '10%',
                position: 'bottom'
              }
            },
            text2: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 10,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: top, start: 80',
              position: {
                x: 'start',
                y: 'center'
              },
              xAdjust: 20,
              yAdjust: 50,
              callout: {
                enabled: true,
                start: 80,
                position: 'top'
              }
            },
            point2: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'May',
              yValue: 10,
              radius: 3
            },
            text3: {
              type: 'label',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'March',
              yValue: 12,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'position: center, start wrong',
              position: 'center',
              xAdjust: -70,
              yAdjust: 70,
              callout: {
                enabled: true,
                start: 'wrong'
              }
            },
            point3: {
              type: 'point',
              xScaleID: 'x',
              yScaleID: 'y',
              xValue: 'March',
              yValue: 12,
              radius: 3
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
