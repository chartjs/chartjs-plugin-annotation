import {Element} from 'chart.js';
import {drawPoint, inPointRange, getCenterPointElement, resolvePointPosition} from '../helpers';

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
    return resolvePointPosition(chart, options);
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
