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
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            basic: {
              type: 'label',
              xValue: 'February',
              yValue: 20,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['This is the basic', 'callout representation'],
              xAdjust: 150,
              yAdjust: -70,
              callout: {
                display: true,
              }
            },
            overlap: {
              type: 'label',
              xValue: 'February',
              yValue: 15,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Callout is not shown', 'because overlaps the point'],
              xAdjust: 1,
              yAdjust: 1,
              callout: {
                display: true,
              }
            },
            crossLabel: {
              type: 'label',
              xValue: 'April',
              yValue: 15,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: 'Callout is crossing the label',
              xAdjust: 100,
              yAdjust: -50,
              callout: {
                display: true,
                position: 'right',
                side: 10
              }
            },
            styled: {
              type: 'label',
              xValue: 'March',
              yValue: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Callout borderColor: red', 'borderDash: [2, 3]'],
              xAdjust: 150,
              yAdjust: -100,
              callout: {
                display: true,
                side: 10,
                borderColor: 'red',
                borderWidth: 2,
                borderDash: [2, 3],
                borderDashOffset: 0
              }
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
