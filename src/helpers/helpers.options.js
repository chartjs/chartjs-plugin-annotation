import {isObject, valueOrDefault, defined} from 'chart.js/helpers';
import {clamp} from './helpers.core';

const isPercentString = (s) => typeof s === 'string' && s.endsWith('%');
const toPercent = (s) => clamp(parseFloat(s) / 100, 0, 1);

export function getRelativePosition(size, positionOption) {
  if (positionOption === 'start') {
    return 0;
  }
  if (positionOption === 'end') {
    return size;
  }
  if (isPercentString(positionOption)) {
    return toPercent(positionOption) * size;
  }
  return size / 2;
}

export function getSize(size, value) {
  if (typeof value === 'number') {
    return value;
  } else if (isPercentString(value)) {
    return toPercent(value) * size;
  }
  return size;
}

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

export function isBoundToPoint(options) {
  return options && (defined(options.xValue) || defined(options.yValue));
}

/**
 * Loads top level hooks in the state.
 * @param {Object} options - top level options of the plugin
 * @param {Array} hooks - array of option names where hooks are stored
 * @param {Object} hooksContainer - object of the state where the top level options are stored
 * @returns {boolean} true if there is at least a hook, otherwise false
 */
export function loadHooks(options, hooks, hooksContainer) {
  let activated = false;
  hooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      activated = true;
      hooksContainer[hook] = options[hook];
    } else if (defined(hooksContainer[hook])) {
      delete hooksContainer[hook];
    }
  });
  return activated;
}
