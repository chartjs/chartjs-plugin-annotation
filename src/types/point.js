import {Element} from 'chart.js';
import {getChartCircle, getCircleCenterPoint} from '../helpers';

export default class PointAnnotation extends Element {

  inRange(x, y) {
    const {width, options} = this;
    const center = this.getCenterPoint(true);
    const radius = width / 2 + options.borderWidth;

    if (radius <= 0) {
      return false;
    }

    return (Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)) <= Math.pow(radius, 2);
  }

  getCenterPoint(useFinalPosition) {
    return getCircleCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {x, y, width, options} = this;

    ctx.save();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    ctx.beginPath();
    ctx.arc(x, y, width / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
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
