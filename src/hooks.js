import {callback} from 'chart.js/helpers';
import {loadHooks} from './helpers';

export const elementHooks = ['afterDraw', 'beforeDraw'];
export const hasLabel = (el) => el && 'drawLabel' in el && el.options && el.options.label && el.options.label.enabled && el.options.label.content;

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

export function drawElement(chart, state, element) {
  draw(chart, state, element, {method: 'draw', status: '_drawElement'});
}

export function drawLabelElement(chart, state, element) {
  draw(chart, state, element, {method: 'drawLabel', status: '_drawLabel'});
}

function draw(chart, state, element, options) {
  if (beforeDraw(state, element) === false) {
    return;
  }
  const method = element[options.method];
  method.call(element, chart.ctx, chart.chartArea);
  element[options.status] = true;
  afterDraw(state, element);
}

function beforeDraw(state, element) {
  if (state.hooked && !element._drawElement && !element._drawLabel) {
    return invokeHook(state, element, 'beforeDraw');
  }
}

function afterDraw(state, element) {
  if (state.hooked && element._drawElement && (!hasLabel(element) || element._drawLabel)) {
    invokeHook(state, element, 'afterDraw');
    resetDrawnStatus(element);
  }
}

function invokeHook(state, element, hook) {
  const callbackHook = element.options[hook] || state.hooks[hook];
  return callback(callbackHook, [element.$context]);
}

function resetDrawnStatus(element) {
  element._drawElement = false;
  element._drawLabel = false;
}
