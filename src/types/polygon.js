import {Element} from 'chart.js';
import {PI, RAD_PER_DEG} from 'chart.js/helpers';
import {setBorderStyle, getCircleCenterPoint, getChartCircle} from '../helpers';

export default class PolygonAnnotation extends Element {

  inRange(x, y) {
    return this.vertices && this.vertices.length > 0 && pointIsInPolygon(this.vertices, x, y);
  }

  getCenterPoint(useFinalPosition) {
    return getCircleCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {x, y, options} = this;
    const {sides, radius} = options;
    const point = {x, y};
    let angle = (2 * PI) / sides;
    let rad = options.rotation * RAD_PER_DEG;
    this.vertices = new Array();
    let vertex = createVertex(this.vertices, point, rad, radius);
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = options.backgroundColor;
    const stroke = setBorderStyle(ctx, options);
    ctx.moveTo(vertex.x, vertex.y);
    for (let i = 0; i < sides; i++) {
      rad += angle;
      vertex = createVertex(this.vertices, point, rad, radius);
      ctx.lineTo(vertex.x, vertex.y);
    }
    ctx.closePath();
    ctx.fill();
    // If no border, don't draw it
    if (stroke) {
      ctx.stroke();
    }
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    return getChartCircle(chart, options);
  }

}

PolygonAnnotation.id = 'polygonAnnotation';

PolygonAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: 'miter',
  borderWidth: 1,
  radius: 10,
  rotation: 0,
  sides: 3,
  xScaleID: 'x',
  xValue: undefined,
  yScaleID: 'y',
  yValue: undefined
};

PolygonAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function createVertex(array, point, rad, radius) {
  const vertex = {
    x: point.x + Math.sin(rad) * radius,
    y: point.y - Math.cos(rad) * radius
  };
  array.push(vertex);
  return vertex;
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
