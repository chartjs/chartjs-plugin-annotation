import {Element} from 'chart.js';
import {PI, toRadians, toDegrees, toPadding, distanceBetweenPoints} from 'chart.js/helpers';
import {EPSILON, clamp, rotated, measureLabelSize, getRelativePosition, setBorderStyle, setShadowStyle, getElementCenterPoint, toPosition, getSize, resolveLineProperties, initAnimationProperties} from '../helpers';
import LabelAnnotation from './label';

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;
const sqr = v => v * v;
const rangeLimit = (mouseX, mouseY, {x, y, x2, y2}, axis) => axis === 'y' ? {start: Math.min(y, y2), end: Math.max(y, y2), value: mouseY} : {start: Math.min(x, x2), end: Math.max(x, x2), value: mouseX};
// http://www.independent-software.com/determining-coordinates-on-a-html-canvas-bezier-curve.html
const coordInCurve = (start, cp, end, t) => (1 - t) * (1 - t) * start + 2 * (1 - t) * t * cp + t * t * end;
const pointInCurve = (start, cp, end, t) => ({x: coordInCurve(start.x, cp.x, end.x, t), y: coordInCurve(start.y, cp.y, end.y, t)});
const coordAngleInCurve = (start, cp, end, t) => 2 * (1 - t) * (cp - start) + 2 * t * (end - cp);
const angleInCurve = (start, cp, end, t) => -Math.atan2(coordAngleInCurve(start.x, cp.x, end.x, t), coordAngleInCurve(start.y, cp.y, end.y, t)) + 0.5 * PI;

export default class LineAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    const hBorderWidth = this.options.borderWidth / 2;
    if (axis !== 'x' && axis !== 'y') {
      const point = {mouseX, mouseY};
      const {path, ctx} = this;
      if (path) {
        setBorderStyle(ctx, this.options);
        const {chart} = this.$context;
        const mx = mouseX * chart.currentDevicePixelRatio;
        const my = mouseY * chart.currentDevicePixelRatio;
        const result = ctx.isPointInStroke(path, mx, my) || isOnLabel(this, point, useFinalPosition);
        ctx.restore();
        return result;
      }
      const epsilon = sqr(hBorderWidth);
      return intersects(this, point, epsilon, useFinalPosition) || isOnLabel(this, point, useFinalPosition);
    }
    return inAxisRange(this, {mouseX, mouseY}, axis, {hBorderWidth, useFinalPosition});
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {x, y, x2, y2, cp, options} = this;

    ctx.save();
    if (!setBorderStyle(ctx, options)) {
      // no border width, then line is not drawn
      return ctx.restore();
    }
    setShadowStyle(ctx, options);

    const length = Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2));
    if (options.curve && cp) {
      drawCurve(ctx, this, cp, length);
      return ctx.restore();
    }
    const {startOpts, endOpts, startAdjust, endAdjust} = getArrowHeads(this);
    const angle = Math.atan2(y2 - y, x2 - x);
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0 + startAdjust, 0);
    ctx.lineTo(length - endAdjust, 0);
    ctx.shadowColor = options.borderShadowColor;
    ctx.stroke();
    drawArrowHead(ctx, 0, startAdjust, startOpts);
    drawArrowHead(ctx, length, -endAdjust, endOpts);
    ctx.restore();
  }

  get label() {
    return this.elements && this.elements[0];
  }

  resolveElementProperties(chart, options) {
    const area = resolveLineProperties(chart, options);
    const {x, y, x2, y2} = area;
    const inside = isLineInArea(area, chart.chartArea);
    const properties = inside
      ? limitLineToArea({x, y}, {x: x2, y: y2}, chart.chartArea)
      : {x, y, x2, y2, width: Math.abs(x2 - x), height: Math.abs(y2 - y)};
    properties.centerX = (x2 + x) / 2;
    properties.centerY = (y2 + y) / 2;
    properties.initProperties = initAnimationProperties(chart, properties, options);
    if (options.curve) {
      const p1 = {x: properties.x, y: properties.y};
      const p2 = {x: properties.x2, y: properties.y2};
      properties.cp = getControlPoint(properties, options, distanceBetweenPoints(p1, p2));
    }
    const labelProperties = resolveLabelElementProperties(chart, properties, options.label);
    // additonal prop to manage zoom/pan
    labelProperties._visible = inside;

    properties.elements = [{
      type: 'label',
      optionScope: 'label',
      properties: labelProperties,
      initProperties: properties.initProperties
    }];
    return properties;
  }
}

