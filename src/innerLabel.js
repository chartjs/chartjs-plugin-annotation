import {Chart, DoughnutController} from 'chart.js';
import {clipArea, unclipArea} from 'chart.js/helpers';
import {LabelAnnotation} from './types';
import {updateElements} from './elements';
import {version} from '../package.json';

const chartStates = new Map();

export default {
  id: 'innerlabel',

  version,

  start() {
    Chart.register(LabelAnnotation);
  },

  beforeInit(chart) {
    chartStates.set(chart, {
      controller: undefined,
      annotations: [],
      elements: [],
      visibleElements: [],
      listeners: {},
      listened: false,
      moveListened: false,
      hovered: []
    });
  },

  afterUpdate(chart, args, options) {
    const state = chartStates.get(chart);
    const controller = state.controller = getController(chart);
    if (!controller) {
      return;
    }
    options.type = 'label';
    options.center = getControllerCenter(chart, controller);
    state.annotations = [options];
    updateElements(chart, state, options, args.mode);
    fit(chart, state, options);
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
    ...LabelAnnotation.defaults
  },

  descriptors: {
    _indexable: false,
    _scriptable: true,
  },

  additionalOptionScopes: [`elements.${LabelAnnotation.id}`, '']

};

function getController(chart) {
  for (let i = 0; i < chart.data.datasets.length; i++) {
    const controller = chart.getDatasetMeta(i).controller;
    if (controller instanceof DoughnutController) {
      return controller;
    }
  }
}

function getControllerCenter({chartArea}, controller) {
  return {
    x: (chartArea.left + chartArea.right) / 2 + controller.offsetX,
    y: (chartArea.top + chartArea.bottom) / 2 + controller.offsetY
  };
}

function fit(chart, state, options, mode) {
  const {controller, elements} = state;
  if (!controller || !elements.length) {
    return;
  }
  const element = elements[0];
  const innerRadius = controller.innerRadius;
  const hypotenuse = Math.sqrt(Math.pow(element.width, 2) + Math.pow(element.height, 2));
  const innerDiameter = innerRadius * 2;
  const fitRatio = element._fitRatio = innerDiameter / hypotenuse;
  if (fitRatio < 1) {
    updateElements(chart, state, options, mode);
  }
}

function draw(chart, caller, options) {
  const state = chartStates.get(chart);
  const clip = options.clip;
  const {ctx, chartArea} = chart;
  const {visibleElements} = state;

  if (clip) {
    clipArea(ctx, chartArea);
  }

  for (const element of visibleElements) {
    element.draw(chart.ctx, chartArea);
  }

  if (clip) {
    unclipArea(ctx);
  }
}
