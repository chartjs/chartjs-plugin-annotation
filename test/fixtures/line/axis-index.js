module.exports = {
  config: {
    type: 'line',
    data: {
      datasets: [{
        data: [10, 20, 30, 0, 55],
      }],
      labels: ['A', 'B', 'C', 'D', 'E']
    },
    options: {
      plugins: {
        legend: false,
        annotation: {
          annotations: {
            annotation1: {
              type: 'line',
              scaleID: 'y',
              borderWidth: 3,
              borderColor: 'black',
              value: (ctx) => {
                if (ctx.type === 'annotation') {
                  const scale = ctx.chart.scales.y;
                  if (scale.ticks && scale.ticks.length > 1) {
                    return scale.ticks[1].value;
                  }
                }
                return 0;
              },
            }
          }
        }
      },
    }
  },
  options: {
    spriteText: true,
    run(chart) {
      chart.hide(0);
      chart.show(0);
    }
  }
};
