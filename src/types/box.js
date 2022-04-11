import {Element} from 'chart.js';
import {toPadding, toRadians} from 'chart.js/helpers';
import {drawBox, getRelativePosition, measureLabelSize, resolveBoxProperties, toPosition, inBoxRange, rotated, translate, getElementCenterPoint} from '../helpers';

export default class BoxAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    const {x, y} = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-this.options.rotation));
    return inBoxRange({x, y}, this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), axis, this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    ctx.save();
    translate(ctx, this.getCenterPoint(), this.options.rotation);
    drawBox(ctx, this, this.options);
    ctx.restore();
  }

  getBoundingBox() {
    const {x, y, width, height} = this.getProps('x', 'y', 'width', 'height');
    const label = this.options.label;
    const padding = toPadding(label.padding);
    const borderWidth = this.options.borderWidth;
    const halfBorder = borderWidth / 2;
    return {
      x: x + halfBorder + padding.left,
      y: y + halfBorder + padding.top,
      width: width - borderWidth - padding.width,
      height: height - borderWidth - padding.height
    };
  }

  resolveElementProperties(chart, options) {
    const properties = resolveBoxProperties(chart, options);
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
  display: true,
  label: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    callout: {
      display: false
    },
    color: 'black',
    content: null,
    display: false,
    drawTime: undefined,
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
  xScaleID: undefined,
  yMax: undefined,
  yMin: undefined,
  yScaleID: undefined
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

function calculateX({properties, options}, labelSize, position, padding) {
  const {x: start, x2: end, width: size} = properties;
  return calculatePosition({start, end, size, borderWidth: options.borderWidth}, {
    position: position.x,
    padding: {start: padding.left, end: padding.right},
    adjust: options.label.xAdjust,
    size: labelSize.width
  });
}

function calculateY({properties, options}, labelSize, position, padding) {
  const {y: start, y2: end, height: size} = properties;
  return calculatePosition({start, end, size, borderWidth: options.borderWidth}, {
    position: position.y,
    padding: {start: padding.top, end: padding.bottom},
    adjust: options.label.yAdjust,
    size: labelSize.height
  });
}

function calculatePosition(boxOpts, labelOpts) {
  const {start, end, borderWidth} = boxOpts;
  const {position, padding: {start: padStart, end: padEnd}, adjust} = labelOpts;
  const availableSize = end - borderWidth - start - padStart - padEnd - labelOpts.size;
  return start + borderWidth / 2 + adjust + getRelativePosition(availableSize, position);
}

function resolveLabelElementProperties(chart, properties, options) {
  const label = options.label;
  label.backgroundColor = 'transparent';
  label.callout.display = false;
  const position = toPosition(label.position);
  const padding = toPadding(label.padding);
  const labelSize = measureLabelSize(chart.ctx, label);
  const x = calculateX({properties, options}, labelSize, position, padding);
  const y = calculateY({properties, options}, labelSize, position, padding);
  const width = labelSize.width + padding.width;
  const height = labelSize.height + padding.height;
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
