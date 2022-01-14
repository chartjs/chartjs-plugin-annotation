describe('Events listeners state', function() {

  const chartConfig = {
    type: 'scatter',
    options: {
      animation: false,
      scales: {
        x: {
          display: false,
          min: 0,
          max: 10
        },
        y: {
          display: false,
          min: 0,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations: [
            {
              type: 'line',
              scaleID: 'y',
              value: 3
            },
            {
              type: 'line',
              scaleID: 'y',
              value: 3,
              enter: () => true
            },
            {
              type: 'line',
              scaleID: 'y',
              value: 3
            }
          ]
        }
      }
    },
  };

  it('should not throw any exception', function() {

    const chart = window.acquireChart(chartConfig);
    const Annotation = window['chartjs-plugin-annotation'];
    const state = Annotation._getState(chart);

    expect(state.listened).toBe(true);
    expect(state.moveListened).toBe(true);

  });

});
