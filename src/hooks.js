import {isFunction, callback} from 'chart.js/helpers';
import {loadHooks} from './helpers';

/**
 * @typedef { import("chart.js").Chart } Chart
 * @typedef { import('../../types/options').AnnotationPluginOptions } AnnotationPluginOptions
 * @typedef { import('../../types/element').AnnotationElement } AnnotationElement
 */

export const elementHooks = ['afterDraw', 'beforeDraw'];

/**
 * @param {Chart} chart
 * @param {Object} state
 * @param {AnnotationPluginOptions} options
 */
export function updateHooks(chart, state, options) {
  const visibleElements = state.visibleElements;
  state.hooked = loadHooks(options, elementHooks, state.hooks);

  if (!state.hooked) {
    visibleElements.forEach(scope => {
      if (!state.hooked) {
        elementHooks.forEach(hook => {
          if (isFunction(scope.options[hook])) {
            state.hooked = true;
          }
        });
      }
    });
  }
}

/**
 * @param {Object} state
 * @param {AnnotationElement} element
 * @param {string} hook
 */
export function invokeHook(state, element, hook) {
  if (state.hooked) {
    const callbackHook = element.options[hook] || state.hooks[hook];
    return callback(callbackHook, [element.$context]);
  }
}
