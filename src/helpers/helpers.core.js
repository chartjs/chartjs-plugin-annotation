const isOlderPart = (act, req) => req > act || (act.length > req.length && act.slice(0, req.length) === req);

/**
 * @typedef { import('chart.js').Point } Point
 * @typedef { import('chart.js').InteractionAxis } InteractionAxis
 * @typedef { import('../../types/element').AnnotationElement } AnnotationElement
 */

export const EPSILON = 0.001;
export const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

/**
 * @param {Object} obj
 * @param {number} from
 * @param {number} to
 * @returns {Object}
 */
export function clampAll(obj, from, to) {
  for (const key of Object.keys(obj)) {
    obj[key] = clamp(obj[key], from, to);
  }
  return obj;
}

/**
 * @param {Point} point
 * @param {Point} center
 * @param {number} radius
 * @param {number} borderWidth
 * @returns {boolean}
 */
export function inPointRange(point, center, radius, borderWidth) {
  if (!point || !center || radius <= 0) {
    return false;
  }
  const hBorderWidth = borderWidth / 2;
  return (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius + hBorderWidth, 2);
}

/**
 * @param {Point} point
 * @param {{x: number, y: number, x2: number, y2: number}} rect
 * @param {InteractionAxis} axis
 * @param {number} borderWidth
 * @returns {boolean}
 */
export function inBoxRange(point, {x, y, x2, y2}, axis, borderWidth) {
  const hBorderWidth = borderWidth / 2;
  const inRangeX = point.x >= x - hBorderWidth - EPSILON && point.x <= x2 + hBorderWidth + EPSILON;
  const inRangeY = point.y >= y - hBorderWidth - EPSILON && point.y <= y2 + hBorderWidth + EPSILON;
  if (axis === 'x') {
    return inRangeX;
  } else if (axis === 'y') {
    return inRangeY;
  }
  return inRangeX && inRangeY;
}

/**
 * @param {AnnotationElement} element
 * @param {boolean} useFinalPosition
 * @returns {Point}
 */
export function getElementCenterPoint(element, useFinalPosition) {
  const {centerX, centerY} = element.getProps(['centerX', 'centerY'], useFinalPosition);
  return {x: centerX, y: centerY};
}

/**
 * @param {string} pkg
 * @param {string} min
 * @param {string} ver
 * @param {boolean} [strict=true]
 * @returns {boolean}
 */
export function requireVersion(pkg, min, ver, strict = true) {
  const parts = ver.split('.');
  let i = 0;
  for (const req of min.split('.')) {
    const act = parts[i++];
    if (parseInt(req, 10) < parseInt(act, 10)) {
      break;
    }
    if (isOlderPart(act, req)) {
      if (strict) {
        throw new Error(`${pkg} v${ver} is not supported. v${min} or newer is required.`);
      } else {
        return false;
      }
    }
  }
  return true;
}
