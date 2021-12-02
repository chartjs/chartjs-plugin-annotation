import {acquireChart, addMatchers, releaseCharts, specsFromFixtures, triggerMouseEvent, afterEvent} from 'chartjs-test-utils';

window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.afterEvent = afterEvent;
window.triggerMouseEvent = triggerMouseEvent;
window.testEvents = testEvents;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

function testEvents(options, innerNode) {
  const descr = innerNode ? options.type + '.' + innerNode : options.type;
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

    it(`should detect enter and click events on ${descr}`, function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const clickSpy = jasmine.createSpy('click');

      options.enter = enterSpy;
      options.click = clickSpy;
      chartOptions.options.plugins.annotation.annotations = [options];

      const chart = window.acquireChart(chartOptions);
      const eventPoint = getEventPoint(chart, innerNode);

      window.triggerMouseEvent(chart, 'mousemove', eventPoint);
      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(1);
        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete options.enter;
          delete options.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', eventPoint);
      });
    });

    it(`should detect dbl click on ${descr}`, function(done) {
      const dblClickSpy = jasmine.createSpy('dblclick');

      options.dblclick = dblClickSpy;
      chartOptions.options.plugins.annotation.dblClickSpeed = 1000;
      chartOptions.options.plugins.annotation.annotations = [options];

      const chart = window.acquireChart(chartOptions);
      const eventPoint = getEventPoint(chart, innerNode);
      
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
  });

}

function getEventPoint(chart, innerNode) {
  const Annotation = window['chartjs-plugin-annotation'];
  const state = Annotation._getState(chart);
  const annotation = state.elements[0];
  const element = innerNode ? annotation[innerNode] : annotation;
  return innerNode ? {x: element.x + element.width / 2, y: element.y} : element.getCenterPoint();
}
