import {drawBox, drawLabel, measureLabelSize, getChartPoint, getRectCenterPoint, toPosition, setBorderStyle, getSize, inBoxRange, isBoundToPoint, getChartRect, getRelativePosition, translate, rotated} from '../helpers';
import {toPadding, toRadians, distanceBetweenPoints} from 'chart.js/helpers';
import {Element} from 'chart.js';

export default class LabelAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const {x, y} = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-this.options.rotation));
    return inBoxRange(x, y, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition), this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    if (!this.options.content) {
      return;
    }
    const {labelX, labelY, labelWidth, labelHeight, options} = this;
    ctx.save();
    translate(ctx, this, options.rotation);
    drawCallout(ctx, this);
    drawBox(ctx, this, options);
    drawLabel(ctx, {x: labelX, y: labelY, width: labelWidth, height: labelHeight}, options);
    ctx.restore();
  }

  // TODO: make private in v2
  resolveElementProperties(chart, options) {
    const point = !isBoundToPoint(options) ? getRectCenterPoint(getChartRect(chart, options)) : getChartPoint(chart, options);
    const padding = toPadding(options.padding);
    const labelSize = measureLabelSize(chart.ctx, options);
    const boxSize = measureRect(point, labelSize, options, padding);
    const hBorderWidth = options.borderWidth / 2;
    const properties = {
      pointX: point.x,
      pointY: point.y,
      ...boxSize,
      labelX: boxSize.x + padding.left + hBorderWidth,
      labelY: boxSize.y + padding.top + hBorderWidth,
      labelWidth: labelSize.width,
      labelHeight: labelSize.height
    };
    properties.calloutPosition = options.callout.enabled && resolveCalloutPosition(properties, options.callout, options.rotation);
    return properties;
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
    enabled: false,
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
  padding: 6,
  position: 'center',
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  textAlign: 'center',
  width: undefined,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

LabelAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function measureRect(point, size, options, padding) {
  const width = size.width + padding.width + options.borderWidth;
  const height = size.height + padding.height + options.borderWidth;
  const position = toPosition(options.position);

  return {
    x: calculatePosition(point.x, width, options.xAdjust, position.x),
    y: calculatePosition(point.y, height, options.yAdjust, position.y),
    width,
    height
  };
}

function calculatePosition(start, size, adjust = 0, position) {
  return start - getRelativePosition(size, position) + adjust;
}

function drawCallout(ctx, element) {
  const {pointX, pointY, calloutPosition, options} = element;
  if (element.inRange(pointX, pointY)) {
    return;
  }
  const callout = options.callout;

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
  const rotatedPoint = rotated({x: pointX, y: pointY}, element.getCenterPoint(), toRadians(-options.rotation));
  ctx.lineTo(rotatedPoint.x, rotatedPoint.y);
  ctx.stroke();
  ctx.restore();
}

function getCalloutSeparatorCoord(element, position) {
  const {x, y, width, height} = element;
  const adjust = getCalloutSeparatorAdjust(element, position);
  let separatorStart, separatorEnd;
  if (position === 'left' || position === 'right') {
    separatorStart = {x: x + adjust, y};
    separatorEnd = {x: separatorStart.x, y: separatorStart.y + height};
  } else {
    //  position 'top' or 'bottom'
    separatorStart = {x, y: y + adjust};
    separatorEnd = {x: separatorStart.x + width, y: separatorStart.y};
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

function resolveCalloutPosition(element, options, rotation) {
  const position = options.position;
  if (position === 'left' || position === 'right' || position === 'top' || position === 'bottom') {
    return position;
  }
  return resolveCalloutAutoPosition(element, options, rotation);
}

function resolveCalloutAutoPosition(element, options, rotation) {
  const {x, y, width, height, pointX, pointY} = element;
  const center = {x: x + width / 2, y: y + height / 2};
  const positions = ['left', 'bottom', 'top', 'right'];
  const xPoints = [x, x + width / 2, x + width / 2, x + width];
  const yPoints = [y + height / 2, y + height, y, y + height / 2];
  const result = [];
  for (let index = 0; index < 4; index++) {
    const rotatedPoint = rotated({x: xPoints[index], y: yPoints[index]}, center, toRadians(rotation));
    result.push({
      position: positions[index],
      distance: distanceBetweenPoints(rotatedPoint, {x: pointX, y: pointY})
    });
  }
  const point = result.sort((a, b) => a.distance - b.distance).slice(0, 1)[0];
  return point.position;
}
