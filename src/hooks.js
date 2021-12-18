import {callback} from 'chart.js/helpers';

export const elementsHooks = ['afterDraw', 'beforeDraw'];
export const hasLabel = (el) => el && 'drawLabel' in el && el.options && el.options.label;
const isLabelDrawn = (el) => hasLabel(el) ? el._drawLabel : true;

export function updateHooks(chart, state, options) {
  const visibleElements = state.visibleElements || [];
  state.hooked = false;

  elementsHooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.hooked = true;
      state.hooks[hook] = options[hook];
    }
  });

  if (!state.hooked) {
    visibleElements.forEach(scope => {
      if (!state.hooked) {
        elementsHooks.forEach(hook => {
          if (typeof scope.options[hook] === 'function') {
            state.hooked = true;
            resetDrawnStatus(scope);
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
  if (element._draw === false) {
    return false;
  }
  if (state.hooked && !element._drawElement && !element._drawLabel) {
    const result = invokeHook(state, element, 'beforeDraw');
    element._draw = result !== false;
    return result;
  }
}

function afterDraw(state, element) {
  if (state.hooked && element._drawElement && isLabelDrawn(element)) {
    invokeHook(state, element, 'afterDraw');
    resetDrawnStatus(element);
  }
}

function invokeHook(state, element, hook) {
  const callbackHook = element.options[hook] || state.hooks[hook];
  return callback(callbackHook, [element.$context]);
}

function resetDrawnStatus(element) {
  element._draw = true;
  element._drawElement = false;
  element._drawLabel = false;
}
