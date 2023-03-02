import {Element} from 'chart.js';
import {PI, RAD_PER_DEG, toRadians} from 'chart.js/helpers';
import {setBorderStyle, resolvePointProperties, getElementCenterPoint, setShadowStyle, rotated, initAnimationProperties} from '../helpers';

export default class PolygonAnnotation extends Element {

  inRange(mouseX, mouseY, axis, useFinalPosition) {
    if (axis !== 'x' && axis !== 'y') {
      return this.options.radius >= 0.1 && this.elements.length > 1 && pointIsInPolygon(this.elements, mouseX, mouseY, useFinalPosition);
    }
    const rotatedPoint = rotated({x: mouseX, y: mouseY}, this.getCenterPoint(useFinalPosition), toRadians(-this.options.rotation));
    const axisPoints = this.elements.map((point) => axis === 'y' ? point.bY : point.bX);
    const start = Math.min(...axisPoints);
    const end = Math.max(...axisPoints);
    return rotatedPoint[axis] >= start && rotatedPoint[axis] <= end;
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {elements, options} = this;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    setShadowStyle(ctx, options);
    const stroke = setBorderStyle(ctx, options);
    let first = true;
    for (const el of elements) {
      if (first) {
        ctx.moveTo(el.x, el.y);
        first = false;
      } else {
        ctx.lineTo(el.x, el.y);
      }
    }
    ctx.closePath();
    ctx.fill();
    // If no border, don't draw it
    if (stroke) {
      ctx.shadowColor = options.borderShadowColor;
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    const properties = resolvePointProperties(chart, options);
    const {sides, rotation} = options;
    const elements = [];
    const angle = (2 * PI) / sides;
    let rad = rotation * RAD_PER_DEG;
    for (let i = 0; i < sides; i++, rad += angle) {
      const elProps = buildPointElement(properties, options, rad);
      elProps.initProperties = initAnimationProperties(chart, properties, options);
      elements.push(elProps);
    }
    properties.elements = elements;
    return properties;
  }
}

PolygonAnnotation.id = 'polygonAnnotation';

PolygonAnnotation.defaults = {
  adjustScaleRange: true,
  backgroundShadowColor: 'transparent',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderShadowColor: 'transparent',
  borderWidth: 1,
  display: true,
  init: undefined,
  point: {
    radius: 0
  },
  radius: 10,
  rotation: 0,
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  sides: 3,
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

PolygonAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function buildPointElement({centerX, centerY}, {radius, borderWidth}, rad) {
  const halfBorder = borderWidth / 2;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const point = {x: centerX + sin * radius, y: centerY - cos * radius};
  return {
    type: 'point',
    optionScope: 'point',
    properties: {
      x: point.x,
      y: point.y,
      centerX: point.x,
      centerY: point.y,
      bX: centerX + sin * (radius + halfBorder),
      bY: centerY - cos * (radius + halfBorder)
    }
  };
}

function pointIsInPolygon(points, x, y, useFinalPosition) {
  let isInside = false;
  let A = points[points.length - 1].getProps(['bX', 'bY'], useFinalPosition);
  for (const point of points) {
    const B = point.getProps(['bX', 'bY'], useFinalPosition);
    if ((B.bY > y) !== (A.bY > y) && x < (A.bX - B.bX) * (y - B.bY) / (A.bY - B.bY) + B.bX) {
      isInside = !isInside;
    }
    A = B;
  }
  return isInside;
}
