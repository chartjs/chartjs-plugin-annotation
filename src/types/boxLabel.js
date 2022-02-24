import {Element} from 'chart.js';
import {toPadding} from 'chart.js/helpers';
import {drawLabel, getRelativePosition, measureLabelSize, toPosition, translate} from '../helpers';

export default class BoxAnnotationLabel extends Element {

  draw(ctx) {
    const {x, y, width, height, options} = this.mainElement;
    const label = options.label;
    if (!labelIsVisible(label)) {
      return;
    }
    const borderWidth = options.borderWidth;
    const halfBorder = borderWidth / 2;
    const padding = toPadding(label.padding);

    ctx.save();
    translate(ctx, this.mainElement, label.rotation);
    ctx.beginPath();
    ctx.rect(x + halfBorder + padding.left, y + halfBorder + padding.top,
      width - borderWidth - padding.width, height - borderWidth - padding.height);
    ctx.clip();
    drawLabel(ctx, this, label);
    ctx.restore();
  }

}

BoxAnnotationLabel.defaults = {
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
  rotation: undefined,
  textAlign: 'start',
  textStrokeColor: undefined,
  textStrokeWidth: 0,
  xAdjust: 0,
  yAdjust: 0,
  width: undefined
};

export function resolveElementProperties(chart, properties, options) {
  const label = options.label;
  const position = toPosition(label.position);
  const padding = toPadding(label.padding);
  const labelSize = measureLabelSize(chart.ctx, label);
  return {
    x: calculateX({properties, options}, labelSize, position, padding),
    y: calculateY({properties, options}, labelSize, position, padding),
    width: labelSize.width,
    height: labelSize.height,
    options: label
  };
}

function labelIsVisible(options) {
  return options && options.enabled && options.content;
}

function calculateX({properties, options}, labelSize, position, padding) {
  const {x: start, x2: end, width: size} = properties;
  const {xAdjust: adjust, borderWidth} = options.label;
  return calculatePosition({start, end, size}, {
    position: position.x,
    padding: {start: padding.left, end: padding.right},
    adjust, borderWidth,
    size: labelSize.width
  });
}

function calculateY({properties, options}, labelSize, position, padding) {
  const {y: start, y2: end, height: size} = properties;
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
