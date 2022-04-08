import {defined, callback} from 'chart.js/helpers';
import {getElements} from './interaction';

const moveHooks = ['enter', 'leave'];

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import('../../types/options').AnnotationPluginOptions } AnnotationPluginOptions
 */

/**
 * @const {Array} hooks - the list of managed event hooks.
 */
export const hooks = moveHooks.concat('click');

/**
 * Update the state about event management.
 * @param {Chart} chart - the chart where the plugin is enabled
 * @param {Object} state - the state of the plugin
 * @param {AnnotationPluginOptions} options - annotation plugin options
 */
export function updateListeners(chart, state, options) {
  state.listened = false;
  state.moveListened = false;
  state._getElements = getElements; // for testing

  hooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.listened = true;
      state.listeners[hook] = options[hook];
    } else if (defined(state.listeners[hook])) {
      delete state.listeners[hook];
    }
  });
  moveHooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.moveListened = true;
    }
  });

  if (!state.listened || !state.moveListened) {
    state.annotations.forEach(scope => {
      if (!state.listened && typeof scope.click === 'function') {
        state.listened = true;
      }
      if (!state.moveListened) {
        moveHooks.forEach(hook => {
          if (typeof scope[hook] === 'function') {
            state.listened = true;
            state.moveListened = true;
          }
        });
      }
    });
  }
}

/**
 * Handle the chart events.
 * @param {Object} state - the state of the plugin
 * @param {ChartEvent} event - the event we are find things at
 * @param {AnnotationPluginOptions} options - annotation plugin options
 * @return {boolean|undefined} - true to request chart redrawing
 */
export function handleEvent(state, event, options) {
  if (state.listened) {
    switch (event.type) {
    case 'mousemove':
    case 'mouseout':
      return handleMoveEvents(state, event, options);
    case 'click':
      return handleClickEvents(state, event, options);
    default:
    }
  }
}

function handleMoveEvents(state, event, options) {
  if (!state.moveListened) {
    return;
  }

  let elements;

  if (event.type === 'mousemove') {
    elements = getElements(state, event, options.interaction);
  } else {
    elements = [];
  }

  const previous = state.hovered;
  state.hovered = elements;

  const context = {state, event};
  let changed = dispatchMoveEvents(context, 'leave', previous, elements);
  return dispatchMoveEvents(context, 'enter', elements, previous) || changed;
}

function dispatchMoveEvents({state, event}, hook, elements, checkElements) {
  let changed;
  for (const element of elements) {
    if (checkElements.indexOf(element) < 0) {
      changed = dispatchEvent(element.options[hook] || state.listeners[hook], element, event) || changed;
    }
  }
  return changed;
}

function handleClickEvents(state, event, options) {
  const listeners = state.listeners;
  const elements = getElements(state, event, options.interaction);
  let changed;
  for (const element of elements) {
    changed = dispatchEvent(element.options.click || listeners.click, element, event) || changed;
  }
  return changed;
}

function dispatchEvent(handler, element, event) {
  return callback(handler, [element.$context, event]) === true;
}
