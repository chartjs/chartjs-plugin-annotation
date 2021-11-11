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
 * Gets the center point an annotation (used by box and text).
 * @param Object element - element where to get the center point
 * @param {boolean} useFinalPosition - use the element's animation target instead of current position
 * @returns {{x: number, y: number}} center point
 */
export function getCenterPoint(element, useFinalPosition) {
  const {x, y, width, height} = element.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
  return {
    x: x + width / 2,
    y: y + height / 2
  };
}
