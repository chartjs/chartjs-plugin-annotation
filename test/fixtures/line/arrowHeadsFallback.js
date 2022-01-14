module.exports = {
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
                enabled: true,
                content: ['start and end are enabled', 'without options']
              },
              arrowHeads: {
                enabled: true,
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
                enabled: true,
                content: ['only start has options', 'and is enabled']
              },
              arrowHeads: {
                fill: true,
                borderColor: 'purple',
                length: 30,
                width: 15,
                start: {
                  enabled: true,
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
                enabled: true,
                content: ['only start has options', 'and is not filled']
              },
              arrowHeads: {
                enabled: true,
                fill: true,
                borderColor: 'red',
                length: 30,
                width: 15,
                start: {
                  enabled: true,
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
