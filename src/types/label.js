import {drawBox, drawLabel, drawPoint, measureLabelSize, isLabelVisible, getChartPoint, getRectCenterPoint, toPosition, setBorderStyle, getSize, inPointRange} from '../helpers';
import {color as getColor, toPadding} from 'chart.js/helpers';
import {Element} from 'chart.js';

export default class LabelAnnotation extends Element {

  inRange(mouseX, mouseY) {
    return this.inLabelRange(mouseX, mouseY) || (this.isPointVisible() && inPointRange({x: mouseX, y: mouseY}, this.point, this.options.point.radius));
  }

  inLabelRange(mouseX, mouseY, gap) {
    if (this.labelRect) {
      const adjust = gap || 0;
      const {x, y, width, height} = this.isBoxVisible() ? this.getProps(['x', 'y', 'width', 'height']) : this.labelRect;

      return mouseX >= x + adjust &&
             mouseX <= x + width - adjust &&
             mouseY >= y + adjust &&
             mouseY <= y + height - adjust;
    }
    return false;
  }

  isBoxVisible() {
    const color = getColor(this.options.backgroundColor);
    return (color && color.valid && color.rgb.a > 0) || this.options.borderWidth > 0;
  }

  isPointVisible() {
    return this.options.point && this.options.point.enabled && this.point && !this.inLabelRange(this.point.x, this.point.y, 1);
  }

  isCalloutVisible() {
    return this.options.callout && this.options.callout.enabled && this.point && !this.inLabelRange(this.point.x, this.point.y);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    if (this.labelRect) {
      applyCallout(ctx, this);
      applyBox(ctx, this);
      drawLabel(ctx, this.labelRect, this.options);
      applyPoint(ctx, this);
    }
  }

  resolveElementProperties(chart, options) {
    this.point = getChartPoint(chart, options);

    if (isLabelVisible(options)) {
      const padding = toPadding(options.padding);
      const labelSize = measureLabelSize(chart.ctx, options);
      const elemDim = measureRect(this.point, labelSize, options, padding);
      this.labelRect = {
        x: elemDim.x + padding.left + (options.borderWidth / 2),
        y: elemDim.y + padding.top + (options.borderWidth / 2),
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
    start: '50%',
  },
  point: {
    backgroundColor: undefined,
    borderColor: undefined,
    borderDash: [],
    borderDashOffset: 0,
    borderWidth: 1,
    enabled: false,
    radius: 3
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
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
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
  return start - size / 2 + adjust;
}

function applyCallout(ctx, element) {
  if (element.isCalloutVisible()) {
    drawCallout(ctx, element);
  }
}

function applyBox(ctx, element) {
  if (element.isBoxVisible()) {
    drawBox(ctx, element, element.options);
  }
}

function applyPoint(ctx, element) {
  if (element.isPointVisible()) {
    drawPoint(ctx, element.point, element.options.point);
  }
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
  ctx.save();
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
  const start = getSize(size, value);
  return Math.min(Math.max(start, 0), size);
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
