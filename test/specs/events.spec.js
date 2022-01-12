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
          annotations: {
          }
        }
      }
    },
  };

  const pluginOpts = chartConfig.options.plugins.annotation.annotations;

  it('should not throw any exception', function() {
    const first = {
      type: 'box',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 1,
      yMin: 1,
      xMax: 3,
      yMax: 3
    };

    pluginOpts.first = first;

    const chart = window.acquireChart(chartConfig);
    const Annotation = window['chartjs-plugin-annotation'];
    const state = Annotation._getState(chart);

    expect(state.listened).toBe(false);
    expect(state.moveListened).toBe(false);

    const second = {
      type: 'box',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 4,
      yMin: 4,
      xMax: 6,
      yMax: 6,
      enter() {
      }
    };

    pluginOpts.second = second;
    chart.update();

    expect(state.listened).toBe(true);
    expect(state.moveListened).toBe(true);

    const third = {
      type: 'box',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 7,
      yMin: 7,
      xMax: 9,
      yMax: 9
    };

    pluginOpts.third = third;
    chart.update();

    expect(state.listened).toBe(true);
    expect(state.moveListened).toBe(true);

  });

});
