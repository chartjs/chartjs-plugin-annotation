import {isObject, valueOrDefault, defined} from 'chart.js/helpers';
import {clamp} from './helpers.core';

const animationModes = {
  fade: (area, {centerX, centerY}) => ({x: centerX, y: centerY, x2: centerX, y2: centerY, width: 0, height: 0}),
  left: () => ({x: 0, x2: 0}),
  top: () => ({y: 0, y2: 0}),
  right: (area) => ({x: area.right, x2: area.right}),
  bottom: (area) => ({y: area.bottom, y2: area.bottom}),
  topLeft: () => ({x: 0, x2: 0, y: 0, y2: 0}),
  topRight: (area) => ({x: area.right, x2: area.right, y: 0, y2: 0}),
  bottomLeft: (area) => ({x: 0, x2: 0, y: area.bottom, y2: area.bottom}),
  bottomRight: (area) => ({x: area.right, x2: area.right, y: area.bottom, y2: area.bottom}),
};

const pointAnimationModes = {
  fade: (area, {centerX, centerY}) => ({centerX, centerY, radius: 0, width: 0, height: 0}),
  left: () => ({centerX: 0}),
  top: () => ({centerY: 0}),
  right: (area) => ({centerX: area.right}),
  bottom: (area) => ({centerY: area.bottom}),
  topLeft: () => ({centerX: 0, centerY: 0}),
  topRight: (area) => ({centerX: area.right, centerY: 0}),
  bottomLeft: (area) => ({centerX: 0, centerY: area.bottom}),
  bottomRight: (area) => ({centerX: area.right, centerY: area.bottom}),
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
 * @param {{centerBased: boolean, useRadius: boolean}} [animOpts={centerBased: false, useRadius: false}]
 * @returns {AnnotationBoxModel}
 */
export function initAnimationProperties(chart, properties, options, animOpts = {centerBased: false, useRadius: false}) {
  if (!options.initAnimation) {
    return;
  }
  const {centerBased, useRadius} = animOpts;
  const {mode, fade} = toAnimationMode(options.initAnimation);
  const modes = centerBased ? pointAnimationModes : animationModes;
  const modeImpl = modes[mode];
  if (modeImpl) {
    const animProps = modeImpl(chart.chartArea, properties);
    applyFading(animProps, fade, useRadius);
    return animProps;
  }
}

function toAnimationMode(value) {
  if (isObject(value)) {
    return {
      mode: value.mode,
      fade: value.fade === true,
    };
  }
  return {
    mode: value
  };
}

function applyFading(properties, fade, useRadius) {
  if (fade) {
    if (useRadius) {
      properties.radius = 0;
    } else {
      properties.width = 0;
      properties.height = 0;
    }
  }
}
