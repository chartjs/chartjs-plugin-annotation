import {Element} from 'chart.js';
import {isArray, toFont} from 'chart.js/helpers';
import {scaleValue} from '../helpers';

export default class TextAnnotation extends Element {

  inRange(mouseX, mouseY) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height']);

    return this.labelIsVisible() && mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
  }

  labelIsVisible() {
    return this.options.display && this.options.content;
  }

  getCenterPoint(useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
    return {
      x: x + width / 2,
      y: y + height / 2
    };
  }

  draw(ctx) {
    if (this.labelIsVisible()) {
      ctx.save();
      drawLabel(ctx, this);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    const {chartArea, scales, ctx} = chart;
    const xScale = scales[options.xScaleID];
    const yScale = scales[options.yScaleID];
    let x = chartArea.width / 2;
    let y = chartArea.height / 2;

    if (xScale) {
      x = scaleValue(xScale, options.xValue, x);
    }

    if (yScale) {
      y = scaleValue(yScale, options.yValue, y);
    }
    const size = measureLabel(ctx, options);
    this.rect = {
      x: calculateX(x, size.width, options.anchor),
      y: calculateY(y, size.height, options.position),
      width: size.width,
      height: size.height
    };
    return this.rect;
  }
}

TextAnnotation.id = 'textAnnotation';

TextAnnotation.defaults = {
  display: true,
  content: null,
  drawTime: undefined,
  font: {
    family: undefined,
    lineHeight: undefined,
    size: undefined,
    style: undefined,
    weight: undefined
  },
  color: 'black',
  anchor: 'center',
  position: 'middle',
  textAlign: 'center',
  xScaleID: 'x',
  xValue: undefined,
  yScaleID: 'y',
  yValue: undefined
};

TextAnnotation.defaultRoutes = {
};

const widthCache = new Map();
function measureLabel(ctx, label) {
  const content = label.content;
  const lines = isArray(content) ? content : [content];
  const count = lines.length;
  const font = toFont(label.font);
  const lh = font.lineHeight;
  ctx.font = font.string;
  let width = 0;
  for (let i = 0; i < count; i++) {
    const text = lines[i];
    const textWidth = ctx.measureText(text).width;
    widthCache.set(text, textWidth);
    width = Math.max(width, textWidth);
  }

  return {
    width,
    height: count * lh
  };
}

function drawLabel(ctx, text) {
  const label = text.options;
  const rect = text.rect;
  const content = label.content;
  const labels = isArray(content) ? content : [content];
  const font = toFont(label.font);
  const lh = font.lineHeight;
  ctx.font = font.string;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = label.color;
  labels.forEach((l, i) => ctx.fillText(l, calculateFillTextX(rect, widthCache.get(l), label.textAlign), rect.y + i * lh));
}

function calculateX(x, width, anchor) {
  if (anchor === 'left') {
    return x - width;
  } else if (anchor === 'right') {
    return x;
  }
  return x - width / 2;
}

function calculateY(y, height, position) {
  if (position === 'top') {
    return y - height;
  } else if (position === 'bottom') {
    return y;
  }
  return y - height / 2;
}

function calculateFillTextX(rect, width, align) {
  if (align === 'left') {
    return rect.x;
  } else if (align === 'right') {
    return rect.x + rect.width - width;
  }
  return rect.x + (rect.width - width) / 2;
}
