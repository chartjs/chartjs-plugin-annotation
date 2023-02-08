import {Element, ArcElement} from 'chart.js';
import {toPercentage, toRadians, TAU} from 'chart.js/helpers';
import {getElementCenterPoint, resolveArcAndLabelProperties, setBorderStyle, setShadowStyle} from '../helpers';
import BoxAnnotation from './box';

const arcElementProperties = ['startAngle', 'endAngle', 'innerRadius', 'outerRadius', 'circumference'];

export default class ArcAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    if (axis !== 'x' && axis !== 'y') {
      return this._arc.inRange(mouseX, mouseY, useFinalPosition);
    }
    const {x, y, x2, y2} = getArcDimension(this, useFinalPosition);
    const hBorderWidth = this.options.borderWidth / 2;
    const limit = axis === 'y' ? {start: y, end: y2, value: mouseY} : {start: x, end: x2, value: mouseX};
    return limit.value >= limit.start - hBorderWidth && limit.value <= limit.end + hBorderWidth;
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {circumference, innerRadius, outerRadius} = this;
    if (circumference === 0 || innerRadius < 0 || outerRadius < 0) {
      return;
    }
    updateArcElement(this);
    if (circumference === TAU) {
      drawFullCircle(ctx, this);
    } else {
      this._arc.draw(ctx);
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const properties = resolveArcAndLabelProperties(chart, options);
    const cutout = Math.min(toPercentage(options.cutout, properties.width), 1);
    properties.outerRadius = options.radius;
    properties.innerRadius = Math.max(properties.outerRadius * cutout, 0);
    properties.startAngle = toRadians(options.rotation - 90);
    properties.circumference = toRadians(options.circumference);
    properties.endAngle = properties.startAngle + properties.circumference;
    properties._arc = this._arc || new ArcElement();
    updateArcElementProperties(properties, properties._arc);
    return properties;
  }
}

ArcAnnotation.id = 'arcAnnotation';

ArcAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderRadius: 0,
  borderWidth: 1,
  circumference: 360,
  cutout: 0,
  display: true,
  label: Object.assign({}, BoxAnnotation.defaults.label),
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

/**
 * Convert (r, 𝜃) to (x, y)
 */
function rThetaToXY(r, theta, x, y) {
  return {
    x: x + r * Math.cos(theta),
    y: y + r * Math.sin(theta),
  };
}

function updateArcElement(element) {
  const arc = element._arc;
  arc.options = element.options;
  // overrides
  arc.options.spacing = 0;
  arc.options.offset = 0;
  arc.options.circular = true;
  updateArcElementProperties(element, arc);
}

function updateArcElementProperties(element, arc) {
  arcElementProperties.forEach(function(key) {
    arc[key] = element[key];
  });
  arc.x = element.centerX;
  arc.y = element.centerY;
}

function drawFullCircle(ctx, element) {
  const {centerX: x, centerY: y, innerRadius, outerRadius, startAngle, endAngle, options} = element;
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

function getArcDimension(element, useFinalPosition) {
  const {centerX, centerY, innerRadius, outerRadius, startAngle, endAngle} = element.getProps(['centerX', 'centerY', 'innerRadius', 'outerRadius', 'startAngle', 'endAngle'], useFinalPosition);
  const arc = element._arc;
  const points = [];
  for (const rot of [0, 90, 180, 270]) {
    const p = rThetaToXY(outerRadius, toRadians(rot), centerX, centerY);
    if (arc.inRange(p.x, p.y, true)) {
      points.push(p);
    }
  }
  for (const r of [outerRadius, innerRadius]) {
    for (const a of [startAngle, endAngle]) {
      const p = rThetaToXY(r, a, centerX, centerY);
      if (arc.inRange(p.x, p.y, true)) {
        points.push(p);
      }
    }
  }
  return points.reduce(function(pre, cur) {
    pre.x = Math.min(cur.x, pre.x || cur.x);
    pre.y = Math.min(cur.y, pre.y || cur.y);
    pre.x2 = Math.max(cur.x, pre.x2 || cur.x);
    pre.y2 = Math.max(cur.y, pre.y2 || cur.y);
    return pre;
  }, {});
}
