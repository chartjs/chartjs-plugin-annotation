import {clamp, drawBox, drawLabel, drawPoint, measureLabelSize, isLabelVisible, getChartPoint, getRectCenterPoint, toPosition, setBorderStyle, getSize, inBoxRange, inPointRange, isBoundToPoint, getChartRect, isPointVisible, getTPosition} from '../helpers';
import {color, toPadding} from 'chart.js/helpers';
import {Element} from 'chart.js';

export default class LabelAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    if (!this.visible) {
      return false;
    }
    if (inBoxRange(mouseX, mouseY, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition))) {
      return true;
    }
    const pointOpts = this.options.point;
    if (isPointVisible(pointOpts)) {
      const {pointX: x, pointY: y} = this.getProps(['pointX', 'pointY'], useFinalPosition);
      if (inPointRange({x: mouseX, y: mouseY}, {x, y}, pointOpts.radius)) {
        return true;
      }
    }
    return false;
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    if (!this.visible) {
      return;
    }
    const {labelX, labelY, labelWidth, labelHeight, pointX, pointY, options} = this;
    drawCallout(ctx, this);
    if (this.boxVisible) {
      drawBox(ctx, this, options);
    }
    drawLabel(ctx, {x: labelX, y: labelY, width: labelWidth, height: labelHeight}, options);
    drawPoint(ctx, {x: pointX, y: pointY}, options.point);
  }

  resolveElementProperties(chart, options) {
    const visible = !!isLabelVisible(options);
    const point = !isBoundToPoint(options) ? getRectCenterPoint(getChartRect(chart, options)) : getChartPoint(chart, options);
    const padding = toPadding(options.padding);
    const labelSize = measureLabelSize(chart.ctx, options);
    const boxSize = measureRect(point, labelSize, options, padding);
    const bgColor = color(options.backgroundColor);
    const boxVisible = options.borderWidth > 0 || (bgColor && bgColor.valid && bgColor.rgb.a > 0);

    const properties = {
      visible,
      boxVisible,
      pointX: point.x,
      pointY: point.y,
      ...boxSize,
      labelX: boxSize.x + padding.left + (options.borderWidth / 2),
      labelY: boxSize.y + padding.top + (options.borderWidth / 2),
      labelWidth: labelSize.width,
      labelHeight: labelSize.height
    };
    properties.calloutPosition = options.callout.enabled && resolveCalloutPosition(properties, options.callout);
    return properties;
  }
}

LabelAnnotation.id = 'labelAnnotation';

LabelAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
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
  point: {
    backgroundColor: undefined,
    borderColor: undefined,
    borderDash: [],
    borderDashOffset: 0,
    borderWidth: 1,
    enabled: false,
    pointStyle: 'circle',
    radius: 3,
    rotation: 0
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
  borderColor: 'color',
  backgroundColor: 'color',
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

function calculatePosition(start, size, adjust, position) {
  if (position === 'start') {
    return start + adjust;
  } else if (position === 'end') {
    return start - size + adjust;
  }
  return start + adjust - size / (1 / getTPosition(position));
}

function drawCallout(ctx, element) {
  const {pointX, pointY, calloutPosition, options} = element;
  if (!calloutPosition) {
    return;
  }
  const callout = options.callout;
  const {separatorStart, separatorEnd} = getCalloutSeparatorCoord(element, calloutPosition);
  const {sideStart, sideEnd} = getCalloutSideCoord(element, calloutPosition, separatorStart);
  ctx.save();
  ctx.beginPath();
  const stroke = setBorderStyle(ctx, callout);
  if (callout.margin > 0 || options.borderWidth === 0) {
    ctx.moveTo(separatorStart.x, separatorStart.y);
    ctx.lineTo(separatorEnd.x, separatorEnd.y);
  }
  ctx.moveTo(sideStart.x, sideStart.y);
  ctx.lineTo(sideEnd.x, sideEnd.y);
  ctx.lineTo(pointX, pointY);
  if (stroke) {
    ctx.stroke();
  }
  ctx.restore();
}

function getCalloutSeparatorCoord(element, position) {
  const {x, y, width, height} = element;
  const adjust = getCalloutSeparatorAdjust(element, position);
  let separatorStart, separatorEnd;
  if (position === 'left' || position === 'right') {
    separatorStart = {x: x + adjust, y};
    separatorEnd = {x: separatorStart.x, y: separatorStart.y + height};
  } else if (position === 'top' || position === 'bottom') {
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
    sideStart = {x: separatorStart.x, y: y + getStartSize(height, start)};
    sideEnd = {x: sideStart.x + side, y: sideStart.y};
  } else if (position === 'top' || position === 'bottom') {
    sideStart = {x: separatorStart.x + getStartSize(width, start), y: separatorStart.y};
    sideEnd = {x: sideStart.x, y: sideStart.y + side};
  }
  return {sideStart, sideEnd};
}

function getStartSize(size, value) {
  return clamp(getSize(size, value), 0, size);
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
  if (position === 'left' || position === 'right' || position === 'top' || position === 'bottom') {
    return position;
  }
  return resolveCalloutAutoPosition(element, options);
}

function resolveCalloutAutoPosition(element, options) {
  const {x, y, width, height, pointX, pointY} = element;
  const {margin, side} = options;
  const adjust = margin + side;
  if (pointX < (x - adjust)) {
    return 'left';
  } else if (pointX > (x + width + adjust)) {
    return 'right';
  } else if (pointY < (y + height + adjust)) {
    return 'top';
  } else if (pointY > (y - adjust)) {
    return 'bottom';
  }
}
