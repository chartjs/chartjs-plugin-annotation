import {isFinite, toPadding} from 'chart.js/helpers';
import {measureLabelSize} from './helpers.canvas';
import {isBoundToPoint, getRelativePosition, toPosition, initAnimationProperties} from './helpers.options';

const limitedLineScale = {
  xScaleID: {min: 'xMin', max: 'xMax', start: 'left', end: 'right', startProp: 'x', endProp: 'x2'},
  yScaleID: {min: 'yMin', max: 'yMax', start: 'bottom', end: 'top', startProp: 'y', endProp: 'y2'}
};

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import("chart.js").Scale } Scale
 * @typedef { import("chart.js").Point } Point
 * @typedef { import('../../types/element').AnnotationBoxModel } AnnotationBoxModel
 * @typedef { import('../../types/options').CoreAnnotationOptions } CoreAnnotationOptions
 * @typedef { import('../../types/options').LineAnnotationOptions } LineAnnotationOptions
 * @typedef { import('../../types/options').PointAnnotationOptions } PointAnnotationOptions
 * @typedef { import('../../types/options').PolygonAnnotationOptions } PolygonAnnotationOptions
 */

/**
 * @param {Scale} scale
 * @param {number|string} value
 * @param {number} fallback
 * @returns {number}
 */
export function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return isFinite(value) ? scale.getPixelForValue(value) : fallback;
}

/**
 * Search the scale defined in chartjs by the axis related to the annotation options key.
 * @param {{ [key: string]: Scale }} scales
 * @param {CoreAnnotationOptions} options
 * @param {string} key
 * @returns {string}
 */
export function retrieveScaleID(scales, options, key) {
  const scaleID = options[key];
  if (scaleID || key === 'scaleID') {
    return scaleID;
  }
  const axis = key.charAt(0);
  const axes = Object.values(scales).filter((scale) => scale.axis && scale.axis === axis);
  if (axes.length) {
    return axes[0].id;
  }
  return axis;
}

/**
 * @param {Scale} scale
 * @param {{min: number, max: number, start: number, end: number}} options
 * @returns {{start: number, end: number}|undefined}
 */
export function getDimensionByScale(scale, options) {
  if (scale) {
    const reverse = scale.options.reverse;
    const start = scaleValue(scale, options.min, reverse ? options.end : options.start);
    const end = scaleValue(scale, options.max, reverse ? options.start : options.end);
    return {
      start,
      end
    };
  }
}

/**
 * @param {Chart} chart
 * @param {CoreAnnotationOptions} options
 * @returns {Point}
 */
export function getChartPoint(chart, options) {
  const {chartArea, scales} = chart;
  const xScale = scales[retrieveScaleID(scales, options, 'xScaleID')];
  const yScale = scales[retrieveScaleID(scales, options, 'yScaleID')];
  let x = chartArea.width / 2;
  let y = chartArea.height / 2;

  if (xScale) {
    x = scaleValue(xScale, options.xValue, xScale.left + xScale.width / 2);
  }

  if (yScale) {
    y = scaleValue(yScale, options.yValue, yScale.top + yScale.height / 2);
  }
  return {x, y};
}

/**
 * @param {Chart} chart
 * @param {CoreAnnotationOptions} options
 * @returns {AnnotationBoxModel}
 */
export function resolveBoxProperties(chart, options) {
  const scales = chart.scales;
  const xScale = scales[retrieveScaleID(scales, options, 'xScaleID')];
  const yScale = scales[retrieveScaleID(scales, options, 'yScaleID')];

  if (!xScale && !yScale) {
    return {};
  }

  let {left: x, right: x2} = xScale || chart.chartArea;
  let {top: y, bottom: y2} = yScale || chart.chartArea;
  const xDim = getChartDimensionByScale(xScale, {min: options.xMin, max: options.xMax, start: x, end: x2});
  x = xDim.start;
  x2 = xDim.end;
  const yDim = getChartDimensionByScale(yScale, {min: options.yMin, max: options.yMax, start: y2, end: y});
  y = yDim.start;
  y2 = yDim.end;

  return {
    x,
    y,
    x2,
    y2,
    width: x2 - x,
    height: y2 - y,
    centerX: x + (x2 - x) / 2,
    centerY: y + (y2 - y) / 2
  };
}

/**
 * @param {Chart} chart
 * @param {PointAnnotationOptions|PolygonAnnotationOptions} options
 * @returns {AnnotationBoxModel}
 */
