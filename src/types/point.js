import {Element} from 'chart.js';
import {inPointRange, getElementCenterPoint, resolvePointProperties, setBorderStyle, setShadowStyle, isImageOrCanvas, initAnimationProperties, drawPoint} from '../helpers';

export default class PointAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    const {x, y, x2, y2, width} = this.getProps(['x', 'y', 'x2', 'y2', 'width'], useFinalPosition);
    const borderWidth = this.options.borderWidth;
    if (axis !== 'x' && axis !== 'y') {
      return inPointRange({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), width / 2, borderWidth);
    }
    const hBorderWidth = borderWidth / 2;
    const limit = axis === 'y' ? {start: y, end: y2, value: mouseY} : {start: x, end: x2, value: mouseX};
    return limit.value >= limit.start - hBorderWidth && limit.value <= limit.end + hBorderWidth;
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    const borderWidth = options.borderWidth;
    if (options.radius < 0.1) {
      return;
    }
    ctx.save();
    ctx.fillStyle = options.backgroundColor;
    setShadowStyle(ctx, options);
    const stroke = setBorderStyle(ctx, options);
    drawPoint(ctx, this, this.centerX, this.centerY);
    if (stroke && !isImageOrCanvas(options.pointStyle)) {
      ctx.shadowColor = options.borderShadowColor;
      ctx.stroke();
    }
    ctx.restore();
    options.borderWidth = borderWidth;
  }

  resolveElementProperties(chart, options) {
    const properties = resolvePointProperties(chart, options);
    properties.initProperties = initAnimationProperties(chart, properties, options);
    return properties;
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderWidth: 1,
  display: true,
  init: undefined,
  pointStyle: 'circle',
  radius: 10,
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: undefined,
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: undefined,
  yValue: undefined,
  z: 0
};

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};
