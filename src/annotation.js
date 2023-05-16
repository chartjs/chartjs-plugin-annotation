import {Chart} from 'chart.js';
import {clipArea, unclipArea, isObject, isArray} from 'chart.js/helpers';
import {handleEvent, eventHooks, updateListeners} from './events';
import {invokeHook, elementHooks, updateHooks} from './hooks';
import {adjustScaleRange, verifyScaleOptions} from './scale';
import {updateElements, resolveType, isIndexable} from './elements';
import {annotationTypes} from './types';
import {requireVersion} from './helpers';
import {version} from '../package.json';

const chartStates = new Map();
const hooks = eventHooks.concat(elementHooks);

export default {
  id: 'annotation',

  version,

  beforeRegister() {
    requireVersion('chart.js', '4.0', Chart.version);
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
      moveListened: false,
      hooks: {},
      hooked: false,
      hovered: []
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
    updateHooks(chart, state, options);
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
    if (handleEvent(state, args.event, options)) {
      args.changed = true;
    }
  },

  afterDestroy(chart) {
    chartStates.delete(chart);
  },

  _getState(chart) {
    return chartStates.get(chart);
  },

  defaults: {
    animations: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'centerX', 'centerY', 'pointX', 'pointY', 'radius'],
        type: 'number'
      },
    },
    clip: true,
    interaction: {
      mode: undefined,
      axis: undefined,
      intersect: undefined
    },
    common: {
      drawTime: 'afterDatasetsDraw',
      init: false,
      label: {
      }
    }
  },

  descriptors: {
    _indexable: false,
    _scriptable: (prop) => !hooks.includes(prop) && prop !== 'init',
    annotations: {
      _allKeys: false,
      _fallback: (prop, opts) => `elements.${annotationTypes[resolveType(opts.type)].id}`
    },
    interaction: {
      _fallback: true
    },
    common: {
      label: {
        _indexable: isIndexable,
        _fallback: true
      },
      _indexable: isIndexable
    }
  },

  additionalOptionScopes: ['']
};

function draw(chart, caller, clip) {
  const {ctx, chartArea} = chart;
  const state = chartStates.get(chart);

  if (clip) {
    clipArea(ctx, chartArea);
  }

  const drawableElements = getDrawableElements(state.visibleElements, caller).sort((a, b) => a.element.options.z - b.element.options.z);
  for (const item of drawableElements) {
    drawElement(ctx, chartArea, state, item);
  }

  if (clip) {
    unclipArea(ctx);
  }
}

function getDrawableElements(elements, caller) {
  const drawableElements = [];
  for (const el of elements) {
    if (el.options.drawTime === caller) {
      drawableElements.push({element: el, main: true});
    }
    if (el.elements && el.elements.length) {
      for (const sub of el.elements) {
        if (sub.options.display && sub.options.drawTime === caller) {
          drawableElements.push({element: sub});
        }
      }
    }
  }
  return drawableElements;
}

function drawElement(ctx, chartArea, state, item) {
  const el = item.element;
  if (item.main) {
    invokeHook(state, el, 'beforeDraw');
    el.draw(ctx, chartArea);
    invokeHook(state, el, 'afterDraw');
  } else {
    el.draw(ctx, chartArea);
  }
}