export function resolvePointProperties(chart, options) {
  if (!isBoundToPoint(options)) {
    const box = resolveBoxProperties(chart, options);
    let radius = options.radius;
    if (!radius || isNaN(radius)) {
      radius = Math.min(box.width, box.height) / 2;
      options.radius = radius;
    }
    const size = radius * 2;
    const adjustCenterX = box.centerX + options.xAdjust;
    const adjustCenterY = box.centerY + options.yAdjust;
    return {
      x: adjustCenterX - radius,
      y: adjustCenterY - radius,
      x2: adjustCenterX + radius,
      y2: adjustCenterY + radius,
      centerX: adjustCenterX,
      centerY: adjustCenterY,
      width: size,
      height: size,
      radius
    };
  }
  return getChartCircle(chart, options);
}
/**
 * @param {Chart} chart
 * @param {LineAnnotationOptions} options
 * @returns {AnnotationBoxModel}
 */
export function resolveLineProperties(chart, options) {
  const {scales, chartArea} = chart;
  const scale = scales[options.scaleID];
  const area = {x: chartArea.left, y: chartArea.top, x2: chartArea.right, y2: chartArea.bottom};

  if (scale) {
    resolveFullLineProperties(scale, area, options);
  } else {
    resolveLimitedLineProperties(scales, area, options);
  }
  return area;
}

/**
 * @param {Chart} chart
 * @param {CoreAnnotationOptions} options
 * @param {boolean} [centerBased=false]
 * @returns {AnnotationBoxModel}
 */
export function resolveBoxAndLabelProperties(chart, options) {
  const properties = resolveBoxProperties(chart, options);
  properties.initProperties = initAnimationProperties(chart, properties, options);
  properties.elements = [{
    type: 'label',
    optionScope: 'label',
    properties: resolveLabelElementProperties(chart, properties, options),
    initProperties: properties.initProperties
  }];
  return properties;
}

function getChartCircle(chart, options) {
  const point = getChartPoint(chart, options);
  const size = options.radius * 2;
  return {
    x: point.x - options.radius + options.xAdjust,
    y: point.y - options.radius + options.yAdjust,
    x2: point.x + options.radius + options.xAdjust,
    y2: point.y + options.radius + options.yAdjust,
    centerX: point.x + options.xAdjust,
    centerY: point.y + options.yAdjust,
    radius: options.radius,
    width: size,
    height: size
  };
}

function getChartDimensionByScale(scale, options) {
  const result = getDimensionByScale(scale, options) || options;
  return {
    start: Math.min(result.start, result.end),
    end: Math.max(result.start, result.end)
  };
}

function resolveFullLineProperties(scale, area, options) {
  const min = scaleValue(scale, options.value, NaN);
  const max = scaleValue(scale, options.endValue, min);
  if (scale.isHorizontal()) {
    area.x = min;
    area.x2 = max;
  } else {
    area.y = min;
    area.y2 = max;
  }
}

function resolveLimitedLineProperties(scales, area, options) {
  for (const scaleId of Object.keys(limitedLineScale)) {
    const scale = scales[retrieveScaleID(scales, options, scaleId)];
    if (scale) {
      const {min, max, start, end, startProp, endProp} = limitedLineScale[scaleId];
      const dim = getDimensionByScale(scale, {min: options[min], max: options[max], start: scale[start], end: scale[end]});
      area[startProp] = dim.start;
      area[endProp] = dim.end;
    }
  }
}

function calculateX({properties, options}, labelSize, position, padding) {
  const {x: start, x2: end, width: size} = properties;
  return calculatePosition({start, end, size, borderWidth: options.borderWidth}, {
    position: position.x,
    padding: {start: padding.left, end: padding.right},
    adjust: options.label.xAdjust,
    size: labelSize.width
  });
}

function calculateY({properties, options}, labelSize, position, padding) {
  const {y: start, y2: end, height: size} = properties;
  return calculatePosition({start, end, size, borderWidth: options.borderWidth}, {
    position: position.y,
    padding: {start: padding.top, end: padding.bottom},
    adjust: options.label.yAdjust,
    size: labelSize.height
  });
}

function calculatePosition(boxOpts, labelOpts) {
  const {start, end, borderWidth} = boxOpts;
  const {position, padding: {start: padStart, end: padEnd}, adjust} = labelOpts;
  const availableSize = end - borderWidth - start - padStart - padEnd - labelOpts.size;
  return start + borderWidth / 2 + adjust + getRelativePosition(availableSize, position);
}

function resolveLabelElementProperties(chart, properties, options) {
  const label = options.label;
  label.backgroundColor = 'transparent';
  label.callout.display = false;
  const position = toPosition(label.position);
  const padding = toPadding(label.padding);
  const labelSize = measureLabelSize(chart.ctx, label);
  const x = calculateX({properties, options}, labelSize, position, padding);
  const y = calculateY({properties, options}, labelSize, position, padding);
  const width = labelSize.width + padding.width;
  const height = labelSize.height + padding.height;
  return {
    x,
    y,
    x2: x + width,
    y2: y + height,
    width,
    height,
    centerX: x + width / 2,
    centerY: y + height / 2,
    rotation: label.rotation
  };

}
