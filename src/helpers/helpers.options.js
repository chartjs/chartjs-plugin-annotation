import {isObject, isFunction, isArray, toFont, valueOrDefault, defined, callback as invoke} from 'chart.js/helpers';
import {clamp} from './helpers.core';

const isPercentString = (s) => typeof s === 'string' && s.endsWith('%');
const toPercent = (s) => parseFloat(s) / 100;
const toPositivePercent = (s) => clamp(toPercent(s), 0, 1);

const boxAppering = (x, y) => ({x, y, x2: x, y2: y, width: 0, height: 0});
const defaultInitAnimation = {
  box: (properties) => boxAppering(properties.centerX, properties.centerY),
  doughnutLabel: (properties) => boxAppering(properties.centerX, properties.centerY),
  ellipse: (properties) => ({centerX: properties.centerX, centerY: properties.centerX, radius: 0, width: 0, height: 0}),
  label: (properties) => boxAppering(properties.centerX, properties.centerY),
  line: (properties) => boxAppering(properties.x, properties.y),
  point: (properties) => ({centerX: properties.centerX, centerY: properties.centerY, radius: 0, width: 0, height: 0}),
  polygon: (properties) => boxAppering(properties.centerX, properties.centerY)
};

/**
 * @typedef { import('chart.js').FontSpec } FontSpec
 * @typedef { import('chart.js').Point } Point
 * @typedef { import('chart.js').Padding } Padding
 * @typedef { import('../../types/element').AnnotationBoxModel } AnnotationBoxModel
 * @typedef { import('../../types/element').AnnotationElement } AnnotationElement
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
 * @param {Point} point
 * @param {{height: number, width: number}} labelSize
 * @param {{borderWidth: number, position: {LabelPositionObject|string}, xAdjust: number, yAdjust: number}} options
 * @param {Padding|undefined} padding
 * @returns {{x: number, y: number, x2: number, y2: number, height: number, width: number, centerX: number, centerY: number}}
 */
export function measureLabelRectangle(point, labelSize, {borderWidth, position, xAdjust, yAdjust}, padding) {
  const hasPadding = isObject(padding);
  const width = labelSize.width + (hasPadding ? padding.width : 0) + borderWidth;
  const height = labelSize.height + (hasPadding ? padding.height : 0) + borderWidth;
  const positionObj = toPosition(position);
  const x = calculateLabelPosition(point.x, width, xAdjust, positionObj.x);
  const y = calculateLabelPosition(point.y, height, yAdjust, positionObj.y);

  return {
    x,
    y,
    x2: x + width,
    y2: y + height,
    width,
    height,
    centerX: x + width / 2,
    centerY: y + height / 2
  };
}

/**
 * @param {LabelPositionObject|string} value
 * @param {string|number} defaultValue
 * @returns {LabelPositionObject}
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
 * @param {CoreLabelOptions} options
 * @param {number} fitRatio
 * @returns {boolean}
 */
export const shouldFit = (options, fitRatio) => options && options.autoFit && fitRatio < 1;

/**
 * @param {CoreLabelOptions} options
 * @param {number} fitRatio
 * @returns {FontSpec[]}
 */
export function toFonts(options, fitRatio) {
  const optFont = options.font;
  const fonts = isArray(optFont) ? optFont : [optFont];
  if (shouldFit(options, fitRatio)) {
    return fonts.map(function(f) {
      const font = toFont(f);
      font.size = Math.floor(f.size * fitRatio);
      font.lineHeight = f.lineHeight;
      return toFont(font);
    });
  }
  return fonts.map(f => toFont(f));
}

/**
 * @param {AnnotationPointCoordinates} options
 * @returns {boolean}
 */
export function isBoundToPoint(options) {
  return options && (defined(options.xValue) || defined(options.yValue));
}

function calculateLabelPosition(start, size, adjust = 0, position) {
  return start - getRelativePosition(size, position) + adjust;
}

/**
 * @param {Chart} chart
 * @param {AnnotationBoxModel} properties
 * @param {CoreAnnotationOptions} options
 * @returns {AnnotationElement}
 */
export function initAnimationProperties(chart, properties, options) {
  const initAnim = options.init;
  if (!initAnim) {
    return;
  } else if (initAnim === true) {
    return applyDefault(properties, options);
  }
  return execCallback(chart, properties, options);
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

function applyDefault(properties, options) {
  const type = options.type || 'line';
  return defaultInitAnimation[type](properties);
}

function execCallback(chart, properties, options) {
  const result = invoke(options.init, [{chart, properties, options}]);
  if (result === true) {
    return applyDefault(properties, options);
  } else if (isObject(result)) {
    return result;
  }
}
