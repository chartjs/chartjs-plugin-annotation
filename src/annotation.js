import {Animations, Chart, defaults} from 'chart.js';
import {clipArea, unclipArea, isFinite, valueOrDefault, isObject} from 'chart.js/helpers';
import {handleEvent, hooks, updateListeners} from './events';
import BoxAnnotation from './types/box';
import LineAnnotation from './types/line';
import EllipseAnnotation from './types/ellipse';
import PointAnnotation from './types/point';

const chartStates = new Map();

const annotationTypes = {
  box: BoxAnnotation,
  line: LineAnnotation,
  ellipse: EllipseAnnotation,
  point: PointAnnotation
};

Object.keys(annotationTypes).forEach(key => {
  defaults.describe(`elements.${annotationTypes[key].id}`, {
    _fallback: 'plugins.annotation'
  });
});

export default {
  id: 'annotation',

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
      const array = new Array();
      Object.keys(annotationOptions).forEach(key => {
        const value = annotationOptions[key];
        if (isObject(value)) {
          value.id = key;
          array.push(value);
        }
      });
      annotationOptions = array;
    }

    for (const annotation of annotationOptions) {
      annotations.push(resolveAnnotationOptions(annotation));
    }
  },

  afterDataLimits(chart, args) {
    const state = chartStates.get(chart);
    adjustScaleRange(chart, args.scale, state.annotations.filter(a => a.display));
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
  },

  beforeDatasetsDraw(chart) {
    draw(chart, 'beforeDatasetsDraw');
  },

  afterDatasetsDraw(chart) {
    draw(chart, 'afterDatasetsDraw');
  },

  beforeDraw(chart) {
    draw(chart, 'beforeDraw');
  },

  afterDraw(chart) {
    draw(chart, 'afterDraw');
  },

  beforeEvent(chart, args, options) {
    const state = chartStates.get(chart);
    handleEvent(chart, state, args.event, options);
  },

  destroy(chart) {
    chartStates.delete(chart);
  },

  _getState(chart) {
    return chartStates.get(chart);
  },

  defaults: {
    drawTime: 'afterDatasetsDraw',
    dblClickSpeed: 350, // ms
    animation: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height'],
        type: 'number'
      },
    },
  },

  descriptors: {
    _indexable: false,
    _scriptable: (prop) => !hooks.includes(prop),
    annotations: {
      _allKeys: false,
      _fallback: (prop, opts) => `elements.${annotationTypes[opts.type || 'line'].id}`,
    },
  },

  additionalOptionScopes: ['']
};

const directUpdater = {
  update: Object.assign
};


function resolveAnnotationOptions(resolver) {
  const elType = annotationTypes[resolver.type] || annotationTypes.line;
  const result = {};
  for (const name of optionNames(elType)) {
    result[name] = resolver[name];
  }
  return result;
}

function optionNames(type) {
  return ['id', 'type', 'drawTime'].concat(Object.keys(type.defaults), Object.keys(type.defaultRoutes), hooks);
}

function resolveAnimations(chart, animOpts, mode) {
  if (mode === 'reset' || mode === 'none' || mode === 'resize') {
    return directUpdater;
  }
  return new Animations(chart, animOpts);
}

function updateElements(chart, state, options, mode) {
  const animations = resolveAnimations(chart, options.animation, mode);

  const annotations = state.annotations;
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    let el = elements[i];
    const elType = annotationTypes[annotation.type] || annotationTypes.line;
    if (!el || !(el instanceof elType)) {
      el = elements[i] = new elType();
    }
    const properties = el.resolveElementProperties(chart, annotation);
    properties.options = annotation;
    animations.update(el, properties);
  }
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

function draw(chart, caller) {
  const {ctx, chartArea} = chart;
  const state = chartStates.get(chart);
  const elements = state.elements.filter(el => el.options.display);

  clipArea(ctx, chartArea);
  elements.forEach(el => {
    if ((el.options.drawTime || caller) === caller) {
      el.draw(ctx);
    }
  });
  unclipArea(ctx);

  elements.forEach(el => {
    if ('drawLabel' in el && el.options.label && (el.options.label.drawTime || caller) === caller) {
      el.drawLabel(ctx, chartArea);
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
      for (const prop of ['value', 'endValue']) { //
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
