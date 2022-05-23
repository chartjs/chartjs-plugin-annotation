import {callback} from 'chart.js/helpers';
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
          if (typeof scope.options[hook] === 'function') {
            state.hooked = true;
          }
        });
      }
    });
  }
}

/**
 * @param {Chart} chart
 * @param {Object} state
 * @param {{element: AnnotationElement, area: {top: number, left: number, width: number, height: number}, main?: AnnotationElement}} options
 */
export function drawElement(chart, state, item) {
  const {element, area, main} = item;
  const el = main || element;
  el._drawnElements += 1;
  beforeDraw(state, el);
  element.draw(chart.ctx, area);
  afterDraw(state, el);
}

/**
 * @param {Object} state
 */
export function resetCounters(state) {
  state.visibleElements.forEach(function(el) {
    el._drawnElements = 0;
    const subElements = (el.elements || []).filter(item => item.options.display);
    el._drawCount = subElements.length + 1;
  });
}

function beforeDraw(state, el) {
  if (state.hooked && el._drawnElements === 1) {
    invokeHook(state, el, 'beforeDraw');
  }
}

function afterDraw(state, el) {
  if (state.hooked && el._drawnElements === el._drawCount) {
    invokeHook(state, el, 'afterDraw');
  }
}

function invokeHook(state, el, hook) {
  const callbackHook = el.options[hook] || state.hooks[hook];
  callback(callbackHook, [el.$context]);
}
