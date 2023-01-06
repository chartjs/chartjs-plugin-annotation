import {Element} from 'chart.js';
import {drawBox, drawCallout, drawLabel, measureLabelSize, getChartPoint, isBoundToPoint, resolveBoxProperties, translate, getElementCenterPoint, inLabelRange, measureLabelRectangle} from '../helpers';
import {toPadding, defined} from 'chart.js/helpers';

export default class LabelAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    return inLabelRange(
      {x: mouseX, y: mouseY},
      {rect: this.getProps(['x', 'y', 'x2', 'y2'], useFinalPosition), center: this.getCenterPoint(useFinalPosition)},
      axis,
      this.rotation,
      this.options.borderWidth
    );
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    const visible = !defined(this._visible) || this._visible;
    if (!options.display || !options.content || !visible) {
      return;
    }
    ctx.save();
    translate(ctx, this.getCenterPoint(), this.rotation);
    drawCallout(ctx, this);
    drawBox(ctx, this, options);
    drawLabel(ctx, getLabelSize(this), options);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    let point;
    if (!isBoundToPoint(options)) {
      const {centerX, centerY} = resolveBoxProperties(chart, options);
      point = {x: centerX, y: centerY};
    } else {
      point = getChartPoint(chart, options);
    }
    const padding = toPadding(options.padding);
    const labelSize = measureLabelSize(chart.ctx, options);
    const boxSize = measureLabelRectangle(point, labelSize, options, padding);
    return {
      pointX: point.x,
      pointY: point.y,
      ...boxSize,
      rotation: options.rotation
    };
  }
}

LabelAnnotation.id = 'labelAnnotation';

LabelAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundColor: 'transparent',
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderRadius: 0,
  borderShadowColor: 'transparent',
  borderWidth: 0,
  callout: {
    borderCapStyle: 'butt',
    borderColor: undefined,
    borderDash: [],
    borderDashOffset: 0,
    borderJoinStyle: 'miter',
    borderWidth: 1,
    display: false,
    margin: 5,
    position: 'auto',
    side: 5,
    start: '50%',
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
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  textAlign: 'center',
  textStrokeColor: undefined,
  textStrokeWidth: 0,
  width: undefined,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: undefined,
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: undefined,
  yValue: undefined,
  z: 0
};

LabelAnnotation.defaultRoutes = {
  borderColor: 'color'
};

function getLabelSize({x, y, width, height, options}) {
  const hBorderWidth = options.borderWidth / 2;
  const padding = toPadding(options.padding);
  return {
    x: x + padding.left + hBorderWidth,
    y: y + padding.top + hBorderWidth,
    width: width - padding.left - padding.right - options.borderWidth,
    height: height - padding.top - padding.bottom - options.borderWidth
  };
}
