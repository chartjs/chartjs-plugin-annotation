import {Element, defaults} from 'chart.js';
import {isArray, toFontString, toRadians} from 'chart.js/helpers';
import {scaleValue, roundedRect, rotated} from '../helpers';

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;

export default class LineAnnotation extends Element {
  intersects(x, y, epsilon) {
    epsilon = epsilon || 0.001;
    const me = this;
    const p1 = {x: me.x, y: me.y};
    const p2 = {x: me.x2, y: me.y2};
    const dy = interpolateY(x, p1, p2);
    const dx = interpolateX(y, p1, p2);
    return (
      (!isFinite(dy) || Math.abs(y - dy) < epsilon) &&
			(!isFinite(dx) || Math.abs(x - dx) < epsilon)
    );
  }

  labelIsVisible() {
    const label = this.options.label;
    return label && label.enabled && label.content;
  }

  isOnLabel(mouseX, mouseY) {
    const {labelRect} = this;

    if (!labelRect) {
      return false;
    }

    const {x, y} = rotated({x: mouseX, y: mouseY}, labelRect, -labelRect.angle);
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

    if (ctx.setLineDash) {
      ctx.setLineDash(options.borderDash);
    }
    ctx.lineDashOffset = options.borderDashOffset;

    // Draw
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.restore();
  }

  drawLabel(ctx) {
    if (this.labelIsVisible()) {
      ctx.save();
      drawLabel(ctx, this);
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
    return {
      x,
      y,
      x2,
      y2,
      width: x2 - x,
      height: y2 - y
    };
  }
}

LineAnnotation.id = 'lineAnnotation';
LineAnnotation.defaults = {
  display: true,
  borderDash: [],
  borderDashOffset: 0,
  label: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    font: {
      family: defaults.font.family,
      size: defaults.font.size,
      style: 'bold',
      color: '#fff',
    },
    xPadding: 6,
    yPadding: 6,
    rotation: 0,
    cornerRadius: 6,
    position: 'center',
    xAdjust: 0,
    yAdjust: 0,
    enabled: false,
    content: null
  }
};

function calculateAutoRotation(line) {
  const {x, y, x2, y2} = line;
  return Math.atan2(y2 - y, x2 - x);
}

function drawLabel(ctx, line) {
  const label = line.options.label;

  ctx.font = toFontString(label.font);
  ctx.textAlign = 'center';

  const {width, height} = measureLabel(ctx, label);
  const rotation = label.rotation === 'auto' ? calculateAutoRotation(line) : toRadians(label.rotation);

  line.labelRect = calculateLabelPosition(line, width, height, rotation);

  ctx.translate(line.labelRect.x, line.labelRect.y);
  ctx.rotate(rotation);

  ctx.fillStyle = label.backgroundColor;
  roundedRect(ctx, -(width / 2), -(height / 2), width, height, label.cornerRadius);
  ctx.fill();

  ctx.fillStyle = label.font.color;
  if (isArray(label.content)) {
    let textYPosition = -(height / 2) + label.yPadding;
    for (let i = 0; i < label.content.length; i++) {
      ctx.textBaseline = 'top';
      ctx.fillText(
        label.content[i],
        -(width / 2) + (width / 2),
        textYPosition
      );
      textYPosition += label.font.size + label.yPadding;
    }
  } else {
    ctx.textBaseline = 'middle';
    ctx.fillText(label.content, 0, 0);
  }
}

const widthCache = new Map();
function measureLabel(ctx, label) {
  const content = label.content;
  const lines = isArray(content) ? content : [content];
  const count = lines.length;
  let width = 0;
  for (let i = 0; i < count; i++) {
    const text = lines[i];
    if (!widthCache.has(text)) {
      widthCache.set(text, ctx.measureText(text).width);
    }
    width = Math.max(width, widthCache.get(text));
  }
  width += 2 * label.xPadding;

  return {
    width,
    height: count * label.font.size + ((count + 1) * label.yPadding)
  };
}

function calculateLabelPosition(line, width, height, angle) {
  const label = line.options.label;
  const {xAdjust, yAdjust, position} = label;
  const p1 = {x: line.x, y: line.y};
  const p2 = {x: line.x2, y: line.y2};
  const start = position === 'start';
  const end = position === 'end';
  const tadj = calculateTAdjust(line, width, height, angle);
  const t = start ? 0 + tadj : end ? 1 - tadj : 0.5;
  const pt = pointInLine(p1, p2, t);

  return {
    x: pt.x + xAdjust,
    y: pt.y + yAdjust,
    width,
    height,
    angle
  };
}

function calculateTAdjust(line, width, height, angle) {
  const label = line.options.label;
  const {xPadding, yPadding} = label;
  const w = line.x2 - line.x;
  const h = line.y2 - line.y;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const rotatedHeight = Math.abs(width * sin) + Math.abs(height * cos);
  const rotatedWidth = Math.abs(width * cos) + Math.abs(height * sin);
  const y = h && ((rotatedHeight / 2 + yPadding) / h);
  const x = w && ((rotatedWidth / 2 + xPadding) / w);
  return Math.max(x, y);
}
