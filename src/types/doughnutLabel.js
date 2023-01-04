import LabelAnnotation from './label';
import {DoughnutController} from 'chart.js';
import {toPadding} from 'chart.js/helpers';
import {drawBox, drawLabel, measureLabelSize, translate, shouldFit} from '../helpers';

export default class DoughnutLabelAnnotation extends LabelAnnotation {

  draw(ctx) {
    const options = this.options;
    if (!options.display || !options.content) {
      return;
    }
    ctx.save();
    translate(ctx, this.getCenterPoint(), this.rotation);
    drawBox(ctx, this, options);
    drawLabel(ctx, this._getLabelSize(), options, this.fitRatio);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const controller = getController(chart, options);
    if (!controller) {
      return {};
    }
    const {point, radius} = getControllerCenter(chart, controller);
    let labelSize = measureLabelSize(chart.ctx, options);
    const padding = toPadding(options.padding);
    const fitRatio = getFitRatio(chart, {borderWidth: options.borderWidth, padding}, labelSize, radius);
    if (shouldFit(options, fitRatio)) {
      labelSize = measureLabelSize(chart.ctx, options, fitRatio);
    }
    const boxSize = this._measureRect(point, labelSize, options, padding);
    return {
      pointX: point.x,
      pointY: point.y,
      ...boxSize,
      fitRatio,
      rotation: options.rotation
    };
  }
}

DoughnutLabelAnnotation.id = 'doughnutLabelAnnotation';

DoughnutLabelAnnotation.defaults = {
  autoFit: true,
  autoHide: true,
  backgroundColor: 'transparent',
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderShadowColor: 'transparent',
  borderWidth: 0,
  color: 'black',
  content: null,
  display: true,
  font: {
    family: undefined,
    lineHeight: undefined,
    size: undefined,
    style: undefined,
    weight: undefined
  },
  height: undefined,
  padding: 0,
  position: 'center',
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  textAlign: 'center',
  textStrokeColor: undefined,
  textStrokeWidth: 0,
  width: undefined,
  xAdjust: 0,
  yAdjust: 0
};

DoughnutLabelAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function getController(chart, options) {
  return chart.getSortedVisibleDatasetMetas().reduce(function(result, value) {
    const controller = value.controller;
    if (controller instanceof DoughnutController &&
      isControllerVisible(chart, options, value.data.length) &&
      (!result || controller.innerRadius < result.innerRadius)) {
      return controller;
    }
    return result;
  }, undefined);
}

function isControllerVisible(chart, options, elementsCount) {
  if (!options.autoHide) {
    return true;
  }
  for (let i = 0; i < elementsCount; i++) {
    if (chart.getDataVisibility(i)) {
      return true;
    }
  }
}

function getControllerCenter({chartArea}, {innerRadius, offsetX, offsetY}) {
  const {left, top, right, bottom} = chartArea;
  const x = (left + right) / 2 + offsetX;
  const y = (top + bottom) / 2 + offsetY;
  const square = {
    left: Math.max(x - innerRadius, left),
    right: Math.min(x + innerRadius, right),
    top: Math.max(y - innerRadius, top),
    bottom: Math.min(y + innerRadius, bottom)
  };
  const point = {
    x: (square.left + square.right) / 2,
    y: (square.top + square.bottom) / 2
  };
  return {
    point,
    radius: Math.min(innerRadius, Math.min(square.right - square.left, square.bottom - square.top) / 2)
  };
}

function getFitRatio(chart, {borderWidth, padding}, {width, height}, radius) {
  const w = width + padding.width + borderWidth;
  const h = height + padding.height + borderWidth;
  const hypo = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
  return (radius * 2) / hypo;
}
