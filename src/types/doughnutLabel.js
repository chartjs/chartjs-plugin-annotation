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
    const controller = getController(chart);
    if (!controller) {
      return {};
    }
    const point = getControllerCenter(chart, controller);
    let labelSize = measureLabelSize(chart.ctx, options);
    const padding = toPadding(options.padding);
    const fitRatio = getFitRatio(controller, options, padding, labelSize);
    if (shouldFit(options, fitRatio)) {
      labelSize = measureLabelSize(chart.ctx, options, fitRatio);
    }
    const boxSize = super._measureRect(point, labelSize, options, padding);
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
  padding: 6,
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

function getController(chart) {
  return chart.getSortedVisibleDatasetMetas().reduce(function(result, value) {
    const controller = value.controller;
    if (controller instanceof DoughnutController &&
      isControllerVisible(chart, value.data.length) &&
      (!result || controller.innerRadius < result.innerRadius)) {
      return controller;
    }
    return result;
  }, undefined);
}

function isControllerVisible(chart, elementsCount) {
  for (let i = 0; i < elementsCount; i++) {
    if (chart.getDataVisibility(i)) {
      return true;
    }
  }
}

function getControllerCenter({chartArea}, controller) {
  return {
    x: (chartArea.left + chartArea.right) / 2 + controller.offsetX,
    y: (chartArea.top + chartArea.bottom) / 2 + controller.offsetY
  };
}

function getFitRatio(controller, options, padding, {width, height}) {
  const w = width + padding.width + options.borderWidth;
  const h = height + padding.height + options.borderWidth;
  const innerRadius = controller.innerRadius;
  const hypotenuse = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
  const innerDiameter = innerRadius * 2;
  return innerDiameter / hypotenuse;
}
