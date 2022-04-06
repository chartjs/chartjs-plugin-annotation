module.exports = {
  tolerance: 0.0020,
  config: {
    type: 'line',
    options: {
      scales: {
        x: {type: 'linear', min: 0, max: 10},
        y: {type: 'linear', min: 0, max: 10}
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: [
            {
              type: 'line',
              scaleID: 'y',
              value: 8,
              borderColor: 'blue',
              borderWidth: 4,
              label: {
                display: true,
                content: ['start and end are displayed', 'without options']
              },
              arrowHeads: {
                display: true,
                fill: true,
                borderColor: 'blue',
                length: 30,
                width: 15
              }
            },
            {
              type: 'line',
              scaleID: 'y',
              value: 5,
              borderColor: 'purple',
              borderWidth: 4,
              label: {
                display: true,
                content: ['only start has options', 'and is displayed']
              },
              arrowHeads: {
                fill: true,
                borderColor: 'purple',
                length: 30,
                width: 15,
                start: {
                  display: true,
                }
              }
            },
            {
              type: 'line',
              scaleID: 'y',
              value: 2,
              borderColor: 'red',
              borderWidth: 4,
              label: {
                display: true,
                content: ['only start has options', 'and is not filled']
              },
              arrowHeads: {
                display: true,
                fill: true,
                borderColor: 'red',
                length: 30,
                width: 15,
                start: {
                  display: true,
                  fill: false
                }
              }
            }
          ]
        }
      },
    }
  },
  options: {
    spriteText: true,
  }
};
