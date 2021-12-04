const annotationTypes = ['box', 'ellipse', 'label', 'line', 'point', 'polygon'];

export function testEvents(options, innerElement) {
  if (!annotationTypes.includes(options.type)) {
    console.warn(`No annotation found with type '${options.type}'.`);
  }
  const descr = innerElement ? options.type + '.' + innerElement : options.type;
  const chartOptions = {
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

    it(`should detect enter and leave events on ${descr}`, function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');

      options.enter = enterSpy;
      options.leave = leaveSpy;
      chartOptions.options.plugins.annotation.annotations = [options];

      const chart = window.acquireChart(chartOptions);
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
          delete options.enter;
          delete options.leave;
          done();
        });
      });
    });

    it(`should detect a property in the context, to check persistency, on ${descr}`, function(done) {
      options.enter = function(ctx) {
        ctx.persistency = true;
      };
      options.leave = function(ctx) {
        expect(ctx.persistency).toBe(true);
        done();
      };
      chartOptions.options.plugins.annotation.annotations = [options];

      const chart = window.acquireChart(chartOptions);
      const eventPoint = getEventPoint(chart, innerElement);

      window.triggerMouseEvent(chart, 'mousemove', eventPoint);
      window.afterEvent(chart, 'mousemove', function() {

        window.triggerMouseEvent(chart, 'mousemove', {
          x: 0,
          y: 0
        });

        window.afterEvent(chart, 'mousemove', function() {
          delete options.enter;
          delete options.leave;
        });
      });
    });

    it(`should detect click event on ${descr}`, function(done) {
      const clickSpy = jasmine.createSpy('click');

      options.click = clickSpy;
      chartOptions.options.plugins.annotation.annotations = [options];

      const chart = window.acquireChart(chartOptions);
      const eventPoint = getEventPoint(chart, innerElement);

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(1);
        delete options.click;
        done();
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

    it(`should detect dbl click event on ${descr}`, function(done) {
      const dblClickSpy = jasmine.createSpy('dblclick');

      options.dblclick = dblClickSpy;
      chartOptions.options.plugins.annotation.dblClickSpeed = 1000;
      chartOptions.options.plugins.annotation.annotations = [options];

      const chart = window.acquireChart(chartOptions);
      const eventPoint = getEventPoint(chart, innerElement);

      let dblClick = false;
      window.afterEvent(chart, 'click', function() {
        if (!dblClick) {
          dblClick = true;
          window.triggerMouseEvent(chart, 'click', eventPoint);
        } else {
          expect(dblClickSpy.calls.count()).toBe(1);
          delete options.dblclick;
          done();
        }
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

    it(`should detect a click event even if 2 clicks are fired on ${descr}`, function(done) {
      const dblClickSpy = jasmine.createSpy('dblclick');

      options.dblclick = dblClickSpy;
      chartOptions.options.plugins.annotation.dblClickSpeed = 1;
      chartOptions.options.plugins.annotation.annotations = [options];

      const chart = window.acquireChart(chartOptions);
      const eventPoint = getEventPoint(chart, innerElement);

      let dblClick = false;
      window.afterEvent(chart, 'click', function() {
        if (!dblClick) {
          dblClick = true;
          setTimeout(() => {
            window.triggerMouseEvent(chart, 'click', eventPoint);
          }, 500);
        } else {
          expect(dblClickSpy.calls.count()).toBe(0);
          delete options.dblclick;
          done();
        }
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

    if (!innerElement) {
      it(`should center point in range on ${descr}`, function() {
        chartOptions.options.plugins.annotation.annotations = [options];
        const chart = window.acquireChart(chartOptions);
        const element = getElement(chart);
        const center = element.getCenterPoint();
        expect(element.inRange(center.x, center.y)).toBe(true);
      });

      it(`shouldn't center point plus adjustment in range on ${descr}`, function() {
        chartOptions.options.plugins.annotation.annotations = [options];
        const chart = window.acquireChart(chartOptions);
        const element = getElement(chart);
        const center = element.getCenterPoint();
        expect(element.inRange(center.x + center.width, center.y)).toBe(false);
      });

    }
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
