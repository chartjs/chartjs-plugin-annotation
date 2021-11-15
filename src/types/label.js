import {addRoundedRectPath, toTRBLCorners} from 'chart.js/helpers';
import {clampAll} from '../helpers';
import PointAnnotation from './point';
import Label from './labelItem';

export default class LabelAnnotation extends PointAnnotation {

  inRange(mouseX, mouseY) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height']);

    return mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
  }

  getCenterPoint(useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
    return {
      x: x + width / 2,
      y: y + height / 2
    };
  }

  draw(ctx) {
    if (this.label.isVisible()) {
      this.drawBox(ctx);
      ctx.save();
      this.label.draw(ctx);
      ctx.restore();
    }
  }

  drawBox(ctx) {
    const {x, y, width, height, options} = this.getProps(['x', 'y', 'width', 'height', 'options']);
    ctx.save();
    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;
    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;
    ctx.beginPath();
    addRoundedRectPath(ctx, {
      x, y, w: width, h: height,
      radius: clampAll(toTRBLCorners(options.borderRadius), 0, Math.min(width, height) / 2)
    });
    ctx.closePath();
    ctx.fill();
    if (options.borderWidth) {
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const point = super.resolveElementProperties(chart, options);
    const label = this.label = new Label(this, options);
    if (label.isVisible()) {
      const elemDim = measureDimension(point, label.size(chart.ctx), options);
      label.x = elemDim.x + options.xPadding + (options.borderWidth / 2);
      label.y = elemDim.y + options.yPadding + (options.borderWidth / 2);
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
