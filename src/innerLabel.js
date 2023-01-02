import {DoughnutController} from 'chart.js';
import {drawLabel, measureLabelSize, toFonts, setShadowStyle, isImageOrCanvas} from './helpers';
import {version} from '../package.json';

const chartStates = new Map();

function isVisible(options) {
  return options.display && options.content;
}

function isDrawable(options, caller, state) {
  return isVisible(options) && options.drawTime === caller && state.drawable;
}

function getController(chart) {
  for (let i = 0; i < chart.data.datasets.length; i++) {
    const controller = chart.getDatasetMeta(i).controller;
    if (controller instanceof DoughnutController) {
      return controller;
    }
  }
}

function update(chart, options) {
  if (!isVisible(options)) {
    return;
  }
  const state = chartStates.get(chart);
  const controller = getController(chart);
  state.drawable = !!controller;
  if (!controller) {
    return;
  }
  const {ctx, chartArea} = chart;
  const innerRadius = controller.innerRadius;
  // state.fonts = toFonts(options);
  let size = measureLabelSize(ctx, options);
  const hypotenuse = Math.sqrt(Math.pow(size.width, 2) + Math.pow(size.height, 2));
  const innerDiameter = innerRadius * 2;
  const fitRatio = innerDiameter / hypotenuse;
  if (fitRatio < 1) {
    if (isImageOrCanvas(options.content)) {
      size.width *= fitRatio;
      size.height *= fitRatio;
    } else {
      state.fonts = toFonts(options, fitRatio);
      size = measureLabelSize(ctx, options, state.fonts);
    }
  }
  const centerX = (chartArea.left + chartArea.right) / 2 + controller.offsetX;
  const centerY = (chartArea.top + chartArea.bottom) / 2 + controller.offsetY;
  state.rect = {
    x: centerX - size.width / 2 + options.xAdjust,
    y: centerY - size.height / 2 + options.yAdjust,
    ...size
  };
}

function draw(chart, caller, options) {
  const state = chartStates.get(chart);
  if (!isDrawable(options, caller, state)) {
    return;
  }
  const {fonts, rect} = state;
  const {ctx} = chart;
  ctx.save();
  setShadowStyle(ctx, options);
  drawLabel(ctx, rect, options, fonts);
  ctx.restore();
}

export default {
  id: 'innerlabel',

  version,

  beforeInit(chart) {
    chartStates.set(chart, {
      drawable: true,
      fonts: undefined,
      rect: undefined
    });
  },

  afterUpdate(chart, _args, options) {
    update(chart, options);
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
    color: 'black',
    content: null,
    drawTime: 'beforeDatasetsDraw',
    display: true,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: undefined
    },
    height: undefined,
    shadowBlur: 0,
    shadowColor: 'transparent',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textAlign: 'center',
    textStrokeColor: undefined,
    textStrokeWidth: 0,
    width: undefined,
    xAdjust: 0,
    yAdjust: 0
  },

  descriptors: {
    _indexable: false,
    _scriptable: true,
    _fallback: true
  },

  additionalOptionScopes: ['']

};