LineAnnotation.id = 'lineAnnotation';

const arrowHeadsDefaults = {
  backgroundColor: undefined,
  backgroundShadowColor: undefined,
  borderColor: undefined,
  borderDash: undefined,
  borderDashOffset: undefined,
  borderShadowColor: undefined,
  borderWidth: undefined,
  display: undefined,
  fill: undefined,
  length: undefined,
  shadowBlur: undefined,
  shadowOffsetX: undefined,
  shadowOffsetY: undefined,
  width: undefined
};

LineAnnotation.defaults = {
  adjustScaleRange: true,
  arrowHeads: {
    display: false,
    end: Object.assign({}, arrowHeadsDefaults),
    fill: false,
    length: 12,
    start: Object.assign({}, arrowHeadsDefaults),
    width: 6
  },
  borderDash: [],
  borderDashOffset: 0,
  borderShadowColor: 'transparent',
  borderWidth: 2,
  curve: false,
  controlPoint: {
    y: '-50%'
  },
  display: true,
  endValue: undefined,
  init: undefined,
  label: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    backgroundShadowColor: 'transparent',
    borderCapStyle: 'butt',
    borderColor: 'black',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderRadius: 6,
    borderShadowColor: 'transparent',
    borderWidth: 0,
    callout: Object.assign({}, LabelAnnotation.defaults.callout),
    color: '#fff',
    content: null,
    display: false,
    drawTime: undefined,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: 'bold'
    },
    height: undefined,
    opacity: undefined,
    padding: 6,
    position: 'center',
    rotation: 0,
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textAlign: 'center',
    textStrokeColor: undefined,
    textStrokeWidth: 0,
    width: undefined,
    xAdjust: 0,
    yAdjust: 0,
    z: undefined
  },
  scaleID: undefined,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  value: undefined,
  xMax: undefined,
  xMin: undefined,
  xScaleID: undefined,
  yMax: undefined,
  yMin: undefined,
  yScaleID: undefined,
  z: 0
};

LineAnnotation.descriptors = {
  arrowHeads: {
    start: {
      _fallback: true
    },
    end: {
      _fallback: true
    },
    _fallback: true
  }
};

LineAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function inAxisRange(element, {mouseX, mouseY}, axis, {hBorderWidth, useFinalPosition}) {
  const limit = rangeLimit(mouseX, mouseY, element.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), axis);
  return (limit.value >= limit.start - hBorderWidth && limit.value <= limit.end + hBorderWidth) || isOnLabel(element, {mouseX, mouseY}, useFinalPosition, axis);
}

function isLineInArea({x, y, x2, y2}, {top, right, bottom, left}) {
  return !(
    (x < left && x2 < left) ||
    (x > right && x2 > right) ||
    (y < top && y2 < top) ||
    (y > bottom && y2 > bottom)
  );
}

function limitPointToArea({x, y}, p2, {top, right, bottom, left}) {
  if (x < left) {
    y = interpolateY(left, {x, y}, p2);
    x = left;
  }
  if (x > right) {
    y = interpolateY(right, {x, y}, p2);
    x = right;
  }
  if (y < top) {
    x = interpolateX(top, {x, y}, p2);
    y = top;
  }
  if (y > bottom) {
    x = interpolateX(bottom, {x, y}, p2);
    y = bottom;
  }
  return {x, y};
}

function limitLineToArea(p1, p2, area) {
  const {x, y} = limitPointToArea(p1, p2, area);
  const {x: x2, y: y2} = limitPointToArea(p2, p1, area);
  return {x, y, x2, y2, width: Math.abs(x2 - x), height: Math.abs(y2 - y)};
}

function intersects(element, {mouseX, mouseY}, epsilon = EPSILON, useFinalPosition) {
  // Adapted from https://stackoverflow.com/a/6853926/25507
  const {x: x1, y: y1, x2, y2} = element.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition);
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = sqr(dx) + sqr(dy);
  const t = lenSq === 0 ? -1 : ((mouseX - x1) * dx + (mouseY - y1) * dy) / lenSq;
  let xx, yy;
  if (t < 0) {
    xx = x1;
    yy = y1;
  } else if (t > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + t * dx;
    yy = y1 + t * dy;
  }
  return (sqr(mouseX - xx) + sqr(mouseY - yy)) <= epsilon;
}

