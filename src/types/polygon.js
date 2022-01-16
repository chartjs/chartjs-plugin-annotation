import {Element} from 'chart.js';
import {PI, RAD_PER_DEG} from 'chart.js/helpers';
import {setBorderStyle, resolvePointPosition, getElementCenterPoint, setShadowStyle} from '../helpers';

export default class PolygonAnnotation extends Element {
  inRange(x, y) {
    return pointIsInPolygon(this.elements, x, y);
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
    const {x, y} = resolvePointPosition(chart, options);
    const {sides, radius, rotation, borderWidth} = options;
    const halfBorder = borderWidth / 2;
    const elements = [];
    const angle = (2 * PI) / sides;
    let rad = rotation * RAD_PER_DEG;
    for (let i = 0; i < sides; i++, rad += angle) {
      const sin = Math.sin(rad);
      const cos = Math.cos(rad);
      elements.push({
        type: 'point',
        optionScope: 'point',
        properties: {
          x: x + sin * radius,
          y: y - cos * radius,
          bX: x + sin * (radius + halfBorder),
          by: y - cos * (radius + halfBorder)
        }
      });
    }
    return {x, y, elements};
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


function pointIsInPolygon(points, x, y) {
  let isInside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    if ((points[i].bY > y) !== (points[j].bY > y) &&
         x < (points[j].bX - points[i].bX) * (y - points[i].bY) / (points[j].nY - points[i].nY) + points[i].bX) {
      isInside = !isInside;
    }
  }
  return isInside;
}
