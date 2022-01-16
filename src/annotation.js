import {Animations, Chart} from 'chart.js';
import {clipArea, unclipArea, isObject, isArray} from 'chart.js/helpers';
import {handleEvent, hooks, updateListeners} from './events';
import {adjustScaleRange, verifyScaleOptions} from './scale';
import {annotationTypes} from './types';
import {requireVersion} from './helpers';
import {version} from '../package.json';

const chartStates = new Map();

export default {
  id: 'annotation',

  version,

  beforeRegister() {
    requireVersion('chart.js', '3.7', Chart.version);
  },

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
      visibleElements: [],
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
    state.visibleElements = state.elements.filter(el => !el.skip && el.options.display);
  },

  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options.clip);
  },

  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options.clip);
  },

  beforeDraw(chart, _args, options) {
    draw(chart, 'beforeDraw', options.clip);
  },

  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options.clip);
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
    dblClickSpeed: 350, // ms
    drawTime: 'afterDatasetsDraw',
    label: {
      drawTime: null
    }
  },

  descriptors: {
    _indexable: false,
    _scriptable: (prop) => !hooks.includes(prop),
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
    const annotationOptions = annotations[i];
    const element = getOrCreateElement(elements, i, annotationOptions.type);
    const resolver = annotationOptions.setContext(getContext(chart, element, annotationOptions));
    const resolvedOptions = resolveAnnotationOptions(resolver);
    const properties = element.resolveElementProperties(chart, resolvedOptions);

    properties.skip = isNaN(properties.x) || isNaN(properties.y);
    properties.options = resolvedOptions;

    if ('elements' in properties) {
      updateSubElements(element, properties.elements, resolver, animations);
      // Remove the sub-element definitions from properties, so the actual elements
      // are not overwritten by their definitions
      delete properties.elements;
    }

    animations.update(element, properties);
  }
}

function updateSubElements(mainElement, definitions, resolver, animations) {
  const subElements = mainElement.elements || (mainElement.elements = []);
  subElements.length = definitions.length;
  for (let i = 0; i < definitions.length; i++) {
    const definition = definitions[i];
    const properties = definition.properties;
    const subElement = getOrCreateElement(subElements, i, definition.type);
    const subResolver = resolver[definition.optionScope].override(definition);
    properties.options = resolveAnnotationOptions(subResolver);
    animations.update(subElement, properties);
  }
}

function getOrCreateElement(elements, index, type) {
  const elementClass = annotationTypes[resolveType(type)];
  let element = elements[index];
  if (!element || !(element instanceof elementClass)) {
    element = elements[index] = new elementClass();
  }
  return element;
}

function resolveAnnotationOptions(resolver) {
  const elementClass = annotationTypes[resolveType(resolver.type)];
  const result = {};
  result.id = resolver.id;
  result.type = resolver.type;
  result.drawTime = resolver.drawTime;
  Object.assign(result,
    resolveObj(resolver, elementClass.defaults),
    resolveObj(resolver, elementClass.defaultRoutes));
  for (const hook of hooks) {
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
  const {visibleElements} = chartStates.get(chart);

  if (clip) {
    clipArea(ctx, chartArea);
  }

  drawElements(ctx, visibleElements, caller);

  if (clip) {
    unclipArea(ctx);
  }

  drawSubElements(ctx, visibleElements, caller);

  visibleElements.forEach(el => {
    if (!('drawLabel' in el)) {
      return;
    }
    const label = el.options.label;
    if (label && label.enabled && label.content && (label.drawTime || el.options.drawTime) === caller) {
      el.drawLabel(ctx, chartArea);
    }
  });
}

function drawElements(ctx, elements, caller) {
  for (const el of elements) {
    if (el.options.drawTime === caller) {
      el.draw(ctx);
    }
  }
}

function drawSubElements(ctx, elements, caller) {
  for (const el of elements) {
    if (isArray(el.elements)) {
      drawElements(ctx, el.elements, caller);
    }
  }
}
