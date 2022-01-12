describe('Ellipse annotation', function() {
  describe('auto', jasmine.fixtures('ellipse'));

  window.testCommonEvents({
    type: 'ellipse',
    id: 'test',
    xScaleID: 'x',
    yScaleID: 'y',
    xMin: 2,
    yMin: 2,
    xMax: 4,
    yMax: 4,
    borderWidth: 0
  });

  // event point callbacks
  const top = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width / 2 + xAdjust, y: element.y + yAdjust};
  };
  const bottom = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width / 2 + xAdjust, y: element.y + element.height + yAdjust};
  };
  const left = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + xAdjust, y: element.y + element.height / 2 + yAdjust};
  };
  const right = function(xScale, yScale, element, xAdjust, yAdjust) {
    return {x: element.x + element.width + xAdjust, y: element.y + element.height / 2 + yAdjust};
  };

  describe('(without border)', function() {
    const options = {
      type: 'ellipse',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 2,
      yMin: 2,
      xMax: 4,
      yMax: 4,
      borderWidth: 0
    };

    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));

    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));

    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));

  });

  describe('(with rotation)', function() {
    const options = {
      type: 'ellipse',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 2,
      yMin: 2,
      xMax: 4,
      yMax: 4,
      borderWidth: 0,
      rotation: 90
    };

    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));

    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));

    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, -1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, 1, 0));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, -1, 0));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, 1));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -1, 0));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, 1, 0));
  });

  describe('(with border)', function() {
    const options = {
      type: 'ellipse',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 2,
      yMin: 2,
      xMax: 4,
      yMax: 4,
      borderWidth: 10
    };

    // enter
    window.catchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.catchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.catchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.catchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
    window.notCatchEnterEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.notCatchEnterEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.notCatchEnterEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
    window.notCatchEnterEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));

    // leave
    window.catchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.catchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.catchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 1));
    window.catchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 1));
    window.notCatchLeaveEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.notCatchLeaveEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.notCatchLeaveEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.notCatchLeaveEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));

    // click
    window.catchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 + 1));
    window.catchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 - 1));
    window.catchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 + 1, 0));
    window.catchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 - 1, 0));
    window.notCatchClickEvent(options, 'top', (xScale, yScale, element) => top(xScale, yScale, element, 0, -element.options.borderWidth / 2 - 1));
    window.notCatchClickEvent(options, 'bottom', (xScale, yScale, element) => bottom(xScale, yScale, element, 0, element.options.borderWidth / 2 + 1));
    window.notCatchClickEvent(options, 'left', (xScale, yScale, element) => left(xScale, yScale, element, -element.options.borderWidth / 2 - 1, 0));
    window.notCatchClickEvent(options, 'right', (xScale, yScale, element) => right(xScale, yScale, element, element.options.borderWidth / 2 + 1, 0));
  });

  describe('(with radius 0)', function() {
    const options = {
      type: 'ellipse',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 5,
      yMin: 5,
      xMax: 5,
      yMax: 5
    };

    const center = function(xScale, yScale, element) {
      const opts = element.options;
      return {x: xScale.getPixelForValue(opts.xMin), y: yScale.getPixelForValue(opts.yMin)};
    };

    window.notCatchEnterEvent(options, 'center', center);
    window.notCatchClickEvent(options, 'center', center);

  });

  describe('(with rotation)', function() {
    const options = {
      type: 'ellipse',
      id: 'test',
      xScaleID: 'x',
      yScaleID: 'y',
      xMin: 2,
      yMin: 4,
      xMax: 8,
      yMax: 6,
      rotation: 45
    };

    const eventIn = function(xScale, yScale) {
      return {x: xScale.getPixelForValue(4), y: yScale.getPixelForValue(6.9)};
    };
    const eventOut = function(xScale, yScale) {
      return {x: xScale.getPixelForValue(3), y: yScale.getPixelForValue(5)};
    };

    window.catchEnterEvent(options, 'point', eventIn);
    window.catchLeaveEvent(options, 'point', eventOut);
    window.catchClickEvent(options, 'point', eventIn);
    window.notCatchEnterEvent(options, 'point', eventOut);
    window.notCatchLeaveEvent(options, 'point', eventIn);
    window.notCatchClickEvent(options, 'point', eventOut);

  });

  describe('events on rotated ellipse, removing rotation by callback, ', function() {
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
              ellipse: {
                type: 'ellipse',
                xScaleID: 'x',
                yScaleID: 'y',
                xMin: 2,
                yMin: 4,
                xMax: 8,
                yMax: 6,
                rotation: 45
              }
            }
          }
        }
      },
    };

    const ellipseOpts = chartConfig.options.plugins.annotation.annotations.ellipse;

    it('should detect click event', function(done) {
      const clickSpy = jasmine.createSpy('click');

      ellipseOpts.click = function(ctx) {
        if (ctx.element.options.rotation) {
          delete ctx.element.options.rotation;
        } else {
          ctx.element.options.click = clickSpy;
        }
      };

      const chart = window.acquireChart(chartConfig);
      const xScale = chart.scales.x;
      const yScale = chart.scales.y;
      const eventPoint = {x: xScale.getPixelForValue(4), y: yScale.getPixelForValue(6.9)};

      window.afterEvent(chart, 'click', function() {
        expect(clickSpy.calls.count()).toBe(0);

        window.afterEvent(chart, 'click', function() {
          expect(clickSpy.calls.count()).toBe(1);
          delete ellipseOpts.click;
          done();
        });
        window.triggerMouseEvent(chart, 'click', {
          x: xScale.getPixelForValue(5),
          y: yScale.getPixelForValue(5)
        });
      });
      window.triggerMouseEvent(chart, 'click', eventPoint);
    });

  });

});
