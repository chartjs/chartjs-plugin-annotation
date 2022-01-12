const getCenterPoint = (xScale, yScale, element) => element.getCenterPoint();
const getX0Y0Point = function() {
  return {
    x: 0,
    y: 0
  };
};

export function testCommonEvents(options, description = '(common test)') {
  describe(`${description}`, function() {
    window.catchEnterEvent(options, 'center');
    window.catchLeaveEvent(options, '{x: 0, y: 0}');
    window.catchClickEvent(options, 'center');
    window.notCatchEnterEvent(options, '{x: 0, y: 0}');
    window.notCatchLeaveEvent(options, 'center');
    window.notCatchClickEvent(options, '{x: 0, y: 0}');
  });
}

export function catchEnterEvent(options, position, getEventPoint = getCenterPoint) {
  testEnterEvent(options, 1, position, getEventPoint);
}

export function notCatchEnterEvent(options, position, getEventPoint = getX0Y0Point) {
  testEnterEvent(options, 0, position, getEventPoint);
}

export function catchLeaveEvent(options, position, getEventPoint = getX0Y0Point) {
  testLeaveEvent(options, 1, position, getEventPoint);
}

export function notCatchLeaveEvent(options, position, getEventPoint = getCenterPoint) {
  testLeaveEvent(options, 0, position, getEventPoint);
}

export function catchClickEvent(options, position, getEventPoint = getCenterPoint) {
  testClickEvent(options, 1, position, getEventPoint);
}

export function notCatchClickEvent(options, position, getEventPoint = getX0Y0Point) {
  testClickEvent(options, 0, position, getEventPoint);
}

function testEnterEvent(options, toBe, position, getEventPoint) {
  const context = getTestCaseContext(toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect enter event on ${position}`, function(done) {
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

function testLeaveEvent(options, toBe, position, getEventPoint) {
  const context = getTestCaseContext(toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect leave event on ${position}`, function(done) {
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
    });
  });
}

function testClickEvent(options, toBe, position, getEventPoint) {
  const context = getTestCaseContext(toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect click event on ${position}`, function(done) {
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

      it(`${context.description} detect dbl click event on ${position}`, function(done) {
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

function getElement(chart) {
  const Annotation = window['chartjs-plugin-annotation'];
  const state = Annotation._getState(chart);
  return state.elements[0];
}

function retrieveEventPoint(chart, getEventPoint) {
  const xScale = chart.scales.x;
  const yScale = chart.scales.y;
  return getEventPoint(xScale, yScale, getElement(chart));
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
