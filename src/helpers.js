import {isFinite} from 'chart.js/helpers';

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
  if (ctx && options && options.borderWidth) {
    ctx.lineCap = options.borderCapStyle;
    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.lineJoin = options.borderJoinStyle;
    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    return true;
  }
}
