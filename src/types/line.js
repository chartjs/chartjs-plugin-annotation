import {Element} from 'chart.js';
import {PI, toRadians, toPadding} from 'chart.js/helpers';
import {clamp, scaleValue, rotated, drawBox, drawLabel, measureLabelSize, getRelativePosition, setBorderStyle} from '../helpers';

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;
const sqr = v => v * v;

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
  intersects(x, y, epsilon = 0.001, useFinalPosition) {
    // Adapted from https://stackoverflow.com/a/6853926/25507
    const {x: x1, y: y1, x2, y2} = this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition);
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

  // TODO: make private in v2
  labelIsVisible(useFinalPosition, chartArea) {
    const labelOpts = this.options.label;
    if (!labelOpts || !labelOpts.enabled) {
      return false;
    }
    return !chartArea || isLineInArea(this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), chartArea);
  }

  // TODO: make private in v2
  isOnLabel(mouseX, mouseY, useFinalPosition) {
    if (!this.labelIsVisible(useFinalPosition)) {
      return false;
    }
    const {labelX, labelY, labelWidth, labelHeight, labelRotation} = this.getProps(['labelX', 'labelY', 'labelWidth', 'labelHeight', 'labelRotation'], useFinalPosition);
    const {x, y} = rotated({x: mouseX, y: mouseY}, {x: labelX, y: labelY}, -labelRotation);
    const w2 = labelWidth / 2;
    const h2 = labelHeight / 2;
    return x >= labelX - w2 && x <= labelX + w2 &&
      y >= labelY - h2 && y <= labelY + h2;
  }

  inRange(mouseX, mouseY, useFinalPosition) {
    const epsilon = sqr(this.options.borderWidth / 2);
    return this.intersects(mouseX, mouseY, epsilon, useFinalPosition) || this.isOnLabel(mouseX, mouseY, useFinalPosition);
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

    ctx.beginPath();
    setBorderStyle(ctx, options);
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore();
  }

  drawLabel(ctx, chartArea) {
    if (!this.labelIsVisible(false, chartArea)) {
      return;
    }
    const {labelX, labelY, labelWidth, labelHeight, labelRotation, labelPadding, labelTextSize, options: {label}} = this;

    ctx.save();
    ctx.translate(labelX, labelY);
    ctx.rotate(labelRotation);

    const boxRect = {
      x: -(labelWidth / 2),
      y: -(labelHeight / 2),
      width: labelWidth,
      height: labelHeight
    };
    drawBox(ctx, boxRect, label);

    const labelTextRect = {
      x: -(labelWidth / 2) + labelPadding.left + label.borderWidth / 2,
      y: -(labelHeight / 2) + labelPadding.top + label.borderWidth / 2,
      width: labelTextSize.width,
      height: labelTextSize.height
    };
    drawLabel(ctx, labelTextRect, label);
    ctx.restore();
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
    const properties = inside
      ? limitLineToArea({x, y}, {x: x2, y: y2}, chart.chartArea)
      : {x, y, x2, y2, width: Math.abs(x2 - x), height: Math.abs(y2 - y)};

    const label = options.label;
    if (label && label.content) {
      return loadLabelRect(properties, chart, label);
    }
    return properties;
  }
}

LineAnnotation.id = 'lineAnnotation';
LineAnnotation.defaults = {
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 2,
  display: true,
  endValue: undefined,
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
    position: 'center',
    rotation: 0,
    textAlign: 'center',
    width: undefined,
    xAdjust: 0,
    xPadding: undefined, // TODO: v2 remove support for xPadding
    yAdjust: 0,
    yPadding: undefined, // TODO: v2 remove support for yPadding
  },
  scaleID: undefined,
  value: undefined,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y'
};

LineAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function loadLabelRect(line, chart, options) {
  // TODO: v2 remove support for xPadding and yPadding
  const {padding: lblPadding, xPadding, yPadding, borderWidth} = options;
  const padding = getPadding(lblPadding, xPadding, yPadding);
  const textSize = measureLabelSize(chart.ctx, options);
  const width = textSize.width + padding.width + borderWidth;
  const height = textSize.height + padding.height + borderWidth;
  const labelRect = calculateLabelPosition(line, options, {width, height, padding}, chart.chartArea);
  line.labelX = labelRect.x;
  line.labelY = labelRect.y;
  line.labelWidth = labelRect.width;
  line.labelHeight = labelRect.height;
  line.labelRotation = labelRect.rotation;
  line.labelPadding = padding;
  line.labelTextSize = textSize;
  return line;
}

function calculateAutoRotation(line) {
  const {x, y, x2, y2} = line;
  const rotation = Math.atan2(y2 - y, x2 - x);
  // Flip the rotation if it goes > PI/2 or < -PI/2, so label stays upright
  return rotation > PI / 2 ? rotation - PI : rotation < PI / -2 ? rotation + PI : rotation;
}

// TODO: v2 remove support for xPadding and yPadding
function getPadding(padding, xPadding, yPadding) {
  let tempPadding = padding;
  if (xPadding || yPadding) {
    tempPadding = {x: xPadding || 6, y: yPadding || 6};
  }
  return toPadding(tempPadding);
}

function calculateLabelPosition(line, label, sizes, chartArea) {
  const {width, height, padding} = sizes;
  const {xAdjust, yAdjust} = label;
  const p1 = {x: line.x, y: line.y};
  const p2 = {x: line.x2, y: line.y2};
  const rotation = label.rotation === 'auto' ? calculateAutoRotation(line) : toRadians(label.rotation);
  const size = rotatedSize(width, height, rotation);
  const t = calculateT(line, label, {labelSize: size, padding}, chartArea);
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

function calculateT(line, label, sizes, chartArea) {
  let t;
  const space = spaceAround(line, chartArea);
  if (label.position === 'start') {
    t = calculateTAdjust({w: line.x2 - line.x, h: line.y2 - line.y}, sizes, label, space);
  } else if (label.position === 'end') {
    t = 1 - calculateTAdjust({w: line.x - line.x2, h: line.y - line.y2}, sizes, label, space);
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

function spaceAround(line, chartArea) {
  const {x, x2, y, y2} = line;
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
