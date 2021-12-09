import {addRoundedRectPath, drawPoint as drawPointOnChart, isArray, toFont, toTRBLCorners, valueOrDefault} from 'chart.js/helpers';
import {clampAll} from './helpers.core';
import {calculateTextAlignment, getSize, isLabelVisible, isPointVisible} from './helpers.options';

const widthCache = new Map();

function isImageOrCanvas(content) {
  return content instanceof Image || content instanceof HTMLCanvasElement;
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
  if (isImageOrCanvas(content)) {
    return {
      width: getSize(content.width, options.width),
      height: getSize(content.height, options.height)
    };
  }
  const font = toFont(options.font);
  const lines = isArray(content) ? content : [content];
  const mapKey = lines.join() + font.string + (ctx._measureText ? '-spriting' : '');
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

export function drawPoint(ctx, point, options) {
  if (!isPointVisible(options)) {
    return;
  }
  ctx.save();
  ctx.fillStyle = options.backgroundColor;
  setBorderStyle(ctx, options);
  drawPointOnChart(ctx, options, point.x, point.y);
  ctx.restore();
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
  ctx.save();
  const stroke = setBorderStyle(ctx, options);
  ctx.fillStyle = options.backgroundColor;
  ctx.beginPath();
  addRoundedRectPath(ctx, {
    x, y, w: width, h: height,
    // TODO: v2 remove support for cornerRadius
    radius: clampAll(toTRBLCorners(valueOrDefault(options.cornerRadius, options.borderRadius)), 0, Math.min(width, height) / 2)
  });
  ctx.closePath();
  ctx.fill();
  if (stroke) {
    ctx.stroke();
  }
  ctx.restore();
}

export function drawLabel(ctx, rect, options) {
  if (!isLabelVisible(options)) {
    return;
  }
  const content = options.content;
  if (isImageOrCanvas(content)) {
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
