import {callback as callHook} from 'chart.js/helpers';

export const drawingHooks = ['init', 'afterDraw', 'beforeDraw', 'beforeDrawLabel', 'afterDrawLabel'];

export function init(chart, element, options, properties) {
  const args = {
    element,
    properties
  };
  chart.notifyPlugins('initAnnotation', args);
  callHook(options.init, [element.$context, properties]);
}

export function drawElement(chart, element, caller) {
  if (element.options.drawTime === caller) {
    const args = {
      element
    };
    const argsHook = [element.$context];
    if (chart.notifyPlugins('afterDrawAnnotation', args) === false || callHook(element.options.beforeDraw, argsHook) === false) {
      return;
    }
    element.draw(chart.ctx);
    chart.notifyPlugins('afterDrawAnnotation', args);
    callHook(element.options.afterDraw, argsHook);
  }
}

export function drawLabelElement(chart, element, caller) {
  if ('drawLabel' in element && element.options.label && (element.options.label.drawTime || element.options.drawTime) === caller) {
    const args = {
      element
    };
    const argsHook = [element.$context];
    if (chart.notifyPlugins('beforeDrawAnnotationLabel', args) === false || callHook(element.options.beforeDrawLabel, argsHook) === false) {
      return;
    }
    element.drawLabel(chart.ctx, chart.chartArea);
    chart.notifyPlugins('afterDrawAnnotationLabel', args);
    callHook(element.options.afterDrawLabel, argsHook);
  }
}
