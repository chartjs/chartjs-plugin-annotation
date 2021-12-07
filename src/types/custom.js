import {Element} from 'chart.js';
import {callback} from 'chart.js/helpers';
import {getChartPoint, getChartRect, getRectCenterPoint, inBoxRange, isBoundToPoint} from '../helpers';

export default class CustomAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const insideBox = inBoxRange(mouseX, mouseY, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
    return insideBox && callback(this.options.inRange, arguments, this);
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
    let properties;
    if (isBoundToPoint(options)) {
      properties = getChartPoint(chart, options);
      properties.width = 0;
      properties.height = 0;
    } else {
      properties = getChartRect(chart, options);
    }
    callback(options.init, [properties, this.$context.chart], this);
    return properties;
  }
}

CustomAnnotation.id = 'customAnnotation';

CustomAnnotation.defaults = {
  adjustScaleRange: true,
  display: true,
  draw: undefined,
  init: undefined,
  inRange() {
    return true;
  },
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};
