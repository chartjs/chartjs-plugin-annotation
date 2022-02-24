import {Element} from 'chart.js';
import {toRadians} from 'chart.js/helpers';
import {drawBox, getRectCenterPoint, getChartRect, inBoxRange, rotated, translate} from '../helpers';
import BoxAnnotationLabel from './boxLabel';

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
    const label = new BoxAnnotationLabel();
    properties.elements = [{
      type: 'boxLabel',
      optionScope: 'label',
      properties: label.resolveElementProperties(chart, properties, options)
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
  label: BoxAnnotationLabel.defaults,
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
