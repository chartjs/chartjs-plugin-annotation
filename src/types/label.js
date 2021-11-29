import {drawBox, drawLabel, drawPoint, measureLabelSize, isLabelVisible, getChartPoint, getRectCenterPoint, toPosition, setBorderStyle} from '../helpers';
import {color as getColor, valueOrDefault} from 'chart.js/helpers';
import {Element} from 'chart.js';

export default class LabelAnnotation extends Element {

  inRange(mouseX, mouseY) {
    if (this.labelRect) {
      const {x, y, width, height} = this.isBoxVisible() ? this.getProps(['x', 'y', 'width', 'height']) : this.labelRect;

      return mouseX >= x &&
             mouseX <= x + width &&
             mouseY >= y &&
             mouseY <= y + height;
    }
    return false;
  }

  isBoxVisible() {
    const color = getColor(this.options.backgroundColor);
    return (color && color.valid && color.rgb.a > 0) || this.options.borderWidth > 0;
  }

  isCalloutVisible() {
    return this.options.callout && this.options.callout.enabled && this.point && !this.inRange(this.point.x, this.point.y);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    if (this.labelRect) {
      ctx.save();
      if (this.isCalloutVisible()) {
        drawCallout(ctx, this);
      }
      if (this.isBoxVisible()) {
        drawBox(ctx, this, this.options);
      }
      drawLabel(ctx, this.labelRect, this.options);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    this.point = getChartPoint(chart, options);

    if (isLabelVisible(options)) {
      const labelSize = measureLabelSize(chart.ctx, options);
      const elemDim = measureRect(this.point, labelSize, options);
      this.labelRect = {
        x: elemDim.x + options.xPadding + (options.borderWidth / 2),
        y: elemDim.y + options.yPadding + (options.borderWidth / 2),
        width: labelSize.width,
        height: labelSize.height
      };
      return elemDim;
    }
    this.point = null;
    this.labelRect = null;
    return {options: {}};
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
    start: 0.5,
    // point options
    drawPoint: false,
    pointBackgroundColor: undefined,
    pointBorderColor: undefined,
    pointBorderDash: [],
    pointBorderDashOffset: 0,
    pointBorderWidth: undefined,
    pointRadius: 3
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
  position: 'center',
  textAlign: 'center',
  width: undefined,
  xAdjust: 0,
  xPadding: 6,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yPadding: 6,
  yScaleID: 'y',
  yValue: undefined
};

LabelAnnotation.defaultRoutes = {
  borderColor: 'color',
};

function measureRect(point, size, options) {
  const width = size.width + (2 * options.xPadding) + options.borderWidth;
  const height = size.height + (2 * options.yPadding) + options.borderWidth;
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
  return start - size / 2 + adjust;
}

function drawCallout(ctx, element) {
  const point = element.point;
  const options = element.options;
  const callout = options.callout;
  const position = resolveCalloutPosition(element);
  if (!position) {
    return;
  }
  const {separatorStart, separatorEnd} = getCalloutSeparatorCoord(element, position);
  const {sideStart, sideEnd} = getCalloutSideCoord(element, position, separatorStart);
  ctx.beginPath();
  const stroke = setBorderStyle(ctx, callout);
  if (callout.margin > 0 || options.borderWidth === 0) {
    ctx.moveTo(separatorStart.x, separatorStart.y);
    ctx.lineTo(separatorEnd.x, separatorEnd.y);
  }
  ctx.moveTo(sideStart.x, sideStart.y);
  ctx.lineTo(sideEnd.x, sideEnd.y);
  ctx.lineTo(point.x, point.y);
  if (stroke) {
    ctx.stroke();
  }
  if (options.callout.drawPoint) {
    applyPoint(ctx, point, callout);
  }
}

function applyPoint(ctx, point, options) {
  const borderColor = valueOrDefault(options.pointBorderColor, options.borderColor);
  const opts = {
    backgroundColor: valueOrDefault(options.pointBackgroundColor, borderColor),
    borderColor,
    borderDash: options.pointBorderDash,
    borderDashOffset: options.pointBorderDashOffset,
    borderWidth: valueOrDefault(options.pointBorderWidth, options.borderWidth),
    radius: options.pointRadius
  };
  drawPoint(ctx, point, opts);
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
  const start = Math.min(Math.max(options.callout.start, 0), 1);
  const side = getCalloutSideAdjust(position, options.callout);
  let sideStart, sideEnd;
  if (position === 'left' || position === 'right') {
    sideStart = {x: separatorStart.x, y: y + height * start};
    sideEnd = {x: sideStart.x + side, y: sideStart.y};
  } else if (position === 'top' || position === 'bottom') {
    sideStart = {x: separatorStart.x + width * start, y: separatorStart.y};
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

function resolveCalloutPosition(element) {
  const position = element.options.callout.position;
  if (position === 'left' || position === 'right' || position === 'top' || position === 'bottom') {
    return position;
  }
  return resolveCalloutAutoPosition(element);
}

function resolveCalloutAutoPosition(element) {
  const {x, y, width, height, point, options} = element;
  const {margin, side} = options.callout;
  const adjust = margin + side;
  if (point.x < (x - adjust)) {
    return 'left';
  } else if (point.x > (x + width + adjust)) {
    return 'right';
  } else if (point.y < (y + height + adjust)) {
    return 'top';
  } else if (point.y > (y - adjust)) {
    return 'bottom';
  }
}
