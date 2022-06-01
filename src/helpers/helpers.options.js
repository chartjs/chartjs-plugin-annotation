import {isObject, valueOrDefault, defined, callback} from 'chart.js/helpers';
import {clamp} from './helpers.core';

const animationTypes = {
  xy: (area, {centerX, centerY}) => ({x: centerX, y: centerY, x2: centerX, y2: centerY, width: 0, height: 0}),
  center: (area, {centerX, centerY}) => ({centerX, centerY, radius: 0, width: 0, height: 0}),
};

const isPercentString = (s) => typeof s === 'string' && s.endsWith('%');
const toPercent = (s) => clamp(parseFloat(s) / 100, 0, 1);

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
 * @param {number} to
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
    return toPercent(position) * size;
  }
  return size / 2;
}

/**
 * @param {number} size
 * @param {number|string} value
 * @param {number} to
 * @returns {number}
 */
export function getSize(size, value) {
  if (typeof value === 'number') {
    return value;
  } else if (isPercentString(value)) {
    return toPercent(value) * size;
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
 * @param {LabelPositionObject|string} value
 * @returns {LabelPositionObject}
 */
export function toPosition(value) {
  if (isObject(value)) {
    return {
      x: valueOrDefault(value.x, 'center'),
      y: valueOrDefault(value.y, 'center'),
    };
  }
  value = valueOrDefault(value, 'center');
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
 * @param {string} [type='xy']
 * @returns {AnnotationBoxModel}
 */
export function initAnimationProperties(chart, properties, options, type = 'xy') {
  const initAnim = options.initAnimation;
  if (!initAnim) {
    return;
  } else if (initAnim === true) {
    return applyDefault(chart, properties, type);
  }
  return checkCallbackResult(chart, properties, type, callback(initAnim, [{chart, properties, options}]));
}

function applyDefault(chart, properties, type) {
  const typeImpl = animationTypes[type];
  return typeImpl(chart.chartArea, properties);
}

function checkCallbackResult(chart, properties, type, result) {
  if (result === true) {
    return applyDefault(chart, properties, type);
  } else if (isObject(result)) {
    return result;
  }
}
