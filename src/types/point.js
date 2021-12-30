import {Element} from 'chart.js';
import {drawPoint} from 'chart.js/helpers';
import {inPointRange, getElementCenterPoint, resolvePointPosition, setBorderStyle, setShadowStyle, resetShadow} from '../helpers';

export default class PointAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const {width} = this.getProps(['width'], useFinalPosition);
    return inPointRange({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), width / 2 + this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    const {borderWidth, pointStyle} = options;
    ctx.save();
    ctx.fillStyle = options.backgroundColor;
    setShadowStyle(ctx, options);
    const stroke = setBorderStyle(ctx, options);
    options.borderWidth = 0;
    drawPoint(ctx, options, this.x, this.y);
    if (stroke) {
      if (!(typeof pointStyle === 'string') || pointStyle === 'circle' || pointStyle === 'triangle' || pointStyle.startsWith('rect')) {
        resetShadow(ctx);
      }
      ctx.stroke();
    }
    ctx.restore();
    options.borderWidth = borderWidth;
  }

  resolveElementProperties(chart, options) {
    return resolvePointPosition(chart, options);
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  display: true,
  pointStyle: 'circle',
  radius: 10,
  rotation: 0,
  shadowBlur: 0,
  shadowColor: 'transparent',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
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
