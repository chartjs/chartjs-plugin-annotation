import {Element} from 'chart.js';
import {drawBox, drawLabel, measureLabelSize, isLabelVisible, getRectCenterPoint, getChartRect} from '../helpers';

export default class BoxAnnotation extends Element {
  inRange(mouseX, mouseY, useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);

    return mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this, useFinalPosition);
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
      const labelSize = measureLabelSize(ctx, labelOpts);
      const labelRect = {
        x: calculateX(this, labelSize),
        y: calculateY(this, labelSize),
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
  display: true,
  adjustScaleRange: true,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderWidth: 1,
  xScaleID: 'x',
  xMin: undefined,
  xMax: undefined,
  yScaleID: 'y',
  yMin: undefined,
  yMax: undefined,
  label: {
    align: 'center',
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
    position: 'center',
    textAlign: 'start',
    xAdjust: 0,
    xPadding: 6,
    yAdjust: 0,
    yPadding: 6,
    width: undefined
  }
};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function calculateX(box, labelSize) {
  const {x, x2, width, options} = box;
  const {align, xPadding, xAdjust, borderWidth} = options.label;
  const margin = xPadding + (borderWidth / 2) + xAdjust;
  if (align === 'left') {
    return x + margin;
  } else if (align === 'right') {
    return x2 - labelSize.width - margin;
  }
  return x + (width - labelSize.width) / 2;
}

function calculateY(box, labelSize) {
  const {y, y2, height, options} = box;
  const {position, yPadding, yAdjust, borderWidth} = options.label;
  const margin = yPadding + (borderWidth / 2) + yAdjust;
  if (position === 'start') {
    return y + margin;
  } else if (position === 'end') {
    return y2 - labelSize.height - margin;
  }
  return y + (height - labelSize.height) / 2;
}
