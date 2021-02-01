import BoxAnnotation from './box';
import {defaults} from 'chart.js';
import {mergeIf} from 'chart.js/helpers';
import {resolveOption} from '../helpers';

export default class EllipseAnnotation extends BoxAnnotation {

  inRange(x, y) {
    return pointInEllipse({x, y}, this);
  }

  draw(ctx) {
    const {width, height, options} = this;
    const center = this.getCenterPoint(true);

    ctx.save();

    ctx.beginPath();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.ellipse(center.x, center.y, height / 2, width / 2, Math.PI / 2, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

EllipseAnnotation.id = 'ellipseAnnotation';

EllipseAnnotation.defaults = {
  display: true,
  xScaleID: 'x',
  yScaleID: 'y',
  borderWidth: 1
};

EllipseAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

EllipseAnnotation.resolveOptions = function(chart, options) {
  const context = {chart, options};
  const elDefaults = EllipseAnnotation.defaults;
  return mergeIf({
    display: resolveOption(options.display, elDefaults.display, context),
    xScaleID: resolveOption(options.xScaleID, elDefaults.xScaleID, context),
    xMin: resolveOption(options.xMin, elDefaults.xMin, context),
    xMax: resolveOption(options.xMax, elDefaults.xMax, context),
    yScaleID: resolveOption(options.yScaleID, elDefaults.yScaleID, context),
    yMin: resolveOption(options.yMin, elDefaults.yMin, context),
    yMax: resolveOption(options.yMax, elDefaults.yMax, context),
    backgroundColor: resolveOption(options.backgroundColor, defaults.color, context),
    borderColor: resolveOption(options.borderColor, defaults.color, context),
    borderWidth: resolveOption(options.borderWidth, elDefaults.borderWidth, context),
  }, options);
};

function pointInEllipse(p, ellipse) {
  const {width, height} = ellipse;
  const center = ellipse.getCenterPoint(true);
  const xRadius = width / 2;
  const yRadius = height / 2;

  if (xRadius <= 0 || yRadius <= 0) {
    return false;
  }

  return (Math.pow(p.x - center.x, 2) / Math.pow(xRadius, 2)) + (Math.pow(p.y - center.y, 2) / Math.pow(yRadius, 2)) <= 1.0;
}
