import {clipArea, unclipArea} from 'chart.js/helpers';
import {handleEvent, updateListeners} from './events';
import {DoughnutLabelAnnotation} from './types';
import {updateElements} from './elements';
import {version} from '../package.json';

const chartStates = new Map();

export default {
  id: 'innerlabel',

  version,

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
    options.type = 'doughnutLabel';
    state.annotations = [options];
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    updateListeners(chart, state, options);
    updateElements(chart, state, options, args.mode);
    state.visibleElements = state.elements.filter(el => !el.skip && el.options.display);
  },

  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options);
  },

  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options);
  },

  beforeDraw(chart, _args, options) {
    draw(chart, 'beforeDraw', options);
  },

  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options);
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

  defaults: {
    animations: {
      numbers: {
        properties: ['x', 'y', 'x2', 'y2', 'width', 'height', 'centerX', 'centerY', 'pointX', 'pointY'],
        type: 'number'
      },
    },
    clip: true,
    drawTime: 'afterDatasetsDraw',
    interaction: {
      mode: undefined,
      axis: undefined,
      intersect: undefined
    }
  },

  additionalOptionScopes: [`elements.${DoughnutLabelAnnotation.id}`, '']

};

function draw(chart, caller, options) {
  const state = chartStates.get(chart);
  const clip = options.clip;
  const {ctx, chartArea} = chart;
  const {visibleElements} = state;

  if (clip) {
    clipArea(ctx, chartArea);
  }

  for (const element of visibleElements) {
    if (element.options.drawTime === caller) {
      element.draw(chart.ctx, chartArea);
    }
  }

  if (clip) {
    unclipArea(ctx);
  }
}
