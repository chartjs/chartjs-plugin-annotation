import {Chart} from 'chart.js';
import {clipArea, unclipArea, isObject, isArray} from 'chart.js/helpers';
import {handleEvent, hooks, updateListeners} from './events';
import {adjustScaleRange, verifyScaleOptions} from './scale';
import {updateElements, resolveType} from './elements';
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
      moveListened: false,
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

  destroy(chart) {
    chartStates.delete(chart);
  },

  _getState(chart) {
    return chartStates.get(chart);
  },

  defaults: {
    animations: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'centerX', 'centerY', 'pointX', 'pointY', 'labelX', 'labelY', 'labelWidth', 'labelHeight', 'radius'],
        type: 'number'
      },
    },
    clip: true,
    drawTime: 'afterDatasetsDraw',
    interaction: {
      mode: undefined,
      axis: undefined,
      intersect: undefined
    },
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
    interaction: {
      _fallback: true,
    }
  },

  additionalOptionScopes: ['']
};

function draw(chart, caller, clip) {
  const {ctx, canvas, chartArea} = chart;
  const {visibleElements} = chartStates.get(chart);
  let box = {x: 0, y: 0, width: canvas.width, height: canvas.height};

  if (clip) {
    clipArea(ctx, chartArea);
    box = {x: chartArea.left, y: chartArea.top, width: chartArea.width, height: chartArea.height};
  }

  drawElements(chart, visibleElements, caller, box);

  if (clip) {
    unclipArea(ctx);
  }
}

function drawElements(chart, elements, caller, area) {
  for (const el of elements) {
    if (el.options.drawTime === caller) {
      el.draw(chart.ctx);
    }
    if (el.elements && el.elements.length) {
      const box = 'getBoundingBox' in el ? el.getBoundingBox() : area;
      const labelIsVisible = 'labelIsVisible' in el ? el.labelIsVisible(false, chart.chartArea) : true;
      for (const sub of el.elements) {
        if (sub.options.display && sub.options.drawTime === caller) {
          sub.draw(chart.ctx, box, labelIsVisible);
        }
      }
    }
  }
}
