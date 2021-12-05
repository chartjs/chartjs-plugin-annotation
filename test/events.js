export function testEvents(options, innerElement) {
  const descr = innerElement ? options.type + '.' + innerElement : options.type;
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

    [pluginOpts, options].forEach(function(targetOptions) {

      it(`should detect enter and leave events on ${descr}`, function(done) {
        const enterSpy = jasmine.createSpy('enter');
        const leaveSpy = jasmine.createSpy('leave');

        targetOptions.enter = enterSpy;
        targetOptions.leave = leaveSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = getEventPoint(chart, innerElement);

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

      it(`should detect click event on ${descr}`, function(done) {
        const clickSpy = jasmine.createSpy('click');

        targetOptions.click = clickSpy;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = getEventPoint(chart, innerElement);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete targetOptions.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });

      it(`should detect dbl click event on ${descr}`, function(done) {
        const dblClickSpy = jasmine.createSpy('dblclick');

        targetOptions.dblclick = dblClickSpy;
        pluginOpts.dblClickSpeed = 1000;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = getEventPoint(chart, innerElement);

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

      it(`should detect a click event even if 2 clicks are fired on ${descr}`, function(done) {
        const dblClickSpy = jasmine.createSpy('dblclick');

        targetOptions.dblclick = dblClickSpy;
        pluginOpts.dblClickSpeed = 1;
        pluginOpts.annotations = [options];

        const chart = window.acquireChart(chartConfig);
        const eventPoint = getEventPoint(chart, innerElement);

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

      if (!innerElement) {
        it(`should center point in range on ${descr}`, function() {
          pluginOpts.annotations = [options];
          const chart = window.acquireChart(chartConfig);
          const element = getElement(chart);
          const center = element.getCenterPoint();
          expect(element.inRange(center.x, center.y)).toBe(true);
        });

        it(`shouldn't center point plus adjustment in range on ${descr}`, function() {
          pluginOpts.annotations = [options];
          const chart = window.acquireChart(chartConfig);
          const element = getElement(chart);
          const center = element.getCenterPoint();
          expect(element.inRange(center.x + center.width, center.y)).toBe(false);
        });
      }
    });
  });
}

function getElement(chart) {
  const Annotation = window['chartjs-plugin-annotation'];
  const state = Annotation._getState(chart);
  return state.elements[0];
}

function getEventPoint(chart, innerElement) {
  const annotation = getElement(chart);
  const element = innerElement ? annotation[innerElement] : annotation;
  return innerElement ? element : element.getCenterPoint();
}
