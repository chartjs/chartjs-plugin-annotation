export const drawingHooks = ['init', 'afterDraw', 'beforeDraw', 'beforeDrawLabel', 'afterDrawLabel'];

export function init(element, options, properties) {
  invokeHook(options.init, element, properties);
}

export function drawElement(chart, element, caller) {
  if (element.options.drawTime === caller && invokeHook(element.options.beforeDraw, element)) {
    element.draw(chart.ctx);
    invokeHook(element.options.afterDraw, element);
  }
}

export function drawLabelElement(chart, element, caller) {
  if ('drawLabel' in element && element.options.label && (element.options.label.drawTime || element.options.drawTime) === caller && invokeHook(element.options.beforeDrawLabel, element)) {
    element.drawLabel(chart.ctx, chart.chartArea);
    invokeHook(element.options.afterDrawLabel, element);
  }
}

function invokeHook(callback, element, properties) {
  if (typeof callback === 'function') {
    return callback(element.$context, properties);
  }
  return true;
}
