import {Animations, Chart} from 'chart.js';
import {clipArea, unclipArea, isFinite, merge, valueOrDefault, callback as callCallback, isObject} from 'chart.js/helpers';
import {handleEvent, updateListeners} from './events';
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
      elements: [],
      listeners: {},
      listened: false,
      moveListened: false,
      scales: new Set()
    });
  },

  afterDataLimits(chart, args, options) {
    if (args.scale.type !== 'category') {
      adjustScaleRange(chart, args.scale, options);
    }
  },

  beforeUpdate(chart, args, options) {
    if (isObject(options.annotations)) {
      const array = new Array();
      Object.keys(options.annotations).forEach(key => {
        const value = options.annotations[key];
        if (isObject(value)) {
          value.id = key;
          array.push(value);
        }
      });
      options.annotations = array;
    }
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
  },

  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, options, 'beforeDatasetsDraw');
  },

  afterDatasetsDraw(chart, _args, options) {
    draw(chart, options, 'afterDatasetsDraw');
  },

  beforeDraw(chart, _args, options) {
    draw(chart, options, 'beforeDraw');
  },

  afterDraw(chart, _args, options) {
    draw(chart, options, 'afterDraw');
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
    annotations: {},
    animation: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height'],
        type: 'number'
      },
    }
  },
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

function isAnnotationVisible(chart, options, element) {
  const display = typeof options.display === 'function' ? callCallback(options.display, [{chart, element}]) : valueOrDefault(options.display, true);
  return !!display;
}

function updateElements(chart, state, options, mode) {
  const chartAnims = chart.options.animation;
  const animOpts = chartAnims && merge({}, [chartAnims, options.animation]);
  const animations = resolveAnimations(chart, animOpts, mode);

  const annotations = options.annotations || [];
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    let el = elements[i];
    const elType = annotationTypes[annotation.type] || annotationTypes.line;
    if (!el || !(el instanceof elType)) {
      el = elements[i] = new elType();
    }
    const mergedOptions = merge(Object.create(null), [chart.options.elements[elType.id], annotation]);
    const properties = el.resolveElementProperties(chart, mergedOptions);
    properties.options = mergedOptions;
    animations.update(el, properties);
    el._display = isAnnotationVisible(chart, annotation, el);
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

function draw(chart, options, caller) {
  const {ctx, chartArea} = chart;
  const elements = chartStates.get(chart).elements.filter(el => el._display);

  clipArea(ctx, chartArea);
  elements.forEach(el => {
    if ((el.options.drawTime || options.drawTime || caller) === caller) {
      el.draw(ctx);
    }
  });
  unclipArea(ctx);

  elements.forEach(el => {
    if ('drawLabel' in el && el.options.label && (el.options.label.drawTime || el.options.drawTime || options.drawTime || caller) === caller) {
      el.drawLabel(ctx, chartArea);
    }
  });
}

function getAnnotationOptions(chart, options) {
  if (options.annotations && options.annotations.length) {
    return options.annotations.filter(annotation => isAnnotationVisible(chart, annotation));
  }
  return [];
}

function adjustScaleRange(chart, scale, options) {
  const annotations = getAnnotationOptions(chart, options);
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
  const scaleIDOption = scale.axis + 'ScaleID';
  const scaleAnnotations = annotations.filter(annotation => annotation[scaleIDOption] === scaleID || annotation.scaleID === scaleID);
  let min = valueOrDefault(scale.min, Number.NEGATIVE_INFINITY);
  let max = valueOrDefault(scale.max, Number.POSITIVE_INFINITY);
  scaleAnnotations.forEach(annotation => {
    ['value', 'endValue', axis + 'Min', axis + 'Max', 'xValue', 'yValue'].forEach(prop => {
      if (prop in annotation) {
        const value = scale.parse(annotation[prop]);
        min = Math.min(min, value);
        max = Math.max(max, value);
      }
    });
  });
  return {min, max};
}
