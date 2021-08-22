import {isFinite} from 'chart.js/helpers';

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
