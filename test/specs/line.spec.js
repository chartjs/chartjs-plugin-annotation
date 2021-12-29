describe('Line annotation', function() {
  describe('auto', jasmine.fixtures('line'));

  const options = {
    type: 'line',
    id: 'test',
    scaleID: 'x',
    value: 2,
    borderWidth: 6,
    label: {
      enabled: true,
      content: 'This is my label',
      rotation: 0
    }
  };

  window.testEvents(options);

  window.testEvents(options, 'labelRect');

  const optionsLimit = {
    type: 'line',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 0,
    yMin: 2,
    xMax: 10,
    yMax: 2,
    borderWidth: 6,
    label: {
      enabled: true,
      content: 'This is my label',
      rotation: 0
    }
  };

  window.testEvents(optionsLimit);

  window.testEvents(optionsLimit, 'labelRect');

  describe('events on line with thickness', function() {

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
              line: {
                type: 'line',
                scaleID: 'y',
                value: 5
              }
            }
          }
        }
      },
    };

    const lineOpts = chartConfig.options.plugins.annotation.annotations.line;

    for (let i = 2; i <= 60; i++) {

      lineOpts.borderWidth = i;

      it('should detect click event, considering the tickness on bottom', function(done) {
        const clickSpy = jasmine.createSpy('click');

        lineOpts.click = clickSpy;

        const chart = window.acquireChart(chartConfig);
        const xScale = chart.scales.x;
        const yScale = chart.scales.y;
        const eventPoint = {x: xScale.getPixelForValue(5), y: yScale.getPixelForValue(lineOpts.value) + lineOpts.borderWidth / 2 - 1};

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete lineOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });

      it('should detect click event, considering the tickness on top', function(done) {
        const clickSpy = jasmine.createSpy('click');

        lineOpts.click = clickSpy;

        const chart = window.acquireChart(chartConfig);
        const xScale = chart.scales.x;
        const yScale = chart.scales.y;
        const eventPoint = {x: xScale.getPixelForValue(5), y: yScale.getPixelForValue(lineOpts.value) - lineOpts.borderWidth / 2 + 1};

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete lineOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });
    }
  });
});
