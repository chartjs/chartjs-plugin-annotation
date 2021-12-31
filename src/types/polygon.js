import {Element} from 'chart.js';
import {PI, RAD_PER_DEG, isNumber} from 'chart.js/helpers';
import {setBorderStyle, resolvePointPosition, getElementCenterPoint, setShadowStyle, removeShadowStyle} from '../helpers';

export default class PolygonAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    const vertices = getVertices(this.getProps(['x', 'y'], useFinalPosition), this.options);
    return vertices && vertices.length > 0 && pointIsInPolygon(vertices, mouseX, mouseY);
  }

  getCenterPoint(useFinalPosition) {
    return getElementCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {x, y, options} = this;
    const vertices = getVertices({x, y}, options);
    let vertex = vertices[0];
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    setShadowStyle(ctx, options);
    const stroke = setBorderStyle(ctx, options);
    ctx.moveTo(vertex.x, vertex.y);
    for (let i = 1; i < vertices.length; i++) {
      vertex = vertices[i];
      ctx.lineTo(vertex.x, vertex.y);
    }
    ctx.closePath();
    ctx.fill();
    // If no border, don't draw it
    if (stroke) {
      // only shape shadow, without border
      removeShadowStyle(ctx);
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    if (isNumber(options.sides) && options.sides >= 1) {
      return resolvePointPosition(chart, options);
    }
    return {options: {}};
  }

}

PolygonAnnotation.id = 'polygonAnnotation';

PolygonAnnotation.defaults = {
  adjustScaleRange: true,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderWidth: 1,
  display: true,
  radius: 10,
  rotation: 0,
  shadowBlur: 0,
  shadowColor: 'transparent',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  sides: 3,
  xAdjust: 0,
  xMax: undefined,
  xMin: undefined,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yMax: undefined,
  yMin: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PolygonAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function getVertices(point, options) {
  const {sides, radius} = options;
  let angle = (2 * PI) / sides;
  let rad = options.rotation * RAD_PER_DEG;
  const vertices = new Array();
  addVertex(vertices, point, rad, radius);
  for (let i = 0; i < sides; i++) {
    rad += angle;
    addVertex(vertices, point, rad, radius);
  }
  return vertices;
}

function addVertex(array, point, rad, radius) {
  array.push({
    x: point.x + Math.sin(rad) * radius,
    y: point.y - Math.cos(rad) * radius
  });
}

function pointIsInPolygon(vertices, x, y) {
  let isInside = false;
  let i = 0;
  let j = vertices.length - 1;
  for (i, j; i < vertices.length; j = i++) {
    if ((vertices[i].y > y) !== (vertices[j].y > y) &&
         x < (vertices[j].x - vertices[i].x) * (y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x) {
      isInside = !isInside;
    }
  }
  return isInside;
}
