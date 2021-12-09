import {Element} from 'chart.js';
import {drawPoint, inPointRange, getElementCenterPoint, resolvePointPosition} from '../helpers';

export default class PointAnnotation extends Element {

  inRange(x, y, useFinalPosition) {
    const {width} = this.getProps(['width'], useFinalPosition);
    return inPointRange({x, y}, this.getCenterPoint(useFinalPosition), width / 2 + this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
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
  pointStyle: 'circle',
  radius: 10,
  rotation: 0,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};
