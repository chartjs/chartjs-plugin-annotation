module.exports = { // Change window.__fixture to module.exports
  config: {
    type: 'line',
    data: {
      labels: [0, 1, 2, 3, 4],
      datasets: [{
        data: [1, 3, 2, 4, 3]
      }]
    },
    options: {
      responsive: false,
      animation: false,
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            tl: {
              type: 'label',
              xValue: 2,
              yValue: 4,
              content: 'topLeft',
              backgroundColor: 'rgba(0,0,0,0.06)',
              borderColor: 'black',
              borderWidth: 1,
              padding: 6,
              rotation: 45,
              rotationOrigin: 'topLeft'
            },
            c: {
              type: 'label',
              xValue: 2,
              yValue: 2.5,
              content: 'center',
              backgroundColor: 'rgba(0,0,0,0.06)',
              borderColor: 'black',
              borderWidth: 1,
              padding: 6,
              rotation: 45,
              rotationOrigin: 'center'
            },
            br: {
              type: 'label',
              xValue: 2,
              yValue: 1,
              content: 'bottomRight',
              backgroundColor: 'rgba(0,0,0,0.06)',
              borderColor: 'black',
              borderWidth: 1,
              padding: 6,
              rotation: 45,
              rotationOrigin: 'bottomRight'
            }
          }
        }
      },
      scales: {
        x: {type: 'category'},
        y: {beginAtZero: true, suggestedMax: 5}
      }
    }
  }
};