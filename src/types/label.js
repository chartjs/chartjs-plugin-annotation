import {Element} from 'chart.js';
import {drawBox, drawLabel, measureLabelSize, getChartPoint, toPosition, setBorderStyle, getSize, inBoxRange, isBoundToPoint, resolveBoxProperties, getRelativePosition, translate, rotated, getElementCenterPoint, initAnimationProperties} from '../helpers';
import {toPadding, toRadians, distanceBetweenPoints, defined} from 'chart.js/helpers';

const positions = ['left', 'bottom', 'top', 'right'];

export default class LabelAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    const {x, y} = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-this.rotation));
    return inBoxRange({x, y}, this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), axis, this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    const visible = !defined(this._visible) || this._visible;
    if (!options.display || !options.content || !visible) {
      return;
    }
    ctx.save();
    translate(ctx, this.getCenterPoint(), this.rotation);
    drawCallout(ctx, this);
    drawBox(ctx, this, options);
    drawLabel(ctx, getLabelSize(this), options);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    let point;
    if (!isBoundToPoint(options)) {
      const {centerX, centerY} = resolveBoxProperties(chart, options);
      point = {x: centerX, y: centerY};
    } else {
      point = getChartPoint(chart, options);
    }
    const padding = toPadding(options.padding);
    const labelSize = measureLabelSize(chart.ctx, options);
    const boxSize = measureRect(point, labelSize, options, padding);
    return {
      initProperties: initAnimationProperties(chart, boxSize, options),
      pointX: point.x,
      pointY: point.y,
      ...boxSize,
      rotation: options.rotation
    };
  }
}

LabelAnnotation.id = 'labelAnnotation';

LabelAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundColor: 'transparent',
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderShadowColor: 'transparent',
  borderWidth: 0,
  callout: {
    borderCapStyle: 'butt',
    borderColor: undefined,
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderWidth: 1,
    display: false,
    margin: 5,
    position: 'auto',
    side: 5,
    start: '50%',
  },
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
  init: undefined,
  opacity: undefined,
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
  xMax: undefined,
  xMin: undefined,
  xScaleID: undefined,
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: undefined,
  yValue: undefined,
  z: 0
};

LabelAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function measureRect(point, size, options, padding) {
  const width = size.width + padding.width + options.borderWidth;
  const height = size.height + padding.height + options.borderWidth;
  const position = toPosition(options.position, 'center');
  const x = calculatePosition(point.x, width, options.xAdjust, position.x);
  const y = calculatePosition(point.y, height, options.yAdjust, position.y);

  return {
    x,
    y,
    x2: x + width,
    y2: y + height,
    width,
    height,
    centerX: x + width / 2,
    centerY: y + height / 2
  };
}

function calculatePosition(start, size, adjust = 0, position) {
  return start - getRelativePosition(size, position) + adjust;
}

function drawCallout(ctx, element) {
  const {pointX, pointY, options} = element;
  const callout = options.callout;
  const calloutPosition = callout && callout.display && resolveCalloutPosition(element, callout);
  if (!calloutPosition || isPointInRange(element, callout, calloutPosition)) {
    return;
  }

  ctx.save();
  ctx.beginPath();
  const stroke = setBorderStyle(ctx, callout);
  if (!stroke) {
    return ctx.restore();
  }
  const {separatorStart, separatorEnd} = getCalloutSeparatorCoord(element, calloutPosition);
  const {sideStart, sideEnd} = getCalloutSideCoord(element, calloutPosition, separatorStart);
  if (callout.margin > 0 || options.borderWidth === 0) {
    ctx.moveTo(separatorStart.x, separatorStart.y);
    ctx.lineTo(separatorEnd.x, separatorEnd.y);
  }
  ctx.moveTo(sideStart.x, sideStart.y);
  ctx.lineTo(sideEnd.x, sideEnd.y);
  const rotatedPoint = rotated({x: pointX, y: pointY}, element.getCenterPoint(), toRadians(-element.rotation));
  ctx.lineTo(rotatedPoint.x, rotatedPoint.y);
  ctx.stroke();
  ctx.restore();
}

function getCalloutSeparatorCoord(element, position) {
  const {x, y, x2, y2} = element;
  const adjust = getCalloutSeparatorAdjust(element, position);
  let separatorStart, separatorEnd;
  if (position === 'left' || position === 'right') {
    separatorStart = {x: x + adjust, y};
    separatorEnd = {x: separatorStart.x, y: y2};
  } else {
    //  position 'top' or 'bottom'
    separatorStart = {x, y: y + adjust};
    separatorEnd = {x: x2, y: separatorStart.y};
  }
  return {separatorStart, separatorEnd};
}

function getCalloutSeparatorAdjust(element, position) {
  const {width, height, options} = element;
  const adjust = options.callout.margin + options.borderWidth / 2;
  if (position === 'right') {
    return width + adjust;
  } else if (position === 'bottom') {
    return height + adjust;
  }
  return -adjust;
}

function getCalloutSideCoord(element, position, separatorStart) {
  const {y, width, height, options} = element;
  const start = options.callout.start;
  const side = getCalloutSideAdjust(position, options.callout);
  let sideStart, sideEnd;
  if (position === 'left' || position === 'right') {
    sideStart = {x: separatorStart.x, y: y + getSize(height, start)};
    sideEnd = {x: sideStart.x + side, y: sideStart.y};
  } else {
    //  position 'top' or 'bottom'
    sideStart = {x: separatorStart.x + getSize(width, start), y: separatorStart.y};
    sideEnd = {x: sideStart.x, y: sideStart.y + side};
  }
  return {sideStart, sideEnd};
}

function getCalloutSideAdjust(position, options) {
  const side = options.side;
  if (position === 'left' || position === 'top') {
    return -side;
  }
  return side;
}

function resolveCalloutPosition(element, options) {
  const position = options.position;
  if (positions.includes(position)) {
    return position;
  }
  return resolveCalloutAutoPosition(element, options);
}

function resolveCalloutAutoPosition(element, options) {
  const {x, y, x2, y2, width, height, pointX, pointY, centerX, centerY, rotation} = element;
  const center = {x: centerX, y: centerY};
  const start = options.start;
  const xAdjust = getSize(width, start);
  const yAdjust = getSize(height, start);
  const xPoints = [x, x + xAdjust, x + xAdjust, x2];
  const yPoints = [y + yAdjust, y2, y, y2];
  const result = [];
  for (let index = 0; index < 4; index++) {
    const rotatedPoint = rotated({x: xPoints[index], y: yPoints[index]}, center, toRadians(rotation));
    result.push({
      position: positions[index],
      distance: distanceBetweenPoints(rotatedPoint, {x: pointX, y: pointY})
    });
  }
  return result.sort((a, b) => a.distance - b.distance)[0].position;
}

function getLabelSize({x, y, width, height, options}) {
  const hBorderWidth = options.borderWidth / 2;
  const padding = toPadding(options.padding);
  return {
    x: x + padding.left + hBorderWidth,
    y: y + padding.top + hBorderWidth,
    width: width - padding.left - padding.right - options.borderWidth,
    height: height - padding.top - padding.bottom - options.borderWidth
  };
}

function isPointInRange(element, callout, position) {
  const {pointX, pointY} = element;
  const margin = callout.margin;
  let x = pointX;
  let y = pointY;
  if (position === 'left') {
    x += margin;
  } else if (position === 'right') {
    x -= margin;
  } else if (position === 'top') {
    y += margin;
  } else if (position === 'bottom') {
    y -= margin;
  }
  return element.inRange(x, y);
}
