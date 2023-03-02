import {isObject, isFunction, valueOrDefault, defined, callback} from 'chart.js/helpers';
import {clamp} from './helpers.core';

const isPercentString = (s) => typeof s === 'string' && s.endsWith('%');
const toPercent = (s) => parseFloat(s) / 100;
const toPositivePercent = (s) => clamp(toPercent(s), 0, 1);

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import('../../types/element').AnnotationBoxModel } AnnotationBoxModel
 * @typedef { import('../../types/options').AnnotationPointCoordinates } AnnotationPointCoordinates
 * @typedef { import('../../types/label').CoreLabelOptions } CoreLabelOptions
 * @typedef { import('../../types/label').LabelPositionObject } LabelPositionObject
 */

/**
 * @param {number} size
 * @param {number|string} position
 * @returns {number}
 */
export function getRelativePosition(size, position) {
  if (position === 'start') {
    return 0;
  }
  if (position === 'end') {
    return size;
  }
  if (isPercentString(position)) {
    return toPositivePercent(position) * size;
  }
  return size / 2;
}

/**
 * @param {number} size
 * @param {number|string} value
 * @param {boolean} [positivePercent=true]
 * @returns {number}
 */
export function getSize(size, value, positivePercent = true) {
  if (typeof value === 'number') {
    return value;
  } else if (isPercentString(value)) {
    return (positivePercent ? toPositivePercent(value) : toPercent(value)) * size;
  }
  return size;
}

/**
 * @param {{x: number, width: number}} size
 * @param {CoreLabelOptions} options
 * @returns {number}
 */
export function calculateTextAlignment(size, options) {
  const {x, width} = size;
  const textAlign = options.textAlign;
  if (textAlign === 'center') {
    return x + width / 2;
  } else if (textAlign === 'end' || textAlign === 'right') {
    return x + width;
  }
  return x;
}

/**
 * @param {{x: number|string, y: number|string}|string|number} value
 * @param {string|number} defaultValue
 * @returns {{x: number|string, y: number|string}}
 */
export function toPosition(value, defaultValue = 'center') {
  if (isObject(value)) {
    return {
      x: valueOrDefault(value.x, defaultValue),
      y: valueOrDefault(value.y, defaultValue),
    };
  }
  value = valueOrDefault(value, defaultValue);
  return {
    x: value,
    y: value
  };
}

/**
 * @param {AnnotationPointCoordinates} options
 * @returns {boolean}
 */
export function isBoundToPoint(options) {
  return options && (defined(options.xValue) || defined(options.yValue));
}

/**
 * @param {Chart} chart
 * @param {AnnotationBoxModel} properties
 * @param {CoreAnnotationOptions} options
 * @param {boolean} [centerBased=false]
 * @returns {AnnotationBoxModel}
 */
export function initAnimationProperties(chart, properties, options, centerBased = false) {
  const initAnim = options.init;
  if (!initAnim) {
    return;
  } else if (initAnim === true) {
    return applyDefault(properties, centerBased);
  }
  return checkCallbackResult(properties, centerBased, callback(initAnim, [{chart, properties, options}]));
}

/**
 * @param {Object} options
 * @param {Array} hooks
 * @param {Object} hooksContainer
 * @returns {boolean}
 */
export function loadHooks(options, hooks, hooksContainer) {
  let activated = false;
  hooks.forEach(hook => {
    if (isFunction(options[hook])) {
      activated = true;
      hooksContainer[hook] = options[hook];
    } else if (defined(hooksContainer[hook])) {
      delete hooksContainer[hook];
    }
  });
  return activated;
}

function applyDefault({centerX, centerY}, centerBased) {
  if (centerBased) {
    return {centerX, centerY, radius: 0, width: 0, height: 0};
  }
  return {x: centerX, y: centerY, x2: centerX, y2: centerY, width: 0, height: 0};
}

function checkCallbackResult(properties, centerBased, result) {
  if (result === true) {
    return applyDefault(properties, centerBased);
  } else if (isObject(result)) {
    return result;
  }
}
