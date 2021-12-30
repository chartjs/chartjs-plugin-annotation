import {Element} from 'chart.js';
import {PI, toRadians} from 'chart.js/helpers';
import {getRectCenterPoint, getChartRect, setBorderStyle} from '../helpers';
import {common} from './_commonDefaults';

export default class EllipseAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    return pointInEllipse({x: mouseX, y: mouseY}, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition), this.options.rotation);
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  draw(ctx) {
    const {width, height, options} = this;
    const center = this.getCenterPoint();

    ctx.save();

    ctx.translate(center.x, center.y);
    if (options.rotation) {
      ctx.rotate(toRadians(options.rotation));
    }
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    const stroke = setBorderStyle(ctx, options);
    ctx.ellipse(0, 0, height / 2, width / 2, PI / 2, 0, 2 * PI);
    ctx.fill();
    if (stroke) {
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartRect(chart, options);
  }

}

EllipseAnnotation.id = 'ellipseAnnotation';

EllipseAnnotation.defaults = Object.assign({}, common, {
  borderWidth: 1,
  rotation: 0,
});

EllipseAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function pointInEllipse(p, ellipse, rotation) {
  const {width, height} = ellipse;
  const center = ellipse.getCenterPoint(true);
  const xRadius = width / 2;
  const yRadius = height / 2;

  if (xRadius <= 0 || yRadius <= 0) {
    return false;
  }
  // https://stackoverflow.com/questions/7946187/point-and-ellipse-rotated-position-test-algorithm
  const angle = toRadians(rotation || 0);
  const cosAngle = Math.cos(angle);
  const sinAngle = Math.sin(angle);
  const a = Math.pow(cosAngle * (p.x - center.x) + sinAngle * (p.y - center.y), 2);
  const b = Math.pow(sinAngle * (p.x - center.x) - cosAngle * (p.y - center.y), 2);
  return (a / Math.pow(xRadius, 2)) + (b / Math.pow(yRadius, 2)) <= 1;
}
