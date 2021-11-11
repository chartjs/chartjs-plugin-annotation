import {Element} from 'chart.js';
import {addRoundedRectPath, toTRBLCorners, isArray, toFont} from 'chart.js/helpers';
import {clampAll, scaleValue} from '../helpers';

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

  boxMustBeDrawn() {
    return (this.options.backgroundColor && this.options.backgroundColor !== 'transparent') || this.options.borderWidth > 0;
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
      if (this.boxMustBeDrawn()) {
        drawBox(ctx, this);
      }
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
    return {
      x: calculateX(x, size.width, options),
      y: calculateY(y, size.height, options),
      width: size.width,
      height: size.height
    };
  }
}

TextAnnotation.id = 'textAnnotation';

TextAnnotation.defaults = {
  adjustScaleRange: true,
  align: 'center',
  display: true,
  backgroundColor: 'transparent',
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 0,
  borderRadius: 0,
  color: 'black',
  content: null,
  drawTime: undefined,
  font: {
    family: undefined,
    lineHeight: undefined,
    size: undefined,
    style: undefined,
    weight: undefined
  },
  position: 'middle',
  textAlign: 'center',
  xAdjust: 0,
  xPadding: 6,
  xScaleID: 'x',
  xValue: undefined,
  yAdjust: 0,
  yPadding: 6,
  yScaleID: 'y',
  yValue: undefined
};

TextAnnotation.defaultRoutes = {
  borderColor: 'color',
};

function drawBox(ctx, text) {
  const {x, y, width, height, options} = text.getProps(['x', 'y', 'width', 'height', 'options']);
  ctx.save();
  ctx.lineWidth = options.borderWidth;
  ctx.strokeStyle = options.borderColor;
  ctx.fillStyle = options.backgroundColor;
  ctx.setLineDash(options.borderDash);
  ctx.lineDashOffset = options.borderDashOffset;
  ctx.beginPath();
  addRoundedRectPath(ctx, {
    x, y, w: width, h: height,
    radius: clampAll(toTRBLCorners(options.borderRadius), 0, Math.min(width, height) / 2)
  });
  ctx.closePath();
  ctx.fill();
  if (options.borderWidth) {
    ctx.stroke();
  }
  ctx.restore();
}

const widthCache = new Map();
function measureLabel(ctx, label) {
  const content = label.content;
  const lines = isArray(content) ? content : [content];
  const count = lines.length;
  const font = toFont(label.font);
  const lh = font.lineHeight;
  const xPadding = label.xPadding;
  const yPadding = label.yPadding;
  const borderWidth = label.borderWidth;
  ctx.font = font.string;
  let width = 0;
  for (let i = 0; i < count; i++) {
    const text = lines[i];
    const key = font.string + '-' + text;
    const textWidth = ctx.measureText(text).width;
    widthCache.set(key, textWidth);
    width = Math.max(width, textWidth);
  }
  width += xPadding * 2 + borderWidth;
  return {
    width,
    height: count * lh + yPadding * 2 + borderWidth
  };
}

function drawLabel(ctx, text) {
  const label = text.options;
  const content = label.content;
  const labels = isArray(content) ? content : [content];
  const yPadding = label.yPadding;
  const borderWidth = label.borderWidth;
  const font = toFont(label.font);
  const lh = font.lineHeight;
  ctx.font = font.string;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = label.color;
  // adds 1.5 because the baseline to top, add 3 pixels from the line for normal letters
  labels.forEach((l, i) => ctx.fillText(l, calculateFillTextX(text, widthCache.get(font.string + '-' + l)), text.y + yPadding + (borderWidth / 2) + 1.5 + i * lh));
}

function calculateX(x, width, options) {
  const {align, xAdjust} = options;
  if (align === 'left') {
    return x - width + xAdjust;
  } else if (align === 'right') {
    return x + xAdjust;
  }
  return x - width / 2 + xAdjust;
}

function calculateY(y, height, options) {
  const {position, yAdjust} = options;
  if (position === 'top') {
    return y - height + yAdjust;
  } else if (position === 'bottom') {
    return y + yAdjust;
  }
  return y - height / 2 + yAdjust;
}

function calculateFillTextX(text, textWidth) {
  const {x, width, options} = text;
  const {textAlign, xPadding, borderWidth} = options;
  if (textAlign === 'start') {
    return x + xPadding + (borderWidth / 2);
  } else if (textAlign === 'end') {
    return x + width - textWidth - xPadding - (borderWidth / 2);
  }
  return x + (width - textWidth) / 2;
}
