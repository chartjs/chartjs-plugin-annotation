import {isFinite, isArray, toFont, addRoundedRectPath, toTRBLCorners} from 'chart.js/helpers';

const widthCache = new Map();
const toPercent = (s) => typeof s === 'string' && s.endsWith('%') && parseFloat(s) / 100;

function getImageSize(size, value) {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    return toPercent(value) * size;
  }
  return size;
}

function calculateTextAlignment(size, options) {
  const {x, width} = size;
  const textAlign = options.textAlign;
  if (textAlign === 'center') {
    return x + width / 2;
  } else if (textAlign === 'end' || textAlign === 'right') {
    return x + width;
  }
  return x;
}

export const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

export function clampAll(obj, from, to) {
  for (const key of Object.keys(obj)) {
    obj[key] = clamp(obj[key], from, to);
  }
  return obj;
}

export function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return isFinite(value) ? scale.getPixelForValue(value) : fallback;
}

/**
 * Rotate a `point` relative to `center` point by `angle`
 * @param {{x: number, y: number}} point - the point to rotate
 * @param {{x: number, y: number}} center - center point for rotation
 * @param {number} angle - angle for rotation, in radians
 * @returns {{x: number, y: number}} rotated point
 */
export function rotated(point, center, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var cx = center.x;
  var cy = center.y;

  return {
    x: cx + cos * (point.x - cx) - sin * (point.y - cy),
    y: cy + sin * (point.x - cx) + cos * (point.y - cy)
  };
}

/**
 * Apply border options to the canvas context before drawing a box
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {Object} options - options with border configuration
 * @returns {boolean} true is the border options have been applied
 */
export function setBorderStyle(ctx, options) {
  if (options && options.borderWidth) {
    ctx.lineCap = options.borderCapStyle;
    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.lineJoin = options.borderJoinStyle;
    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    return true;
  }
}

/**
 * Measure the label size using the label options.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {Object} options - options to configure the label
 * @returns {{width: number, height: number}} the measured size of the label
 */
export function measureLabelSize(ctx, options) {
  const content = options.content;
  if (content instanceof Image) {
    return {
      width: getImageSize(content.width, options.width),
      height: getImageSize(content.height, options.height)
    };
  }
  const font = toFont(options.font);
  const lines = isArray(content) ? content : [content];
  const mapKey = lines.join() + font.string;
  if (!widthCache.has(mapKey)) {
    ctx.save();
    ctx.font = font.string;
    const count = lines.length;
    let width = 0;
    for (let i = 0; i < count; i++) {
      const text = lines[i];
      width = Math.max(width, ctx.measureText(text).width);
    }
    ctx.restore();
    const height = count * font.lineHeight;
    widthCache.set(mapKey, {width, height});
  }
  return widthCache.get(mapKey);
}

/**
 * Draw a box with the size and the styling options.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {{x: number, y: number, width: number, height: number}} rect - rect to draw
 * @param {Object} options - options to style the box
 * @returns {undefined}
 */
export function drawBox(ctx, rect, options) {
  const {x, y, width, height} = rect;
  ctx.strokeStyle = options.borderColor;
  ctx.fillStyle = options.backgroundColor;
  const stroke = setBorderStyle(ctx, options);
  ctx.beginPath();
  addRoundedRectPath(ctx, {
    x, y, w: width, h: height,
    radius: clampAll(toTRBLCorners(options.borderRadius), 0, Math.min(width, height) / 2)
  });
  ctx.closePath();
  ctx.fill();
  if (stroke) {
    ctx.stroke();
  }
}

export function isLabelVisible(options) {
  return options && (options.display || options.enabled) && options.content;
}

export function drawLabel(ctx, rect, options) {
  const content = options.content;
  if (content instanceof Image) {
    ctx.drawImage(content, rect.x, rect.y, rect.width, rect.height);
    return;
  }
  const labels = isArray(content) ? content : [content];
  const font = toFont(options.font);
  const lh = font.lineHeight;
  const x = calculateTextAlignment(rect, options);
  const y = rect.y + (lh / 2);
  ctx.font = font.string;
  ctx.textBaseline = 'middle';
  ctx.textAlign = options.textAlign;
  ctx.fillStyle = options.color;
  labels.forEach((l, i) => ctx.fillText(l, x, y + (i * lh)));
}

export function getRectCenterPoint(element, useFinalPosition) {
  const {x, y, width, height} = element.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
  return {
    x: x + width / 2,
    y: y + height / 2
  };
}

export function getChartPoint(chart, options) {
  const {chartArea, scales} = chart;
  const xScale = scales[options.xScaleID];
  const yScale = scales[options.yScaleID];
  let x = chartArea.width / 2;
  let y = chartArea.height / 2;

  if (xScale) {
    x = scaleValue(xScale, options.xValue, x);
  }

  if (yScale) {
    y = scaleValue(yScale, options.yValue, y);
  }
  return {x, y};
}

export function getChartRect(chart, options) {
  const xScale = chart.scales[options.xScaleID];
  const yScale = chart.scales[options.yScaleID];
  let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
  let min, max;

  if (!xScale && !yScale) {
    return {options: {}};
  }

  if (xScale) {
    min = scaleValue(xScale, options.xMin, x);
    max = scaleValue(xScale, options.xMax, x2);
    x = Math.min(min, max);
    x2 = Math.max(min, max);
  }

  if (yScale) {
    min = scaleValue(yScale, options.yMin, y2);
    max = scaleValue(yScale, options.yMax, y);
    y = Math.min(min, max);
    y2 = Math.max(min, max);
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
