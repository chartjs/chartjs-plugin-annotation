const isOlderPart = (act, req) => req > act || (act.length > req.length && act.slice(0, req.length) === req);

/**
 * @typedef { import('chart.js').Point } Point
 * @typedef { import('chart.js').InteractionAxis } InteractionAxis
 * @typedef { import('../../types/element').AnnotationElement } AnnotationElement
 */

/**
 * @const {number} EPSILON - the upper bound on the relative error due to rounding in floating point arithmetic.
 */
export const EPSILON = 0.001;

/**
 * @const {function} clamp - check and adjust the value between a minimum and a maximum.
 * @param {number} x - value to check
 * @param {number} from - minimum value
 * @param {number} to - maximum value
 * @returns {number} - the adjusted value after checking
 */
export const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

/**
 * Checks and adjust all values of an object are between a minimum and a maximum.
 * @param {Object} obj - object to check
 * @param {number} from - minimum value
 * @param {number} to - maximum value
 * @returns {Object} - the object passed as argument with all adjusted values after checking
 */
export function clampAll(obj, from, to) {
  for (const key of Object.keys(obj)) {
    obj[key] = clamp(obj[key], from, to);
  }
  return obj;
}

/**
 * Checks if a point is inside a circle.
 * @param {Point} point - point to check
 * @param {Point} center - center point of the circle
 * @param {number} radius - radius of the circle (in pixels)
 * @param {number} borderWidth - the line width (in pixels) to draw the circle
 * @returns {boolean} - true if the point passed as argument is in the circle otherwise false
 */
export function inPointRange(point, center, radius, borderWidth) {
  if (!point || !center || radius <= 0) {
    return false;
  }
  const hBorderWidth = borderWidth / 2;
  return (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius + hBorderWidth, 2);
}

/**
 * Checks if a point is inside a rectangle.
 * @param {Point} point - point to check
 * @param {{x: number, y: number, x2: number, y2: number}} rect - the dimension of the rectangle, top/left and bottom/right
 * @param {InteractionAxis} axis - the type of direction, used in calculating distances
 * @param {number} borderWidth - the line width (in pixels) to draw the box
 * @returns {boolean} - true if the point passed as argument is in the box otherwise false
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
 * Return the center point of an annotation element.
 * @param {AnnotationElement} element - element instance
 * @param {boolean} useFinalPosition - use the element's animation target instead of current position
 * @returns {Point} - the center point of an annotation element.
 */
export function getElementCenterPoint(element, useFinalPosition) {
  const {centerX, centerY} = element.getProps(['centerX', 'centerY'], useFinalPosition);
  return {x: centerX, y: centerY};
}

/**
 * Check if the version of needed package is compliant with the required one for the plugin.
 * @param {string} pkg - package name to check
 * @param {string} min - required version for the plugin
 * @param {string} ver - the version of the package in use at runtime
 * @param {boolean} [strict=true] - if true and the versions are not matching, an error will be thrown
 * @returns {boolean} - true if the version of the package is compliant with the required one otherwise false
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
