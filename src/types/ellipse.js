import BoxAnnotation from './box';

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
