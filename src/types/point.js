import {Element} from 'chart.js';
import {drawPoint} from 'chart.js/helpers';
import {inPointRange, getElementCenterPoint, resolvePointPosition, setBorderStyle} from '../helpers';
import {common} from './_commonDefaults';

export default class PointAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const {width} = this.getProps(['width'], useFinalPosition);
    return inPointRange({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), width / 2 + this.options.borderWidth);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const options = this.options;
    ctx.save();
    ctx.fillStyle = options.backgroundColor;
    setBorderStyle(ctx, options);
    drawPoint(ctx, options, this.x, this.y);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return resolvePointPosition(chart, options);
  }
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = Object.assign({}, common, {
  borderWidth: 1,
  pointStyle: 'circle',
  radius: 10,
  rotation: 0,
  xAdjust: 0,
  xValue: undefined,
  yAdjust: 0,
  yValue: undefined
});

PointAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};
