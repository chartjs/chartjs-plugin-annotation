import {isObject, valueOrDefault, defined} from 'chart.js/helpers';
import {clamp} from './helpers.core';

const isPercentString = (s) => typeof s === 'string' && s.endsWith('%');
const toPercent = (s) => clamp(parseFloat(s) / 100, 0, 1);

/**
 * @typedef { import('../../types/label').CoreLabelOptions } CoreLabelOptions
 * @typedef { import('../../types/label').LabelPositionObject } LabelPositionObject
 */

/**
 * Return the position based on the size of the annotation.
 * @param {number} size - size of the annotation element
 * @param {number|string} position - the position option
 * @param {number} to - maximum value
 * @returns {number} - the position based on the size of the annotation
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
 * Check and return a size based on the passed and current one as argument and new value.
 * @param {number} size - size to manage
 * @param {number|string} value - if a number, is new size value, if a string, is the percentage of the passed value.
 * @param {number} to - maximum value
 * @returns {number} - new size
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
 * Return the position of the text of a label by text align option.
 * @param {{x, width}} size - the location and width of the label
 * @param {CoreLabelOptions} options - label options where the text align options is set
 * @returns {number} - position of text in the label
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
 * Normalize the position option for labels.
 * @param {LabelPositionObject|string} value - position value to nornmalize
 * @returns {LabelPositionObject} - normalized position of text in the label
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
 * Check if an annotation is configured to be located by a 'point', thru its options
 * @param {LabelPositionObject|string} options - annotation options to check
 * @returns {boolean} - true if an annotation is configured to be located by a 'point'
 */
export function isBoundToPoint(options) {
  return options && (defined(options.xValue) || defined(options.yValue));
}
