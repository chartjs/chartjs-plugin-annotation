import {isFinite} from 'chart.js/helpers';
import {isBoundToPoint} from './helpers.options';

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import("chart.js").Scale } Scale
 * @typedef { import("chart.js").Point } Point
 * @typedef { import('../../types/element').AnnotationBoxModel } AnnotationBoxModel
 * @typedef { import('../../types/options').CoreAnnotationOptions } CoreAnnotationOptions
 * @typedef { import('../../types/options').PointAnnotationOptions } PointAnnotationOptions
 * @typedef { import('../../types/options').PolygonAnnotationOptions } PolygonAnnotationOptions
 */

/**
 * Return the location of the given data point.
 * @param {Scale} scale - the scale instance
 * @param {number|string} value - value can either be an index or a numerical or string value
 * @param {number} fallback - default location if the location of the given data point is not consistent
 * @returns {number} - the location of the given data point
 */
export function scaleValue(scale, value, fallback) {
  value = typeof value === 'number' ? value : scale.parse(value);
  return isFinite(value) ? scale.getPixelForValue(value) : fallback;
}

/**
 * Search the scale defined in chartjs by the axis related to the annotation options key.
 * @param {Object} scales - chartjs object with all scales
 * @param {Object} options - plugin options
 * @param {string} key - annotation plugin scale id option key
 * @returns {string} - the unique scale defined in chartjs or the key passed as argument
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
 * Return the dimension of annotation by scale.
 * @param {Scale} scale - the scale instance
 * @param {{min: number, max: number, start: number, end: number}} options - box definition with values
 * @returns {{start: number, end: number}|undefined} - the dimension of annotation or undefined if scale instance not consistent
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
 * Return a point in chart area by the annotation options.
 * @param {Chart} chart - chart instance
 * @param {CoreAnnotationOptions} options - annotation options
 * @returns {Point} - a point in chart area
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
 * Return a model calculated by the box options
 * @param {Chart} chart - chart instance
 * @param {CoreAnnotationOptions} options - annotation options
 * @returns {AnnotationBoxModel} - a annotation box model
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
 * Return a model calculated by the point options
 * @param {Chart} chart - chart instance
 * @param {PointAnnotationOptions|PolygonAnnotationOptions} options - annotation options
 * @returns {AnnotationBoxModel} - a annotation box model
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
    return {
      x: box.x + options.xAdjust,
      y: box.y + options.yAdjust,
      x2: box.x + size + options.xAdjust,
      y2: box.y + size + options.yAdjust,
      centerX: box.centerX + options.xAdjust,
      centerY: box.centerY + options.yAdjust,
      width: size,
      height: size
    };
  }
  return getChartCircle(chart, options);
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
