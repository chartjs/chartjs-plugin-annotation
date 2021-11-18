import {drawBox, drawLabel, measureLabelSize, isLabelVisible, getChartPoint, getBoxCenterPoint} from '../helpers';
import {Element} from 'chart.js';

export default class LabelAnnotation extends Element {

  inRange(mouseX, mouseY) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height']);

    return this.labelTextRect && mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
  }

  getCenterPoint(useFinalPosition) {
    return getBoxCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    if (this.labelTextRect) {
      ctx.save();
      drawBox(ctx, this, this.options);
      drawLabel(ctx, this.labelTextRect, this.options);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    const point = getChartPoint(chart, options);

    if (isLabelVisible(options)) {
      const labelSize = measureLabelSize(chart.ctx, options);
      const elemDim = measureDimension(point, labelSize, options);
      this.labelTextRect = {
        x: elemDim.x + options.xPadding + (options.borderWidth / 2),
        y: elemDim.y + options.yPadding + (options.borderWidth / 2),
        width: labelSize.width,
        height: labelSize.height
      };
      return elemDim;
    }
    return point;
  }
}

LabelAnnotation.id = 'labelAnnotation';

LabelAnnotation.defaults = {
  adjustScaleRange: true,
  align: 'center',
  display: true,
  backgroundColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 0,
  borderRadius: 0,
  color: 'black',
  content: null,
  drawTime: undefined,
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
  xAdjust: 0,
  xPadding: 6,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yPadding: 6,
  yScaleID: 'y',
  yValue: undefined,
  width: undefined
};

LabelAnnotation.defaultRoutes = {
  borderColor: 'color',
};

const alignEnumValues = ['left', 'right'];
const positionEnumValues = ['start', 'end'];
function measureDimension(point, size, options) {
  const width = size.width + (2 * options.xPadding) + options.borderWidth;
  const height = size.height + (2 * options.yPadding) + options.borderWidth;
  return {
    x: calculateByOptionValue({base: point.x, size: width}, options.xAdjust, options.align, alignEnumValues),
    y: calculateByOptionValue({base: point.y, size: height}, options.yAdjust, options.position, positionEnumValues),
    width,
    height
  };
}

function calculateByOptionValue(area, adjust, option, enumValues) {
  const {base, size} = area;
  if (option === enumValues[0]) {
    return base - size + adjust;
  } else if (option === enumValues[1]) {
    return base + adjust;
  }
  return base - size / 2 + adjust;
}
