/**
 * @typedef {import('chart.js').Point} Point
 */

/**
 * @param {{x: number, y: number, width: number, height: number}} rect
 * @returns {Point}
 */
export function getRectCenterPoint(rect) {
  const {x, y, width, height} = rect;
  return {
    x: x + width / 2,
    y: y + height / 2
  };
}

/**
 * Rotate a `point` relative to `center` point by `angle`
 * @param {Point} point - the point to rotate
 * @param {Point} center - center point for rotation
 * @param {number} angle - angle for rotation, in radians
 * @returns {Point} rotated point
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
