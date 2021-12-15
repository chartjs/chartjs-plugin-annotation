import {callback as callHook} from 'chart.js/helpers';

export const elementHooks = ['beforeInit', 'afterInit', 'afterDraw', 'beforeDraw', 'beforeDrawLabel', 'afterDrawLabel'];

export function initElement(chart, element, options) {
  const args = {
    element,
    options
  };
  const argsHook = [element.$context];

  callHook(options.beforeInit, argsHook);
  chart.notifyPlugins('beforeAnnotationInit', args);

  const properties = element.resolveElementProperties(chart, options);

  args.properties = properties;
  argsHook.push(properties);
  callHook(options.afterInit, argsHook);
  chart.notifyPlugins('afterAnnotationInit', args);

  return properties;
}

export function drawElement(chart, element) {
  invokeDrawHook(chart, element, {
    elementHook: 'draw',
    optionsHook: 'Draw',
    pluginHook: 'AnnotationDraw'
  });
}

export function drawLabelElement(chart, element) {
  invokeDrawHook(chart, element, {
    elementHook: 'drawLabel',
    optionsHook: 'DrawLabel',
    pluginHook: 'AnnotationLabelDraw'
  });
}

function invokeDrawHook(chart, element, hooks) {
  const {elementHook, optionsHook, pluginHook} = hooks;
  const args = {
    cancelable: true,
    element
  };
  const argsHook = [element.$context];

  if (callHook(element.options['before' + optionsHook], argsHook) === false || chart.notifyPlugins('before' + pluginHook, args) === false) {
    return;
  }

  const callback = element[elementHook];
  callback.call(element, chart.ctx, chart.chartArea);

  args.cancelable = false;
  callHook(element.options['after' + optionsHook], argsHook);
  chart.notifyPlugins('after' + pluginHook, args);
}
