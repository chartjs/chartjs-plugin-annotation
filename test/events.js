const getDefaultEventPoint = (xScale, yScale, element) => element.getCenterPoint();
const getDefaultLeaveEventPoint = function() {
  return {x: 0, y: 0};
};

export function catchEnterEvent(options, position = 'center', getEventPoint = getDefaultEventPoint) {
  testEnterEvent(options, true, position, getEventPoint);
}

export function notCatchEnterEvent(options, position = 'center', getEventPoint = getDefaultLeaveEventPoint) {
  testEnterEvent(options, false, position, getEventPoint);
}

export function catchLeaveEvent(options, position = 'center', getEventPoint = getDefaultLeaveEventPoint) {
  testLeaveEvent(options, true, position, getEventPoint);
}

export function notCatchLeaveEvent(options, position = 'center', getEventPoint = getDefaultEventPoint) {
  testLeaveEvent(options, false, position, getEventPoint);
}

export function catchClickEvent(options, position = 'center', getEventPoint = getDefaultEventPoint) {
  testClickEvent(options, true, position, getEventPoint);
}

export function notCatchClickEvent(options, position = 'center', getEventPoint = getDefaultLeaveEventPoint) {
  testClickEvent(options, false, position, getEventPoint);
}

// TO BE REMOVED
export function testEvents(options, position = 'center', getEventPoint = getDefaultEventPoint) {
  const descr = options.type;
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

  describe('events', function() {
    const pluginOpts = chartConfig.options.plugins.annotation;

    it(`should not call removed hook on ${position} of the ${descr}`, function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');

      pluginOpts.enter = enterSpy;
      pluginOpts.leave = leaveSpy;
      pluginOpts.annotations = [options];

      const chart = window.acquireChart(chartConfig);
      pluginOpts.enter = undefined;
      chart.update();
      const eventPoint = retrieveEventPoint(chart, getEventPoint);

      window.triggerMouseEvent(chart, 'mousemove', eventPoint);
      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(0);

        window.triggerMouseEvent(chart, 'mousemove', {
          x: 0,
          y: 0
        });

        window.afterEvent(chart, 'mousemove', function() {
          expect(leaveSpy.calls.count()).toBe(1);
          delete pluginOpts.enter;
          delete pluginOpts.leave;
          done();
        });
      });
    });

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`should detect enter and leave events on ${position} of the ${descr}`, function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        targetOptions.enter = enterSpy;
        targetOptions.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        window.triggerMouseEvent(chart, 'mousemove', eventPoint);
        window.afterEvent(chart, 'mousemove', function() {
          expect(enterSpy.calls.count()).toBe(1);

          window.triggerMouseEvent(chart, 'mousemove', {
            x: 0,
            y: 0
          });

          window.afterEvent(chart, 'mousemove', function() {
            expect(leaveSpy.calls.count()).toBe(1);
            delete targetOptions.enter;
            delete targetOptions.leave;
            done();
          });
        });
      });

      it(`should detect click event on ${position} of the ${descr}`, function(done) {
        const clickSpy = jasmine.createSpy('click');

        targetOptions.click = clickSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete targetOptions.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });

      it(`should detect dbl click event on ${position} of the ${descr}`, function(done) {
        const dblClickSpy = jasmine.createSpy('dblclick');

        targetOptions.dblclick = dblClickSpy;
        pluginOpts.dblClickSpeed = 1000;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        let dblClick = false;
        window.afterEvent(chart, 'click', function() {
          if (!dblClick) {
            dblClick = true;
            window.triggerMouseEvent(chart, 'click', eventPoint);
          } else {
            expect(dblClickSpy.calls.count()).toBe(1);
            delete targetOptions.dblclick;
            delete pluginOpts.dblClickSpeed;
            done();
          }
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });

      it(`should detect a click event even if 2 clicks are fired on ${position} of the ${descr}`, function(done) {
        const dblClickSpy = jasmine.createSpy('dblclick');

        targetOptions.dblclick = dblClickSpy;
        pluginOpts.dblClickSpeed = 1;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        let dblClick = false;
        window.afterEvent(chart, 'click', function() {
          if (!dblClick) {
            dblClick = true;
            setTimeout(() => {
              window.triggerMouseEvent(chart, 'click', eventPoint);
            }, 50);
          } else {
            expect(dblClickSpy.calls.count()).toBe(0);
            delete targetOptions.dblclick;
            delete pluginOpts.dblClickSpeed;
            done();
          }
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });

      it(`should detect a property in the context, to check persistency, on ${position} of the ${descr}`, function(done) {
        targetOptions.enter = function(ctx) {
          ctx.persistency = true;
        };
        targetOptions.leave = function(ctx) {
          expect(ctx.persistency).toBe(true);
          done();
        };
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = retrieveEventPoint(chart, getEventPoint);

        window.triggerMouseEvent(chart, 'mousemove', eventPoint);
        window.afterEvent(chart, 'mousemove', function() {

          window.triggerMouseEvent(chart, 'mousemove', {
            x: 0,
            y: 0
          });

          window.afterEvent(chart, 'mousemove', function() {
            delete targetOptions.enter;
            delete targetOptions.leave;
          });
        });
      });
    });
  });
}
// END TO BE REMOVED

function testEnterEvent(options, toBe, position, getEventPoint) {
  const context = getTestCaseContext(options, toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect enter event on ${position} of the ${context.type}`, function(done) {
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
  const context = getTestCaseContext(options, toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect leave event on ${position} of the ${context.type}`, function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        targetOptions.enter = enterSpy;
        targetOptions.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(context.chartConfig);
        const eventPoint = retrieveEventPoint(chart, getDefaultEventPoint);

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
  const context = getTestCaseContext(options, toBe);

  describe('events', function() {
    const pluginOpts = context.chartConfig.options.plugins.annotation;

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`${context.description} detect click event on ${position} of the ${context.type}`, function(done) {
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

      it(`${context.description} detect dbl click event on ${position} of the ${context.type}`, function(done) {
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

function getTestCaseContext(options, toBe) {
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
    type: options.type,
    description: toBe ? 'should' : 'should not',
    compare: toBe + 0,
    chartConfig
  };
}