function isOnLabel(element, {mouseX, mouseY}, useFinalPosition, axis) {
  const label = element.label;
  return label.options.display && label.inRange(mouseX, mouseY, axis, useFinalPosition);
}

function resolveLabelElementProperties(chart, properties, options) {
  const borderWidth = options.borderWidth;
  const padding = toPadding(options.padding);
  const textSize = measureLabelSize(chart.ctx, options);
  const width = textSize.width + padding.width + borderWidth;
  const height = textSize.height + padding.height + borderWidth;
  return calculateLabelPosition(properties, options, {width, height, padding}, chart.chartArea);
}

function calculateAutoRotation(properties) {
  const {x, y, x2, y2} = properties;
  const rotation = Math.atan2(y2 - y, x2 - x);
  // Flip the rotation if it goes > PI/2 or < -PI/2, so label stays upright
  return rotation > PI / 2 ? rotation - PI : rotation < PI / -2 ? rotation + PI : rotation;
}

function calculateLabelPosition(properties, label, sizes, chartArea) {
  const {width, height, padding} = sizes;
  const {xAdjust, yAdjust} = label;
  const p1 = {x: properties.x, y: properties.y};
  const p2 = {x: properties.x2, y: properties.y2};
  const rotation = label.rotation === 'auto' ? calculateAutoRotation(properties) : toRadians(label.rotation);
  const size = rotatedSize(width, height, rotation);
  const t = calculateT(properties, label, {labelSize: size, padding}, chartArea);
  const pt = properties.cp ? pointInCurve(p1, properties.cp, p2, t) : pointInLine(p1, p2, t);
  const xCoordinateSizes = {size: size.w, min: chartArea.left, max: chartArea.right, padding: padding.left};
  const yCoordinateSizes = {size: size.h, min: chartArea.top, max: chartArea.bottom, padding: padding.top};
  const centerX = adjustLabelCoordinate(pt.x, xCoordinateSizes) + xAdjust;
  const centerY = adjustLabelCoordinate(pt.y, yCoordinateSizes) + yAdjust;
  return {
    x: centerX - (width / 2),
    y: centerY - (height / 2),
    x2: centerX + (width / 2),
    y2: centerY + (height / 2),
    centerX,
    centerY,
    pointX: pt.x,
    pointY: pt.y,
    width,
    height,
    rotation: toDegrees(rotation)
  };
}

function rotatedSize(width, height, rotation) {
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);
  return {
    w: Math.abs(width * cos) + Math.abs(height * sin),
    h: Math.abs(width * sin) + Math.abs(height * cos)
  };
}

function calculateT(properties, label, sizes, chartArea) {
  let t;
  const space = spaceAround(properties, chartArea);
  if (label.position === 'start') {
    t = calculateTAdjust({w: properties.x2 - properties.x, h: properties.y2 - properties.y}, sizes, label, space);
  } else if (label.position === 'end') {
    t = 1 - calculateTAdjust({w: properties.x - properties.x2, h: properties.y - properties.y2}, sizes, label, space);
  } else {
    t = getRelativePosition(1, label.position);
  }
  return t;
}

function calculateTAdjust(lineSize, sizes, label, space) {
  const {labelSize, padding} = sizes;
  const lineW = lineSize.w * space.dx;
  const lineH = lineSize.h * space.dy;
  const x = (lineW > 0) && ((labelSize.w / 2 + padding.left - space.x) / lineW);
  const y = (lineH > 0) && ((labelSize.h / 2 + padding.top - space.y) / lineH);
  return clamp(Math.max(x, y), 0, 0.25);
}

function spaceAround(properties, chartArea) {
  const {x, x2, y, y2} = properties;
  const t = Math.min(y, y2) - chartArea.top;
  const l = Math.min(x, x2) - chartArea.left;
  const b = chartArea.bottom - Math.max(y, y2);
  const r = chartArea.right - Math.max(x, x2);
  return {
    x: Math.min(l, r),
    y: Math.min(t, b),
    dx: l <= r ? 1 : -1,
    dy: t <= b ? 1 : -1
  };
}

