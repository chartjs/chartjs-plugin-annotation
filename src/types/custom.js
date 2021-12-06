import {Element} from 'chart.js';
import {getChartPoint, getChartRect, getRectCenterPoint, inBoxRange, isBoundToPoint} from '../helpers';

export default class CustomAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    return inBoxRange(mouseX, mouseY, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    const draw = this.options.draw;

    if (typeof draw !== 'function') {
      throw new Error('No draw function defined for CustomAnnotation');
    }

    ctx.save();
    draw(ctx, this, this.$context.chart);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    let rect;
    if (isBoundToPoint(options)) {
      rect = getChartPoint(chart, options);
      rect.width = 0;
      rect.height = 0;
    } else {
      rect = getChartRect(chart, options);
    }
    if (options.init) {
      options.init(rect, this, this.$context.chart);
    }
    return rect;
  }
}

CustomAnnotation.id = 'customAnnotation';

CustomAnnotation.defaults = {
  adjustScaleRange: true,
  display: true,
  draw: undefined,
  init: undefined,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

CustomAnnotation.defaultRoutes = {
  color: 'color',
  borderColor: 'color',
  backgroundColor: 'color'
};