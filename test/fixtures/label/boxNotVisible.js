module.exports = {
  tolerance: 0.0055,
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
            text1: {
              type: 'label',
              xValue: 'April',
              yValue: 4,
              content: 'no borderWidth, no backgroundColor'
            },
            text2: {
              type: 'label',
              xValue: 'April',
              yValue: 12,
              backgroundColor: 'missing',
              borderWidth: 0,
              content: ['borderWidth: 0, wrong backgroundColor', 'use default fill style: #000 (black)']
            },
            text3: {
              type: 'label',
              xValue: 'April',
              yValue: 20,
              backgroundColor: 'rgba(250,250,250,0)',
              borderWidth: 0,
              content: 'borderWidth: 0, backgroundColor: rgba(250,250,250,0)'
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