function adjustLabelCoordinate(coordinate, labelSizes) {
  const {size, min, max, padding} = labelSizes;
  const halfSize = size / 2;
  if (size > max - min) {
    // if it does not fit, display as much as possible
    return (max + min) / 2;
  }
  if (min >= (coordinate - padding - halfSize)) {
    coordinate = min + padding + halfSize;
  }
  if (max <= (coordinate + padding + halfSize)) {
    coordinate = max - padding - halfSize;
  }
  return coordinate;
}

function getArrowHeads(line) {
  const options = line.options;
  const arrowStartOpts = options.arrowHeads && options.arrowHeads.start;
  const arrowEndOpts = options.arrowHeads && options.arrowHeads.end;
  return {
    startOpts: arrowStartOpts,
    endOpts: arrowEndOpts,
    startAdjust: getLineAdjust(line, arrowStartOpts),
    endAdjust: getLineAdjust(line, arrowEndOpts)
  };
}

function getLineAdjust(line, arrowOpts) {
  if (!arrowOpts || !arrowOpts.display) {
    return 0;
  }
  const {length, width} = arrowOpts;
  const adjust = line.options.borderWidth / 2;
  const p1 = {x: length, y: width + adjust};
  const p2 = {x: 0, y: adjust};
  return Math.abs(interpolateX(0, p1, p2));
}

function drawArrowHead(ctx, offset, adjust, arrowOpts) {
  if (!arrowOpts || !arrowOpts.display) {
    return;
  }
  const {length, width, fill, backgroundColor, borderColor} = arrowOpts;
  const arrowOffsetX = Math.abs(offset - length) + adjust;
  ctx.beginPath();
  setShadowStyle(ctx, arrowOpts);
  setBorderStyle(ctx, arrowOpts);
  ctx.moveTo(arrowOffsetX, -width);
  ctx.lineTo(offset + adjust, 0);
  ctx.lineTo(arrowOffsetX, width);
  if (fill === true) {
    ctx.fillStyle = backgroundColor || borderColor;
    ctx.closePath();
    ctx.fill();
    ctx.shadowColor = 'transparent';
  } else {
    ctx.shadowColor = arrowOpts.borderShadowColor;
  }
  ctx.stroke();
}

function getControlPoint(properties, options, distance) {
  const {x, y, x2, y2, centerX, centerY} = properties;
  const angle = Math.atan2(y2 - y, x2 - x);
  const cp = toPosition(options.controlPoint, 0);
  const point = {
    x: centerX + getSize(distance, cp.x, false),
    y: centerY + getSize(distance, cp.y, false)
  };
  return rotated(point, {x: centerX, y: centerY}, angle);
}

function drawArrowHeadOnCurve(ctx, {x, y}, {angle, adjust}, arrowOpts) {
  if (!arrowOpts || !arrowOpts.display) {
    return;
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawArrowHead(ctx, 0, -adjust, arrowOpts);
  ctx.restore();
}

function drawCurve(ctx, element, cp, length) {
  const {x, y, x2, y2, options} = element;
  const {startOpts, endOpts, startAdjust, endAdjust} = getArrowHeads(element);
  const p1 = {x, y};
  const p2 = {x: x2, y: y2};
  const startAngle = angleInCurve(p1, cp, p2, 0);
  const endAngle = angleInCurve(p1, cp, p2, 1) - PI;
  const ps = pointInCurve(p1, cp, p2, startAdjust / length);
  const pe = pointInCurve(p1, cp, p2, 1 - endAdjust / length);

  const path = new Path2D();
  ctx.beginPath();
  path.moveTo(ps.x, ps.y);
  path.quadraticCurveTo(cp.x, cp.y, pe.x, pe.y);
  ctx.shadowColor = options.borderShadowColor;
  ctx.stroke(path);
  element.path = path;
  element.ctx = ctx;
  drawArrowHeadOnCurve(ctx, ps, {angle: startAngle, adjust: startAdjust}, startOpts);
  drawArrowHeadOnCurve(ctx, pe, {angle: endAngle, adjust: endAdjust}, endOpts);
}
