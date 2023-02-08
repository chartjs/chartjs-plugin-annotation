const canvas = window.createCanvas();
canvas.style.opacity = 0.2;

module.exports = {
  config: {
    type: 'scatter',
    options: {
      scales: {
        x: {
          display: false,
          min: 0,
          max: 100
        },
        y: {
          display: false,
          min: 0,
          max: 100
        }
      },
      plugins: {
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              scaleID: 'y',
              value: 0,
              endValue: 80,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                borderDash: [6, 6],
                content: canvas,
                width: '25%',
                height: '25%',
                display: true
              },
            },
            line2: {
              type: 'line',
              scaleID: 'y',
              value: 20,
              endValue: 100,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                borderDash: [6, 6],
                content: canvas,
                opacity: 1,
                width: '25%',
                height: '25%',
                display: true
              },
            },
            line3: {
              type: 'line',
              scaleID: 'y',
              value: 40,
              endValue: 120,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                borderDash: [6, 6],
                content: canvas,
                opacity: 'mistake',
                width: '25%',
                height: '25%',
                display: true
              },
            },
            line4: {
              type: 'line',
              scaleID: 'y',
              value: 60,
              endValue: 140,
              borderColor: 'black',
              borderWidth: 5,
              label: {
                rotation: 'auto',
                backgroundColor: 'red',
                borderColor: 'black',
                borderRadius: 10,
                borderWidth: 3,
                borderDash: [6, 6],
                content: window.createCanvas,
                opacity: 100,
                width: '25%',
                height: '25%',
                display: true
              },
            },
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
