import {getElements} from './interaction';
import {updateActiveElements} from './elements';

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import('../../types/options').AnnotationPluginOptions } AnnotationPluginOptions
 */

/**
 * @param {Chart} chart
 * @param {Object} state
 * @param {ChartEvent} event
 * @param {AnnotationPluginOptions} options
 * @return {boolean|undefined}
 */
export function handleActiveElements(chart, state, event, options) {
  if (options.hover.enabled) {
    switch (event.type) {
    case 'mousemove':
    case 'mouseout':
      return handleMoveEvents(chart, state, event, options);
    default:
    }
  }
}

function handleMoveEvents(chart, state, event, options) {
  let elements;

  if (event.type === 'mousemove') {
    elements = getElements(state, event, options.hover);
  } else {
    elements = [];
  }

  if (!state.activeElements.length && !elements.length) {
    return false;
  }

  const unhovered = state.activeElements.filter((el) => !elements.includes(el));
  setActive(unhovered, false);
  state.activeElements = elements;
  const newHovered = elements.filter((el) => !el.active);
  if (!unhovered.length && !newHovered.length) {
    return false;
  }
  setActive(newHovered, true);
  updateActiveElements(chart, state, options, unhovered.concat(newHovered));
  return true;
}

function setActive(elements, active) {
  const result = active ? elements.filter((el) => !el.active) : elements;
  result.forEach(function(el) {
    el.active = active;
  });
  return result;
}
