describe('Label annotation', function() {
  describe('auto', jasmine.fixtures('label'));

  const options = {
    type: 'label',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xValue: 5,
    yValue: 5,
    content: 'This is my text',
    position: 'center',
    borderWidth: 1,
    padding: 6,
    xAdjust: 0,
    yAdjust: -100,
    callout: {
      enabled: false,
    },
    font: {}
  };

  window.testEvents(options);

  describe('events on label, triggered on borderWidth,', function() {

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
              label: {
                drawTime: 'afterDraw',
                type: 'label',
                xScaleID: 'x',
                yScaleID: 'y',
                xMin: 2,
                yMin: 2,
                xMax: 4,
                yMax: 4,
                content: 'This is my text',
                position: 'center',
                borderWidth: 10,
                backgroundColor: 'yellow',
                padding: 6,
                callout: {
                  enabled: false,
                },
                font: {}
              }
            }
          }
        }
      },
    };

    const labelOpts = chartConfig.options.plugins.annotation.annotations.label;
    /*
    it('should detect enter and leave events on the label', function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');

      labelOpts.enter = enterSpy;
      labelOpts.leave = leaveSpy;

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(2) - labelOpts.borderWidth / 2 + 1, y: yScale.getPixelForValue(2)};

      window.triggerMouseEvent(chart, 'mousemove', eventPoint);
      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(1);

        window.triggerMouseEvent(chart, 'mousemove', {
          x: 0,
          y: 0
        });

        window.afterEvent(chart, 'mousemove', function() {
          expect(leaveSpy.calls.count()).toBe(1);
          delete labelOpts.enter;
          delete labelOpts.leave;
          done();
        });
      });
    });
    */
    it('should detect click event on the label', function(done) {
      const clickSpy = jasmine.createSpy('click');

      labelOpts.click = clickSpy;

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(2) - labelOpts.borderWidth / 2 + 1, y: yScale.getPixelForValue(3)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(1);
        delete labelOpts.click;
        done();
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });
});
