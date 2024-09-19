module.exports = {
  tolerance: 0.0055,
  config: {
    type: 'bar',
    data: {
      labels: ['a', 'b', 'c', 'd', 'e', 'f'],
      datasets: [{
        data: [0, 5, 10, 15, 20, 22],
        backgroundColor: 'gray'
      }, {
        data: [0, 5, 10, 15, 20, 22],
        backgroundColor: 'lightGray'
      }, {
        data: [0, 5, 10, 15, 20, 22],
        backgroundColor: 'lightGray'
      }]
    },
    options: {
      scales: {
        x: {
          display: false
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      animation: false,
      plugins: {
        legend: false,
        tooltip: false,
        annotation: {
          annotations: {
            beforeDraw: {
              type: 'box',
              drawTime: 'beforeDraw',
              xMin: 0.5,
              xMax: 1.5,
              yMin: 0.5,
              yMax: 4.5,
              backgroundColor: 'rgb(33, 101, 171)',
              label: {
                display: true,
                drawTime: 'afterDraw',
                content: 'beforeDraw'
              }
            },
            afterDraw: {
              type: 'box',
              drawTime: 'afterDraw',
              xMin: 1.5,
              xMax: 2.5,
              yMin: 5.5,
              yMax: 9.5,
              backgroundColor: 'rgb(33, 101, 171)',
              label: {
                display: true,
                drawTime: 'afterDraw',
                content: 'afterDraw'
              }
            },
            beforeDatasetsDraw: {
              type: 'box',
              drawTime: 'beforeDatasetsDraw',
              xMin: 2.5,
              xMax: 3.5,
              yMin: 10.5,
              yMax: 14.5,
              backgroundColor: 'rgb(33, 101, 171)',
              label: {
                display: true,
                drawTime: 'afterDraw',
                content: 'beforeDatasetsDraw'
              }
            },
            afterDatasetsDraw: {
              type: 'box',
              drawTime: 'afterDatasetsDraw',
              xMin: 3.5,
              xMax: 4.5,
              yMin: 15.5,
              yMax: 19.5,
              backgroundColor: 'rgb(33, 101, 171)',
              label: {
                display: true,
                drawTime: 'afterDraw',
                content: 'afterDatasetsDraw'
              }
            },
            dataset0: {
              type: 'box',
              drawTime: 0,
              xMin: 4.5,
              xMax: 5.5,
              yMin: 10.5,
              yMax: 14.5,
              backgroundColor: 'rgb(33, 101, 171)',
              label: {
                display: true,
                drawTime: 'afterDraw',
                content: ['dataset', 'index 0']
              }
            },
            dataset1: {
              type: 'box',
              drawTime: 1,
              xMin: 3.5,
              xMax: 4.5,
              yMin: 5.5,
              yMax: 9.5,
              backgroundColor: 'rgb(33, 101, 171)',
              label: {
                display: true,
                drawTime: 'afterDraw',
                content: ['dataset', 'index 1']
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
