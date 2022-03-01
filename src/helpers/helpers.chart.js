import {isFinite} from 'chart.js/helpers';
import {getRectCenterPoint} from './helpers.geometric';
import {isBoundToPoint} from './helpers.options';

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import("chart.js").Scale } Scale
 * @typedef { import("chart.js").Point } Point
 * @typedef { import('../../types/options').CoreAnnotationOptions } CoreAnnotationOptions
 * @typedef { import('../../types/options').PointAnnotationOptions } PointAnnotationOptions
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
 * @param {Scale} scale
 * @param {{start: number, end: number}} options
 * @returns {{start: number, end: number}}
 */
function getChartDimensionByScale(scale, options) {
  if (scale) {
    const min = scaleValue(scale, options.min, options.start);
    const max = scaleValue(scale, options.max, options.end);
    return {
      start: Math.min(min, max),
      end: Math.max(min, max)
    };
  }
  return {
    start: options.start,
    end: options.end
  };
}

/**
 * @param {Chart} chart
 * @param {CoreAnnotationOptions} options
 * @returns {Point}
 */
export function getChartPoint(chart, options) {
  const {chartArea, scales} = chart;
  const xScale = scales[options.xScaleID];
  const yScale = scales[options.yScaleID];
  let x = chartArea.width / 2;
  let y = chartArea.height / 2;

  if (xScale) {
    x = scaleValue(xScale, options.xValue, x);
  }

  if (yScale) {
    y = scaleValue(yScale, options.yValue, y);
  }
  return {x, y};
}

/**
 * @param {Chart} chart
 * @param {CoreAnnotationOptions} options
 * @returns {{x?:number, y?: number, x2?: number, y2?: number, width?: number, height?: number}}
 */
export function getChartRect(chart, options) {
  const xScale = chart.scales[options.xScaleID];
  const yScale = chart.scales[options.yScaleID];
  let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;

  if (!xScale && !yScale) {
    return {};
  }

  const xDim = getChartDimensionByScale(xScale, {min: options.xMin, max: options.xMax, start: x, end: x2});
  x = xDim.start;
  x2 = xDim.end;
  const yDim = getChartDimensionByScale(yScale, {min: options.yMin, max: options.yMax, start: y, end: y2});
  y = yDim.start;
  y2 = yDim.end;

  const properties = {
    x,
    y,
    x2,
    y2,
    width: x2 - x,
    height: y2 - y
  };
  const center = getRectCenterPoint(properties);
  properties.centerX = center.x;
  properties.centerY = center.y;
  return properties;
}

/**
 * @param {Chart} chart
 * @param {PointAnnotationOptions} options
 */
export function getChartCircle(chart, options) {
  const point = getChartPoint(chart, options);
  return {
    x: point.x + options.xAdjust,
    y: point.y + options.yAdjust,
    width: options.radius * 2,
    height: options.radius * 2
  };
}

/**
 * @param {Chart} chart
 * @param {PointAnnotationOptions} options
 * @returns
 */
export function resolvePointPosition(chart, options) {
  if (!isBoundToPoint(options)) {
    const box = getChartRect(chart, options);
    const point = getRectCenterPoint(box);
    let radius = options.radius;
    if (!radius || isNaN(radius)) {
      radius = Math.min(box.width, box.height) / 2;
      options.radius = radius;
    }
    return {
      x: point.x + options.xAdjust,
      y: point.y + options.yAdjust,
      width: radius * 2,
      height: radius * 2
    };
  }
  return getChartCircle(chart, options);
}
