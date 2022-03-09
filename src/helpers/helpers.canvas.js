import {addRoundedRectPath, isArray, toFont, toTRBLCorners, valueOrDefault, toRadians} from 'chart.js/helpers';
import {clampAll} from './helpers.core';
import {calculateTextAlignment, getSize} from './helpers.options';

const widthCache = new Map();

/**
 * Determine if content is an image or a canvas.
 * @param {*} content
 * @returns boolean|undefined
 * @todo move this function to chart.js helpers
 */
export function isImageOrCanvas(content) {
  if (content && typeof content === 'object') {
    const type = content.toString();
    return (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]');
  }
}

/**
 * Set the translation on the canvas if the rotation must be applied.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {{x, y}} point - the point of translation
 * @param {number} rotation - rotation (in degrees) to apply
 */
export function translate(ctx, {x, y}, rotation) {
  if (rotation) {
    ctx.translate(x, y);
    ctx.rotate(toRadians(rotation));
    ctx.translate(-x, -y);
  }
}

/**
 * Apply border options to the canvas context before drawing a shape
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
 * Apply shadow options to the canvas context before drawing a shape
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {Object} options - options with shadow configuration
 */
export function setShadowStyle(ctx, options) {
  ctx.shadowColor = options.backgroundShadowColor;
  ctx.shadowBlur = options.shadowBlur;
  ctx.shadowOffsetX = options.shadowOffsetX;
  ctx.shadowOffsetY = options.shadowOffsetY;
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
  const strokeWidth = options.textStrokeWidth;
  const lines = isArray(content) ? content : [content];
  const mapKey = lines.join() + font.string + strokeWidth + (ctx._measureText ? '-spriting' : '');
  if (!widthCache.has(mapKey)) {
    ctx.save();
    ctx.font = font.string;
    const count = lines.length;
    let width = 0;
    for (let i = 0; i < count; i++) {
      const text = lines[i];
      width = Math.max(width, ctx.measureText(text).width + strokeWidth);
    }
    ctx.restore();
    const height = count * font.lineHeight + strokeWidth;
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
  ctx.save();
  setShadowStyle(ctx, options);
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
    ctx.shadowColor = options.borderShadowColor;
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Draw a label with the size and the styling options.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {{x: number, y: number, width: number, height: number}} rect - rect to map teh label
 * @param {Object} options - options to style the label
 * @returns {undefined}
 */
export function drawLabel(ctx, rect, options) {
  const content = options.content;
  if (isImageOrCanvas(content)) {
    ctx.drawImage(content, rect.x, rect.y, rect.width, rect.height);
    return;
  }
  const labels = isArray(content) ? content : [content];
  const font = toFont(options.font);
  const lh = font.lineHeight;
  const x = calculateTextAlignment(rect, options);
  const y = rect.y + (lh / 2) + options.textStrokeWidth / 2;
  ctx.save();
  ctx.font = font.string;
  ctx.textBaseline = 'middle';
  ctx.textAlign = options.textAlign;
  if (setTextStrokeStyle(ctx, options)) {
    labels.forEach((l, i) => ctx.strokeText(l, x, y + (i * lh)));
  }
  ctx.fillStyle = options.color;
  labels.forEach((l, i) => ctx.fillText(l, x, y + (i * lh)));
  ctx.restore();
}

function setTextStrokeStyle(ctx, options) {
  if (options.textStrokeWidth > 0) {
    // https://stackoverflow.com/questions/13627111/drawing-text-with-an-outer-stroke-with-html5s-canvas
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.lineWidth = options.textStrokeWidth;
    ctx.strokeStyle = options.textStrokeColor;
    return true;
  }
}
