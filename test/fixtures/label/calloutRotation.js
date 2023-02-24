module.exports = {
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          display: false,
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
              xValue: 'January',
              yValue: 15,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['This is the basic', 'callout representation', 'rotation: 101'],
              xAdjust: 150,
              yAdjust: -70,
              rotation: 101,
              callout: {
                display: true,
              }
            },
            overlap: {
              type: 'label',
              xValue: 'February',
              yValue: 8,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Callout is not shown', 'because overlaps the point', 'rotation: 199'],
              xAdjust: 1,
              yAdjust: 1,
              rotation: 199,
              callout: {
                display: true,
              }
            },
            crossLabel: {
              type: 'label',
              xValue: 'April',
              yValue: 17,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Callout is crossing the label', 'rotation: 32'],
              xAdjust: 100,
              yAdjust: -50,
              rotation: 32,
              callout: {
                display: true,
                position: 'right',
                side: 10
              }
            },
            styled: {
              type: 'label',
              xValue: 'April',
              yValue: 5,
              backgroundColor: 'rgba(33, 101, 171, 0.5)',
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 1,
              content: ['Callout borderColor: red', 'borderDash: [2, 3]', 'rotation: 310'],
              xAdjust: 150,
              yAdjust: -100,
              rotation: 310,
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
