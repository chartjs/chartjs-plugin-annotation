import {drawBox, drawLabel, measureLabelSize, isLabelVisible, getChartPoint, getRectCenterPoint, toPosition} from '../helpers';
import {color as getColor} from 'chart.js/helpers';
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

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    if (this.labelRect) {
      ctx.save();
      if (this.isBoxVisible()) {
        drawBox(ctx, this, this.options);
      }
      drawLabel(ctx, this.labelRect, this.options);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    const point = getChartPoint(chart, options);

    if (isLabelVisible(options)) {
      const labelSize = measureLabelSize(chart.ctx, options);
      const elemDim = measureRect(point, labelSize, options);
      this.labelRect = {
        x: elemDim.x + options.xPadding + (options.borderWidth / 2),
        y: elemDim.y + options.yPadding + (options.borderWidth / 2),
        width: labelSize.width,
        height: labelSize.height
      };
      return elemDim;
    }
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
