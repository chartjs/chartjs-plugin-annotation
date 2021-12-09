import {Element} from 'chart.js';
import {toPadding} from 'chart.js/helpers';
import {drawBox, drawLabel, measureLabelSize, isLabelVisible, getRectCenterPoint, getChartRect, toPosition, inBoxRange} from '../helpers';

export default class BoxAnnotation extends Element {
  inRange(mouseX, mouseY, useFinalPosition) {
    return inBoxRange(mouseX, mouseY, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    ctx.save();
    drawBox(ctx, this, this.options);
    ctx.restore();
  }

  drawLabel(ctx) {
    const {x, y, width, height, options} = this;
    const labelOpts = options.label;
    if (isLabelVisible(labelOpts)) {
      // copies borderWidth to label options
      labelOpts.borderWidth = options.borderWidth;
      ctx.save();
      ctx.beginPath();
      ctx.rect(x + labelOpts.borderWidth / 2, y + labelOpts.borderWidth / 2, width - labelOpts.borderWidth, height - labelOpts.borderWidth);
      ctx.clip();
      const position = toPosition(labelOpts.position);
      const padding = toPadding(labelOpts.padding);
      const labelSize = measureLabelSize(ctx, labelOpts);
      const labelRect = {
        x: calculateX(this, labelSize, position, padding),
        y: calculateY(this, labelSize, position, padding),
        width: labelSize.width,
        height: labelSize.height
      };
      drawLabel(ctx, labelRect, labelOpts);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
  adjustScaleRange: true,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  cornerRadius: undefined, // TODO: v2 remove support for cornerRadius
  borderWidth: 1,
  display: true,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  label: {
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
    xAdjust: 0,
    yAdjust: 0,
    width: undefined
  }
};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function calculateX(box, labelSize, position, padding) {
  const {x: start, x2: end, width: size, options} = box;
  const {xAdjust: adjust, borderWidth} = options.label;
  return calculatePosition({start, end, size}, {position: position.x, padding: padding.left, adjust, borderWidth, size: labelSize.width});
}

function calculateY(box, labelSize, position, padding) {
  const {y: start, y2: end, height: size, options} = box;
  const {yAdjust: adjust, borderWidth} = options.label;
  return calculatePosition({start, end, size}, {position: position.y, padding: padding.top, adjust, borderWidth, size: labelSize.height});
}

function calculatePosition(boxOpts, labelOpts) {
  const {start, end, size} = boxOpts;
  const {position, padding, adjust, borderWidth} = labelOpts;
  const margin = padding + (borderWidth / 2) + adjust;
  if (position === 'start') {
    return start + margin;
  } else if (position === 'end') {
    return end - labelOpts.size - margin;
  }
  return start + (size - labelOpts.size) / 2;
}

