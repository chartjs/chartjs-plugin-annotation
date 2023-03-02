import {Element} from 'chart.js';
import {toRadians} from 'chart.js/helpers';
import {drawBox, resolveBoxAndLabelProperties, inBoxRange, rotated, translate, getElementCenterPoint} from '../helpers';

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

  get label() {
    return this.elements && this.elements[0];
  }

  resolveElementProperties(chart, options) {
    return resolveBoxAndLabelProperties(chart, options);
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
  init: undefined,
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
    opacity: undefined,
    padding: 6,
    position: 'center',
    rotation: undefined,
    textAlign: 'start',
    textStrokeColor: undefined,
    textStrokeWidth: 0,
    width: undefined,
    xAdjust: 0,
    yAdjust: 0,
    z: undefined
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
  yScaleID: undefined,
  z: 0
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
