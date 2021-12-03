import {Element} from 'chart.js';
import {drawPoint, inPointRange, getChartCircle, getCenterPointElement, isBoundToPoint, getChartRect, getRectCenterPoint} from '../helpers';

export default class PointAnnotation extends Element {

  inRange(x, y) {
    const {width, options} = this;
    return inPointRange({x, y}, this.getCenterPoint(true), width / 2 + options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getCenterPointElement(this, useFinalPosition);
  }

  draw(ctx) {
    drawPoint(ctx, this, this.options);
  }

  resolveElementProperties(chart, options) {
    if (!isBoundToPoint(options)) {
      const box = getChartRect(chart, options);
      const point = getRectCenterPoint(box);
      let radius = options.radius;
      if (!radius || isNaN(radius)) {
        radius = Math.min(box.width, box.height) / 2;
        options.radius = radius;
      }
      return {
        x: point.x,
        y: point.y,
        width: radius * 2,
        height: radius * 2
      };
    }
    return getChartCircle(chart, options);
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  radius: 10,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};
