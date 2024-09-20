import {toRadians} from 'chart.js/helpers';
import {rotated} from './helpers.geometric';

const isOlderPart = (act, req) => req > act || (act.length > req.length && act.slice(0, req.length) === req);

/**
 * @typedef { import('chart.js').Point } Point
 * @typedef { import('chart.js').InteractionAxis } InteractionAxis
 * @typedef { import('../../types/element').AnnotationElement } AnnotationElement
 */

export const EPSILON = 0.001;
export const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

/**
 * @param {{value: number, start: number, end: number}} limit
 * @param {number} hitSize
 * @returns {boolean}
 */
export const inLimit = (limit, hitSize) => limit.value >= limit.start - hitSize && limit.value <= limit.end + hitSize;

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
 * @param {number} hitSize
 * @returns {boolean}
 */
export function inPointRange(point, center, radius, hitSize) {
  if (!point || !center || radius <= 0) {
    return false;
  }
  return (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius + hitSize, 2);
}

/**
 * @param {Point} point
 * @param {{x: number, y: number, x2: number, y2: number}} rect
 * @param {InteractionAxis} axis
 * @param {{borderWidth: number, hitTolerance: number}} hitsize
 * @returns {boolean}
 */
export function inBoxRange(point, {x, y, x2, y2}, axis, {borderWidth, hitTolerance}) {
  const hitSize = (borderWidth + hitTolerance) / 2;
  const inRangeX = point.x >= x - hitSize - EPSILON && point.x <= x2 + hitSize + EPSILON;
  const inRangeY = point.y >= y - hitSize - EPSILON && point.y <= y2 + hitSize + EPSILON;
  if (axis === 'x') {
    return inRangeX;
  } else if (axis === 'y') {
    return inRangeY;
  }
  return inRangeX && inRangeY;
}

/**
 * @param {Point} point
 * @param {rect: {x: number, y: number, x2: number, y2: number}, center: {x: number, y: number}} element
 * @param {InteractionAxis} axis
 * @param {{rotation: number, borderWidth: number, hitTolerance: number}}
 * @returns {boolean}
 */
export function inLabelRange(point, {rect, center}, axis, {rotation, borderWidth, hitTolerance}) {
  const rotPoint = rotated(point, center, toRadians(-rotation));
  return inBoxRange(rotPoint, rect, axis, {borderWidth, hitTolerance});
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
