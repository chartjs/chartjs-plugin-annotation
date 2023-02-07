import {Element, ArcElement} from 'chart.js';
import {toPercentage, toRadians, TAU} from 'chart.js/helpers';
import {getElementCenterPoint, resolvePointProperties, setBorderStyle, setShadowStyle} from '../helpers';

export default class ArcAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    const {x, y, x2, y2} = this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition);
    if (axis !== 'x' && axis !== 'y') {
      return this.arc.inRange(mouseX, mouseY, useFinalPosition);
    }
    const hBorderWidth = this.options.borderWidth / 2;
    const limit = axis === 'y' ? {start: y, end: y2, value: mouseY} : {start: x, end: x2, value: mouseX};
    return limit.value >= limit.start - hBorderWidth && limit.value <= limit.end + hBorderWidth;
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const arc = this.arc;
    const {circumference, innerRadius, outerRadius} = arc;
    if (circumference === 0 || innerRadius < 0 || outerRadius < 0) {
      return;
    }
    if (circumference === TAU) {
      drawFullCircle(ctx, arc);
    } else {
      arc.draw(ctx);
    }
  }

  resolveElementProperties(chart, options) {
    const props = resolvePointProperties(chart, options);
    props.callback = initArcElement;
    return props;
  }
}

ArcAnnotation.id = 'arcAnnotation';

ArcAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderWidth: 1,
  circumference: 360,
  cutout: 0,
  display: true,
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

ArcAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function initArcElement(element, animations) {
  const options = element.options;
  const properties = {
    x: element.centerX,
    y: element.centerY,
    options: Object.assign({}, {circular: true, spacing: 0, offset: 0}, options)
  };
  const cutout = Math.min(toPercentage(options.cutout, element.width), 1);
  properties.outerRadius = options.radius;
  properties.innerRadius = Math.max(properties.outerRadius * cutout, 0);
  properties.startAngle = toRadians(options.rotation);
  properties.circumference = toRadians(options.circumference);
  properties.endAngle = properties.startAngle + properties.circumference;
  if (!element.arc) {
    element.arc = new ArcElement();
  }
  animations.update(element.arc, properties);
}

function drawFullCircle(ctx, arc) {
  const {x, y, innerRadius, outerRadius, startAngle, endAngle, options} = arc;
  ctx.save();
  setShadowStyle(ctx, options);
  const stroke = setBorderStyle(ctx, options);
  const bh = options.borderWidth / 2;
  // clip circle area
  if (innerRadius > bh) {
    ctx.beginPath();
    ctx.arc(x, y, innerRadius - bh, startAngle, endAngle);
    ctx.arc(x, y, outerRadius + bh, startAngle, endAngle);
    ctx.clip('evenodd');
  }
  // draw outer circle
  ctx.beginPath();
  ctx.fillStyle = options.backgroundColor;
  ctx.arc(x, y, outerRadius, startAngle, endAngle);
  ctx.fill();
  if (stroke) {
    ctx.shadowColor = options.borderShadowColor;
    ctx.stroke();
    // draw inner circle
    ctx.beginPath();
    ctx.arc(x, y, innerRadius, startAngle, endAngle);
    ctx.stroke();
  }
  ctx.restore();
}
