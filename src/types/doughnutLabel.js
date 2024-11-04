import {Element, DoughnutController} from 'chart.js';
import {drawLabel, measureLabelSize, translate, shouldFit, inLabelRange, getElementCenterPoint, measureLabelRectangle, setBorderStyle, initAnimationProperties} from '../helpers';
import {TAU, getAngleFromPoint} from 'chart.js/helpers';

export default class DoughnutLabelAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    return inLabelRange(
      {x: mouseX, y: mouseY},
      {rect: this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), center: this.getCenterPoint(useFinalPosition)},
      axis,
      {rotation: this.rotation, borderWidth: 0, hitTolerance: this.options.hitTolerance}
    );
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    if (!options.display || !options.content) {
      return;
    }
    drawBackground(ctx, this);
    ctx.save();
    translate(ctx, this.getCenterPoint(), this.rotation);
    drawLabel(ctx, this, options, this._fitRatio);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const meta = getDatasetMeta(chart, options);
    if (!meta) {
      return {};
    }
    const {controllerMeta, point, radius} = getControllerMeta(chart, options, meta);
    let labelSize = measureLabelSize(chart.ctx, options);
    const _fitRatio = getFitRatio(labelSize, radius);
    if (shouldFit(options, _fitRatio)) {
      labelSize = {width: labelSize.width * _fitRatio, height: labelSize.height * _fitRatio};
    }
    const {position, xAdjust, yAdjust} = options;
    const boxSize = measureLabelRectangle(point, labelSize, {borderWidth: 0, position, xAdjust, yAdjust});
    return {
      initProperties: initAnimationProperties(chart, boxSize, options),
      ...boxSize,
      ...controllerMeta,
      rotation: options.rotation,
      _fitRatio
    };
  }
}

DoughnutLabelAnnotation.id = 'doughnutLabelAnnotation';

DoughnutLabelAnnotation.defaults = {
  autoFit: true,
  autoHide: true,
  backgroundColor: 'transparent',
  backgroundShadowColor: 'transparent',
  borderColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
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
  hitTolerance: 0,
  init: undefined,
  opacity: undefined,
  position: 'center',
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  spacing: 1,
  textAlign: 'center',
  textStrokeColor: undefined,
  textStrokeWidth: 0,
  width: undefined,
  xAdjust: 0,
  yAdjust: 0
};

DoughnutLabelAnnotation.defaultRoutes = {
};

function getDatasetMeta(chart, options) {
  return chart.getSortedVisibleDatasetMetas().reduce(function(result, value) {
    const controller = value.controller;
    if (controller instanceof DoughnutController &&
      isControllerVisible(chart, options, value.data) &&
      (!result || controller.innerRadius < result.controller.innerRadius) &&
      controller.options.circumference >= 90) {
      return value;
    }
    return result;
  }, undefined);
}

function isControllerVisible(chart, options, elements) {
  if (!options.autoHide) {
    return true;
  }
  for (let i = 0; i < elements.length; i++) {
    if (!elements[i].hidden && chart.getDataVisibility(i)) {
      return true;
    }
  }
}

function getControllerMeta({chartArea}, options, meta) {
  const {left, top, right, bottom} = chartArea;
  const {innerRadius, offsetX, offsetY} = meta.controller;
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
  const space = options.spacing + options.borderWidth / 2;
  const _radius = Math.max(innerRadius - space, 0);
  const _counterclockwise = point.y > y;
  const side = _counterclockwise ? top + space : bottom - space;
  const angles = getAngles(side, x, y, _radius);
  const controllerMeta = {
    _centerX: x,
    _centerY: y,
    _radius,
    _counterclockwise,
    ...angles
  };
  return {
    controllerMeta,
    point,
    radius: Math.min(_radius, Math.min(square.right - square.left, square.bottom - square.top) / 2)
  };
}

function getFitRatio({width, height}, radius) {
  const hypo = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  return (radius * 2) / hypo;
}

function getAngles(y, centerX, centerY, radius) {
  const yk2 = Math.pow(centerY - y, 2);
  const r2 = Math.pow(radius, 2);
  const b = centerX * -2;
  const c = Math.pow(centerX, 2) + yk2 - r2;
  const delta = Math.pow(b, 2) - (4 * c);
  if (delta <= 0) {
    return {
      _startAngle: 0,
      _endAngle: TAU
    };
  }
  const start = (-b - Math.sqrt(delta)) / 2;
  const end = (-b + Math.sqrt(delta)) / 2;
  return {
    _startAngle: getAngleFromPoint({x: centerX, y: centerY}, {x: start, y}).angle,
    _endAngle: getAngleFromPoint({x: centerX, y: centerY}, {x: end, y}).angle
  };
}

function drawBackground(ctx, element) {
  const {_centerX, _centerY, _radius, _startAngle, _endAngle, _counterclockwise, options} = element;
  ctx.save();
  const stroke = setBorderStyle(ctx, options);
  ctx.fillStyle = options.backgroundColor;
  ctx.beginPath();
  ctx.arc(_centerX, _centerY, _radius, _startAngle, _endAngle, _counterclockwise);
  ctx.closePath();
  ctx.fill();
  if (stroke) {
    ctx.stroke();
  }
  ctx.restore();
}
