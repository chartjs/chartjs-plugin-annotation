import {isObject, valueOrDefault, defined} from 'chart.js/helpers';
import {clamp} from './helpers.core';

const isEnabled = (options) => options && (options.display || options.enabled);
const toPercent = (s, d) => typeof s === 'string' && s.endsWith('%') ? parseFloat(s) / 100 : d;
export const getTPosition = (p, d = 0.5) => clamp(getSize(1, p, d), 0, 1);

export function getSize(size, value, def) {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    return toPercent(value, def || 0) * size;
  }
  return defined(def) ? def : size;
}

export function isLabelVisible(options) {
  return isEnabled(options) && options.content;
}

export function isPointVisible(options) {
  return isEnabled(options) && options.radius > 0.1;
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

function readValueToProps(value, props, defValue) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value)
    ? objProps
      ? prop => valueOrDefault(value[prop], value[props[prop]])
      : prop => value[prop]
    : () => value;

  for (const prop of keys) {
    ret[prop] = valueOrDefault(read(prop), defValue);
  }
  return ret;
}

export function toPosition(value) {
  return readValueToProps(value, ['x', 'y'], 'center');
}

export function isBoundToPoint(options) {
  return options && (defined(options.xValue) || defined(options.yValue));
}
