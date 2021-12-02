import {Element} from 'chart.js';
import {drawPoint, inPointRange, getChartCircle, getCircleCenterPoint} from '../helpers';

export default class PointAnnotation extends Element {

  inRange(x, y) {
    const {width, options} = this;
    return inPointRange({x, y}, this.getCenterPoint(true), width / 2 + options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getCircleCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    drawPoint(ctx, this, this.options);
  }

  resolveElementProperties(chart, options) {
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
  pointStyle: 'circle',
  radius: 10,
  rotation: 0,
  xScaleID: 'x',
  xValue: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};
