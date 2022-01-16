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
      content: 'This is my label'
    }
  };

  window.testEvents(options);

  window.testEvents(options, 'labelRect');

  const optionsLimit = {
    type: 'line',
    id: 'test',
    xMin: 0,
    yMin: 2,
    xMax: 10,
    yMax: 2,
    borderWidth: 6,
    label: {
      enabled: true,
      content: 'This is my label'
    }
  };

  window.testEvents(optionsLimit);

  window.testEvents(optionsLimit, 'labelRect');

  describe('events on line label', function() {

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
                value: 5,
                borderWidth: 1,
                label: {
                  enabled: true,
                  content: 'This is my label'
                }
              }
            }
          }
        }
      },
    };

    const lineOpts = chartConfig.options.plugins.annotation.annotations.line;

    it('should detect enter and leave events only on the label', function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');

      lineOpts.enter = enterSpy;
      lineOpts.leave = leaveSpy;

      const chart = window.acquireChart(chartConfig);
      const x = chart.chartArea.width / 2;
      const yScale = chart.scales.y;
      const eventPoint = {x, y: yScale.getPixelForValue(lineOpts.value) + 10};

      window.triggerMouseEvent(chart, 'mousemove', eventPoint);
      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(1);

        window.triggerMouseEvent(chart, 'mousemove', {
          x: 0,
          y: 0
        });

        window.afterEvent(chart, 'mousemove', function() {
          expect(leaveSpy.calls.count()).toBe(1);
          delete lineOpts.enter;
          delete lineOpts.leave;
          done();
        });
      });
    });

    it('should detect click event only on the label', function(done) {
      const clickSpy = jasmine.createSpy('click');

      lineOpts.click = clickSpy;

      const chart = window.acquireChart(chartConfig);
      const x = chart.chartArea.width / 2;
      const yScale = chart.scales.y;
      const eventPoint = {x, y: yScale.getPixelForValue(lineOpts.value) + 10};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(1);
        delete lineOpts.click;
        done();
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });
  });

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
