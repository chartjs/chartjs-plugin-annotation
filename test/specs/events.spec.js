describe('Common', function() {

  ['box', 'ellipse', 'label', 'line', 'point', 'polygon'].forEach(function(type) {
    const annotation = {
      type,
      xMin: 2,
      yMin: 2,
      xMax: 8,
      yMax: 8
    };
    window.testEvents(annotation);
  });

  describe('events', function() {
    const annotation = {
      type: 'box',
      xMin: 2,
      yMin: 2,
      xMax: 4,
      yMax: 4
    };

    it('should not detect any move events (because no callback is set)', function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');

      const chart = window.scatterChart(10, 10, {annotation});

      window.triggerMouseEvent(chart, 'mousemove', window.getCenterPoint(chart));
      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(0);
        window.triggerMouseEvent(chart, 'mousemove', window.eventPoint0);
        window.afterEvent(chart, 'mousemove', function() {
          expect(leaveSpy.calls.count()).toBe(0);
          done();
        });
      });
    });

    it('should not detect any events (because unmanaged event)', function(done) {
      const clickSpy = jasmine.createSpy('click');
      annotation.click = clickSpy;

      const chart = window.scatterChart(10, 10, {annotation});

      window.afterEvent(chart, 'touchstart', function() {
        expect(clickSpy.calls.count()).toBe(0);
        delete annotation.click;
        done();
      });
      window.triggerMouseEvent(chart, 'touchstart', window.getCenterPoint(chart));
    });

    it('should not call removed hook', function(done) {
      const enterSpy = jasmine.createSpy('enter');
      const leaveSpy = jasmine.createSpy('leave');
      annotation.enter = enterSpy;
      annotation.leave = leaveSpy;

      const chart = window.scatterChart(10, 10, {annotation});
      chart.options.plugins.annotation.annotations.annotation.enter = undefined;
      chart.update();

      window.triggerMouseEvent(chart, 'mousemove', window.getCenterPoint(chart));
      window.afterEvent(chart, 'mousemove', function() {
        expect(enterSpy.calls.count()).toBe(0);
        window.triggerMouseEvent(chart, 'mousemove', window.eventPoint0);
        window.afterEvent(chart, 'mousemove', function() {
          expect(leaveSpy.calls.count()).toBe(1);
          delete annotation.enter;
          delete annotation.leave;
          done();
        });
      });
    });

    it('should persist properties set in context', function(done) {
      annotation.enter = function(ctx) {
        ctx.persistency = true;
      };
      annotation.leave = function(ctx) {
        expect(ctx.persistency).toBe(true);
        done();
      };

      const chart = window.scatterChart(10, 10, {annotation});
      window.triggerMouseEvent(chart, 'mousemove', window.getCenterPoint(chart));
      window.afterEvent(chart, 'mousemove', function() {
        window.triggerMouseEvent(chart, 'mousemove', window.eventPoint0);
        window.afterEvent(chart, 'mousemove', function() {
          delete annotation.enter;
          delete annotation.leave;
        });
      });
    });
  });
});
