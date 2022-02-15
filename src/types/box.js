import {Element} from 'chart.js';
import {toPadding, toRadians} from 'chart.js/helpers';
import {drawBox, drawLabel, getRelativePosition, measureLabelSize, getRectCenterPoint, getChartRect, toPosition, inBoxRange, rotated, translate} from '../helpers';

export default class BoxAnnotation extends Element {
  inRange(mouseX, mouseY, useFinalPosition) {
    const {x, y} = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-this.options.rotation));
    return inBoxRange(x, y, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition), this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    const rotation = this.options.rotation;
    ctx.save();
    translate(ctx, this, rotation);
    drawBox(ctx, this, this.options);
    ctx.restore();
  }

  drawLabel(ctx) {
    const {x, y, width, height, options} = this;
    const {label, borderWidth, rotation} = options;
    const halfBorder = borderWidth / 2;
    const position = toPosition(label.position);
    const padding = toPadding(label.padding);
    const labelSize = measureLabelSize(ctx, label);
    const labelRect = {
      x: calculateX(this, labelSize, position, padding),
      y: calculateY(this, labelSize, position, padding),
      width: labelSize.width,
      height: labelSize.height
    };

    ctx.save();
    translate(ctx, this, rotation);
    ctx.beginPath();
    ctx.rect(x + halfBorder + padding.left, y + halfBorder + padding.top,
      width - borderWidth - padding.width, height - borderWidth - padding.height);
    ctx.clip();
    drawLabel(ctx, labelRect, label);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderShadowColor: 'transparent',
  borderWidth: 1,
  cornerRadius: undefined, // TODO: v2 remove support for cornerRadius
  display: true,
  label: {
    borderWidth: undefined,
    color: 'black',
    content: null,
    drawTime: undefined,
    enabled: false,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: 'bold'
    },
    height: undefined,
    padding: 6,
    position: 'center',
    textAlign: 'start',
    textStrokeColor: undefined,
    textStrokeWidth: 0,
    xAdjust: 0,
    yAdjust: 0,
    width: undefined
  },
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y'
};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

BoxAnnotation.descriptors = {
  label: {
    _fallback: true
  }
};

function calculateX(box, labelSize, position, padding) {
  const {x: start, x2: end, width: size, options} = box;
  const {xAdjust: adjust, borderWidth} = options.label;
  return calculatePosition({start, end, size}, {
    position: position.x,
    padding: {start: padding.left, end: padding.right},
    adjust, borderWidth,
    size: labelSize.width
  });
}

function calculateY(box, labelSize, position, padding) {
  const {y: start, y2: end, height: size, options} = box;
  const {yAdjust: adjust, borderWidth} = options.label;
  return calculatePosition({start, end, size}, {
    position: position.y,
    padding: {start: padding.top, end: padding.bottom},
    adjust, borderWidth,
    size: labelSize.height
  });
}

function calculatePosition(boxOpts, labelOpts) {
  const {start, end} = boxOpts;
  const {position, padding: {start: padStart, end: padEnd}, adjust, borderWidth} = labelOpts;
  const availableSize = end - borderWidth - start - padStart - padEnd - labelOpts.size;
  return start + borderWidth / 2 + adjust + padStart + getRelativePosition(availableSize, position);
}
