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
 * @param {Scale} scale
 * @param {{min: number, max: number, start: number, end: number}} options
 * @returns {{start: number, end: number}}
 */
function getChartDimensionByScale(scale, options) {
  const result = getDimensionByScale(scale, options) || options;
  return {
    start: Math.min(result.start, result.end),
    end: Math.max(result.start, result.end)
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
 * @returns {{x?:number, y?: number, x2?: number, y2?: number, width?: number, height?: number}}
 */
export function getChartRect(chart, options) {
  const xScale = chart.scales[options.xScaleID];
  const yScale = chart.scales[options.yScaleID];

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
    height: y2 - y
  };
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
