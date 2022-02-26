import {Element} from 'chart.js';
import {toRadians, toPadding} from 'chart.js/helpers';
import {drawBox, getRectCenterPoint, getChartRect, getRelativePosition, inBoxRange, rotated, measureLabelSize, toPosition, translate} from '../helpers';

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

  resolveElementProperties(chart, options) {
    const properties = getChartRect(chart, options);
    const {x, y} = properties;
    properties.elements = [{
      type: 'label',
      optionScope: 'label',
      properties: resolveLabelElementProperties(chart, properties, options)
    }];
    properties.initProperties = {x, y};
    return properties;
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
    backgroundColor: 'transparent',
    borderWidth: 0,
    callout: {
      enabled: false,
    },
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
    rotation: undefined,
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

export function resolveLabelElementProperties(chart, properties, options) {
  const label = options.label;
  const position = toPosition(label.position);
  const padding = toPadding(label.padding);
  const labelSize = measureLabelSize(chart.ctx, label);
  const borderWidth = options.borderWidth;
  const halfBorder = borderWidth / 2;
  return {
    x: properties.x + halfBorder + padding.left,
    y: properties.y + halfBorder + padding.top,
    width: properties.width - borderWidth - padding.width,
    height: properties.height - borderWidth - padding.height,
    labelX: calculateX({properties, options}, labelSize, position, padding),
    labelY: calculateY({properties, options}, labelSize, position, padding),
    labelWidth: labelSize.width,
    labelHeight: labelSize.height,
    options: label
  };
}

function calculateX({properties, options}, labelSize, position, padding) {
  const {x: start, x2: end, width: size} = properties;
  const {xAdjust: adjust, borderWidth} = options.label;
  return calculatePosition({start, end, size}, {
    position: position.x,
    padding: {start: padding.left, end: padding.right},
    adjust,
    borderWidth: borderWidth + options.borderWidth,
    size: labelSize.width
  });
}

function calculateY({properties, options}, labelSize, position, padding) {
  const {y: start, y2: end, height: size} = properties;
  const {yAdjust: adjust, borderWidth} = options.label;
  return calculatePosition({start, end, size}, {
    position: position.y,
    padding: {start: padding.top, end: padding.bottom},
    adjust,
    borderWidth: borderWidth + options.borderWidth,
    size: labelSize.height
  });
}

function calculatePosition(boxOpts, labelOpts) {
  const {start, end} = boxOpts;
  const {position, padding: {start: padStart, end: padEnd}, adjust, borderWidth} = labelOpts;
  const availableSize = end - borderWidth - start - padStart - padEnd - labelOpts.size;
  return start + borderWidth / 2 + adjust + padStart + getRelativePosition(availableSize, position);
}
