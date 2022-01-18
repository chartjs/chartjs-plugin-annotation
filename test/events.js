const getCenterPoint = (xScale, yScale, element) => element.getCenterPoint();

export function testEvents(options, eventIn, eventOut) {
  testEnterEvent(options, 1, eventIn);
  testLeaveEvent(options, 1, eventOut);
  testClickEvent(options, 1, eventIn);
  testEnterEvent(options, 0, eventOut);
  testLeaveEvent(options, 0, eventIn);
  testClickEvent(options, 0, eventOut);
}

function testEnterEvent(options, toBe, getEventPoint) {
  const context = getTestCaseContext(toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect enter event`, function(done) {
        const enterSpy = jasmine.createSpy('enter');

        targetOptions.enter = enterSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(context.chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        window.triggerMouseEvent(chart, 'mousemove', eventPoint);
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(context.compare);
          delete targetOptions.enter;
          done();
        });
      });
    });
  });
}

function testLeaveEvent(options, toBe, getEventPoint) {
  const context = getTestCaseContext(toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect leave event`, function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        targetOptions.enter = enterSpy;
        targetOptions.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(context.chartConfig);
        const eventPoint = retrieveEventPoint(chart, getCenterPoint);

        window.triggerMouseEvent(chart, 'mousemove', eventPoint);
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(1);

          window.triggerMouseEvent(chart, 'mousemove', retrieveEventPoint(chart, getEventPoint));

          window.afterEvent(chart, 'mousemove', function() {
            expect(leaveSpy.calls.count()).toBe(context.compare);
            delete targetOptions.enter;
            delete targetOptions.leave;
            done();
          });
        });
      });

      it(`${context.description} detect leave (by mouseout) events`, function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        targetOptions.enter = enterSpy;
        targetOptions.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(context.chartConfig);
        const eventPoint = retrieveEventPoint(chart, getCenterPoint);

        window.triggerMouseEvent(chart, 'mousemove', eventPoint);
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(1);

          window.triggerMouseEvent(chart, 'mouseout', retrieveEventPoint(chart, getEventPoint));

          window.afterEvent(chart, 'mouseout', function() {
            expect(leaveSpy.calls.count()).toBe(1);
            delete targetOptions.enter;
            delete targetOptions.leave;
            done();
          });
        });
      });
    });
  });
}

function testClickEvent(options, toBe, getEventPoint) {
  const context = getTestCaseContext(toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect click event`, function(done) {
        const clickSpy = jasmine.createSpy('click');

        targetOptions.click = clickSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(context.chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(context.compare);
          delete targetOptions.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });

      it(`${context.description} detect dbl click event`, function(done) {
        const dblClickSpy = jasmine.createSpy('dblclick');

        targetOptions.dblclick = dblClickSpy;
        pluginOpts.dblClickSpeed = 1000;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(context.chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        let dblClick = false;
        window.afterEvent(chart, 'click', function() {
          if (!dblClick) {
            dblClick = true;
            window.triggerMouseEvent(chart, 'click', eventPoint);
          } else {
            expect(dblClickSpy.calls.count()).toBe(context.compare);
            delete targetOptions.dblclick;
            delete pluginOpts.dblClickSpeed;
            done();
          }
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });
    });
  });
}

function retrieveEventPoint(chart, getEventPoint) {
  const xScale = chart.scales.x;
  const yScale = chart.scales.y;
  return getEventPoint(xScale, yScale, window.getAnnotationElements(chart)[0]);
}

function getTestCaseContext(toBe) {
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
        }
      }
    },
  };
  return {
    description: toBe ? 'should' : 'should not',
    compare: toBe,
    chartConfig
  };

}
