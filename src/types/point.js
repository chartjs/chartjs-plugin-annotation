import {Element} from 'chart.js';
import {getChartPoint, drawPoint, inPointRange} from '../helpers';

export default class PointAnnotation extends Element {

  inRange(x, y) {
    const {width, options} = this;
    return inPointRange({x, y}, this.getCenterPoint(true), width / 2 + options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    const {x, y} = this.getProps(['x', 'y'], useFinalPosition);
    return {x, y};
  }

  draw(ctx) {
    drawPoint(ctx, this, this.options);
  }

  resolveElementProperties(chart, options) {
    const point = getChartPoint(chart, options);
    return {
      x: point.x,
      y: point.y,
      width: options.radius * 2,
      height: options.radius * 2
    };
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
  xScaleID: 'x',
  xValue: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};
