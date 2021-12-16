import {Animations, Chart} from 'chart.js';
import {clipArea, unclipArea, isFinite, valueOrDefault, isObject, isArray} from 'chart.js/helpers';
import {handleEvent, eventHooks, updateListeners} from './events';
import {elementHooks, initElement, notifyElementsDraw, drawElement, drawLabelElement} from './hooks';
import {annotationTypes} from './types';
import {version} from '../package.json';

const chartStates = new Map();

export default {
  id: 'annotation',

  version,

  afterRegister() {
    Chart.register(annotationTypes);
  },

  afterUnregister() {
    Chart.unregister(annotationTypes);
  },

  beforeInit(chart) {
    chartStates.set(chart, {
      annotations: [],
      elements: [],
      listeners: {},
      listened: false,
      moveListened: false
    });
  },

  beforeUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    const annotations = state.annotations = [];

    let annotationOptions = options.annotations;
    if (isObject(annotationOptions)) {
      Object.keys(annotationOptions).forEach(key => {
        const value = annotationOptions[key];
        if (isObject(value)) {
          value.id = key;
          annotations.push(value);
        }
      });
    } else if (isArray(annotationOptions)) {
      annotations.push(...annotationOptions);
    }
    verifyScaleOptions(annotations, chart.scales);
  },

  afterDataLimits(chart, args) {
    const state = chartStates.get(chart);
    adjustScaleRange(chart, args.scale, state.annotations.filter(a => a.display && a.adjustScaleRange));
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
  },

  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options.clip);
  },

  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options.clip);
  },

  beforeDraw(chart, _args, options) {
    notifyElementsDraw(chart, chartStates.get(chart), options, 'beforeAnnotationsDraw');
    draw(chart, 'beforeDraw', options.clip);
  },

  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options.clip);
    notifyElementsDraw(chart, chartStates.get(chart), options, 'afterAnnotationsDraw');
  },

  beforeEvent(chart, args, options) {
    const state = chartStates.get(chart);
    handleEvent(state, args.event, options);
  },

  destroy(chart) {
    chartStates.delete(chart);
  },

  _getState(chart) {
    return chartStates.get(chart);
  },

  defaults: {
    animations: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'pointX', 'pointY', 'labelX', 'labelY', 'labelWidth', 'labelHeight', 'radius'],
        type: 'number'
      },
    },
    clip: true,
    drawTime: 'afterDatasetsDraw',
    dblClickSpeed: 350, // ms
    label: {
      drawTime: null
    },
    // hooks
    afterAnnotationsDraw: undefined,
    beforeAnnotationsDraw: undefined
  },

  descriptors: {
    _indexable: false,
    _scriptable: (prop) => !eventHooks.includes(prop) && !elementHooks.includes(prop),
    annotations: {
      _allKeys: false,
      _fallback: (prop, opts) => `elements.${annotationTypes[resolveType(opts.type)].id}`,
    },
  },

  additionalOptionScopes: ['']
};

const directUpdater = {
  update: Object.assign
};

function resolveAnimations(chart, animOpts, mode) {
  if (mode === 'reset' || mode === 'none' || mode === 'resize') {
    return directUpdater;
  }
  return new Animations(chart, animOpts);
}

function resolveType(type = 'line') {
  if (annotationTypes[type]) {
    return type;
  }
  console.warn(`Unknown annotation type: '${type}', defaulting to 'line'`);
  return 'line';
}

function updateElements(chart, state, options, mode) {
  const animations = resolveAnimations(chart, options.animations, mode);

  const annotations = state.annotations;
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    let el = elements[i];
    const elementClass = annotationTypes[resolveType(annotation.type)];
    if (!el || !(el instanceof elementClass)) {
      el = elements[i] = new elementClass();
    }
    const opts = resolveAnnotationOptions(annotation.setContext(getContext(chart, el, annotation)));
    const properties = initElement(chart, el, opts);
    animations.update(el, properties);
  }
}

function resolveAnnotationOptions(resolver) {
  const elementClass = annotationTypes[resolveType(resolver.type)];
  const result = {};
  result.id = resolver.id;
  result.type = resolver.type;
  result.drawTime = resolver.drawTime;
  Object.assign(result, resolveObj(resolver, elementClass.defaults), resolveObj(resolver, elementClass.defaultRoutes));
  for (const hook of eventHooks) {
    result[hook] = resolver[hook];
  }
  return result;
}

function resolveObj(resolver, defs) {
  const result = {};
  for (const name of Object.keys(defs)) {
    const optDefs = defs[name];
    const value = resolver[name];
    result[name] = isObject(optDefs) ? resolveObj(value, optDefs) : value;
  }
  return result;
}

function getContext(chart, element, annotation) {
  return element.$context || (element.$context = Object.assign(Object.create(chart.getContext()), {
    element,
    id: annotation.id,
    type: 'annotation'
  }));
}

function resyncElements(elements, annotations) {
  const count = annotations.length;
  const start = elements.length;

  if (start < count) {
    const add = count - start;
    elements.splice(start, 0, ...new Array(add));
  } else if (start > count) {
    elements.splice(count, start - count);
  }
  return elements;
}

function draw(chart, caller, clip) {
  const {ctx, chartArea} = chart;
  const state = chartStates.get(chart);
  const elements = state.elements.filter(el => !el.skip && el.options.display);

  if (clip) {
    clipArea(ctx, chartArea);
  }
  elements.forEach(el => {
    if (el.options.drawTime === caller) {
      drawElement(chart, el);
    }
  });
  if (clip) {
    unclipArea(ctx);
  }
  elements.forEach(el => {
    if ('drawLabel' in el && el.options.label && (el.options.label.drawTime || el.options.drawTime) === caller) {
      drawLabelElement(chart, el);
    }
  });
}

function adjustScaleRange(chart, scale, annotations) {
  const range = getScaleLimits(scale, annotations);
  let changed = false;
  if (isFinite(range.min) &&
		typeof scale.options.min === 'undefined' &&
		typeof scale.options.suggestedMin === 'undefined') {
    changed = scale.min !== range.min;
    scale.min = range.min;
  }
  if (isFinite(range.max) &&
		typeof scale.options.max === 'undefined' &&
		typeof scale.options.suggestedMax === 'undefined') {
    changed = scale.max !== range.max;
    scale.max = range.max;
  }
  if (changed && typeof scale.handleTickRangeOptions === 'function') {
    scale.handleTickRangeOptions();
  }
}

function getScaleLimits(scale, annotations) {
  const axis = scale.axis;
  const scaleID = scale.id;
  const scaleIDOption = axis + 'ScaleID';
  let min = valueOrDefault(scale.min, Number.NEGATIVE_INFINITY);
  let max = valueOrDefault(scale.max, Number.POSITIVE_INFINITY);
  for (const annotation of annotations) {
    if (annotation.scaleID === scaleID) {
      for (const prop of ['value', 'endValue']) {
        const raw = annotation[prop];
        if (raw) {
          const value = scale.parse(raw);
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
    } else if (annotation[scaleIDOption] === scaleID) {
      for (const prop of [axis + 'Min', axis + 'Max', axis + 'Value']) {
        const raw = annotation[prop];
        if (raw) {
          const value = scale.parse(raw);
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
    }
  }
  return {min, max};
}

function verifyScaleOptions(annotations, scales) {
  for (const annotation of annotations) {
    for (const key of ['scaleID', 'xScaleID', 'yScaleID']) {
      if (annotation[key] && !scales[annotation[key]]) {
        console.warn(`No scale found with id '${annotation[key]}' for annotation '${annotation.id}'`);
      }
    }
  }
}
