import {getElements} from './interaction';
import {hoverElements} from './elements';

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
  setActive(elements, true);
  hoverElements(chart, state, options, unhovered.concat(elements));
  return true;
}

function setActive(elements, active) {
  elements.forEach(function(el) {
    el.active = active;
  });
}
