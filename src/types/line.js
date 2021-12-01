import {Element} from 'chart.js';
import {toRadians, toPadding} from 'chart.js/helpers';
import {clamp, scaleValue, rotated, drawBox, drawLabel, measureLabelSize, isLabelVisible} from '../helpers';

const PI = Math.PI;
const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;

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

export default class LineAnnotation extends Element {
  intersects(x, y, epsilon = 0.001) {
    // Adapted from https://stackoverflow.com/a/6853926/25507
    const sqr = v => v * v;
    const {x: x1, y: y1, x2, y2} = this;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lenSq = sqr(dx) + sqr(dy);
    const t = lenSq === 0 ? -1 : ((x - x1) * dx + (y - y1) * dy) / lenSq;
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
    return (sqr(x - xx) + sqr(y - yy)) < epsilon;
  }

  labelIsVisible(chartArea) {
    const label = this.options.label;

    const inside = !chartArea || isLineInArea(this, chartArea);
    return inside && isLabelVisible(label);
  }

  isOnLabel(mouseX, mouseY) {
    const {labelRect} = this;
    if (!labelRect || !this.labelIsVisible()) {
      return false;
    }

    const {x, y} = rotated({x: mouseX, y: mouseY}, labelRect, -labelRect.rotation);
    const w2 = labelRect.width / 2;
    const h2 = labelRect.height / 2;
    return x >= labelRect.x - w2 && x <= labelRect.x + w2 &&
      y >= labelRect.y - h2 && y <= labelRect.y + h2;
  }

  inRange(x, y) {
    const epsilon = this.options.borderWidth || 1;
    return this.intersects(x, y, epsilon) || this.isOnLabel(x, y);
  }

  getCenterPoint() {
    return {
      x: (this.x2 + this.x) / 2,
      y: (this.y2 + this.y) / 2
    };
  }

  draw(ctx) {
    const {x, y, x2, y2, options} = this;
    ctx.save();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    // Draw
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore();
  }

  drawLabel(ctx, chartArea) {
    if (this.labelIsVisible(chartArea)) {
      ctx.save();
      applyLabel(ctx, this, chartArea);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    const scale = chart.scales[options.scaleID];
    let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
    let min, max;

    if (scale) {
      min = scaleValue(scale, options.value, NaN);
      max = scaleValue(scale, options.endValue, min);
      if (scale.isHorizontal()) {
        x = min;
        x2 = max;
      } else {
        y = min;
        y2 = max;
      }
    } else {
      const xScale = chart.scales[options.xScaleID];
      const yScale = chart.scales[options.yScaleID];

      if (xScale) {
        x = scaleValue(xScale, options.xMin, x);
        x2 = scaleValue(xScale, options.xMax, x2);
      }

      if (yScale) {
        y = scaleValue(yScale, options.yMin, y);
        y2 = scaleValue(yScale, options.yMax, y2);
      }
    }
    const inside = isLineInArea({x, y, x2, y2}, chart.chartArea);
    return inside
      ? limitLineToArea({x, y}, {x: x2, y: y2}, chart.chartArea)
      : {x, y, x2, y2, width: Math.abs(x2 - x), height: Math.abs(y2 - y)};
  }
}

LineAnnotation.id = 'lineAnnotation';
LineAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderWidth: 2,
  borderDash: [],
  borderDashOffset: 0,
  label: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderCapStyle: 'butt',
    borderColor: 'black',
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderRadius: 6,
    borderWidth: 0,
    color: '#fff',
    content: null,
    cornerRadius: undefined, // TODO: v2 remove support for cornerRadius
    drawTime: undefined,
    enabled: false,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: 'bold'
    },
    height: undefined,
    padding: 6,
    xPadding: undefined, // TODO: v2 remove support for xPadding
    yPadding: undefined, // TODO: v2 remove support for yPadding
    position: 'center',
    rotation: 0,
    textAlign: 'center',
    width: undefined,
    xAdjust: 0,
    yAdjust: 0
  },
  value: undefined,
  endValue: undefined,
  scaleID: undefined,
  xScaleID: 'x',
  xMin: undefined,
  xMax: undefined,
  yScaleID: 'y',
  yMin: undefined,
  yMax: undefined
};

LineAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function calculateAutoRotation(line) {
  const {x, y, x2, y2} = line;
  const rotation = Math.atan2(y2 - y, x2 - x);
  // Flip the rotation if it goes > PI/2 or < -PI/2, so label stays upright
  return rotation > PI / 2 ? rotation - PI : rotation < PI / -2 ? rotation + PI : rotation;
}

function applyLabel(ctx, line, chartArea) {
  const label = line.options.label;
  // TODO: v2 remove support for xPadding and yPadding
  const {padding: lblPadding, xPadding, yPadding, borderWidth} = label;
  const padding = getPadding(lblPadding, xPadding, yPadding);
  const labelSize = measureLabelSize(ctx, label);
  const width = labelSize.width + padding.width + borderWidth;
  const height = labelSize.height + padding.height + borderWidth;
  const rect = line.labelRect = calculateLabelPosition(line, {width, height, padding}, chartArea);

  ctx.translate(rect.x, rect.y);
  ctx.rotate(rect.rotation);

  const boxRect = {
    x: -(width / 2),
    y: -(height / 2),
    width,
    height
  };
  drawBox(ctx, boxRect, label);

  const labelTextRect = {
    x: -(width / 2) + padding.left + borderWidth / 2,
    y: -(height / 2) + padding.top + borderWidth / 2,
    width: labelSize.width,
    height: labelSize.height
  };
  drawLabel(ctx, labelTextRect, label);
}

// TODO: v2 remove support for xPadding and yPadding
function getPadding(padding, xPadding, yPadding) {
  let tempPadding = padding;
  if (xPadding || yPadding) {
    tempPadding = {x: xPadding || 6, y: yPadding || 6};
  }
  return toPadding(tempPadding);
}

function calculateLabelPosition(line, sizes, chartArea) {
  const {width, height, padding} = sizes;
  const label = line.options.label;
  const {xAdjust, yAdjust, position} = label;
  const p1 = {x: line.x, y: line.y};
  const p2 = {x: line.x2, y: line.y2};
  const rotation = label.rotation === 'auto' ? calculateAutoRotation(line) : toRadians(label.rotation);
  const size = rotatedSize(width, height, rotation);
  const t = calculateT(line, position, {labelSize: size, padding}, chartArea);
  const pt = pointInLine(p1, p2, t);
  const xCoordinateSizes = {size: size.w, min: chartArea.left, max: chartArea.right, padding: padding.left};
  const yCoordinateSizes = {size: size.h, min: chartArea.top, max: chartArea.bottom, padding: padding.top};

  return {
    x: adjustLabelCoordinate(pt.x, xCoordinateSizes) + xAdjust,
    y: adjustLabelCoordinate(pt.y, yCoordinateSizes) + yAdjust,
    width,
    height,
    rotation
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

function calculateT(line, position, sizes, chartArea) {
  let t = 0.5;
  const space = spaceAround(line, chartArea);
  const label = line.options.label;
  if (position === 'start') {
    t = calculateTAdjust({w: line.x2 - line.x, h: line.y2 - line.y}, sizes, label, space);
  } else if (position === 'end') {
    t = 1 - calculateTAdjust({w: line.x - line.x2, h: line.y - line.y2}, sizes, label, space);
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

function spaceAround(line, chartArea) {
  const {x, x2, y, y2} = line;
  const t = Math.min(y, y2) - chartArea.top;
  const l = Math.min(x, x2) - chartArea.left;
  const b = chartArea.bottom - Math.max(y, y2);
  const r = chartArea.right - Math.max(x, x2);
  return {
    x: Math.min(l, r),
    y: Math.min(t, b),
    dx: l < r ? 1 : -1,
    dy: t < b ? 1 : -1
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
