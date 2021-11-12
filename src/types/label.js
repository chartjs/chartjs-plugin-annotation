import {Element} from 'chart.js';
import {addRoundedRectPath, toTRBLCorners, isArray, toFont} from 'chart.js/helpers';
import {getCenterPoint, clampAll, scaleValue} from '../helpers';

export default class LabelAnnotation extends Element {

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
    return getCenterPoint(this, useFinalPosition);
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
    return calculateRect(x, y, measureLabel(ctx, options), options);
  }
}

LabelAnnotation.id = 'labelAnnotation';

LabelAnnotation.defaults = {
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

LabelAnnotation.defaultRoutes = {
  borderColor: 'color',
};

function drawBox(ctx, element) {
  const {x, y, width, height, options} = element.getProps(['x', 'y', 'width', 'height', 'options']);
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

function measureLabel(ctx, label) {
  const content = label.content;
  const lines = isArray(content) ? content : [content];
  const count = lines.length;
  const font = toFont(label.font);
  const borderWidth = label.borderWidth;
  ctx.font = font.string;
  let width = 0;
  for (let i = 0; i < count; i++) {
    const text = lines[i];
    width = Math.max(width, ctx.measureText(text).width);
  }
  width += label.xPadding * 2 + borderWidth;
  return {
    width,
    height: count * font.lineHeight + label.yPadding * 2 + borderWidth
  };
}

function drawLabel(ctx, element) {
  const label = element.options;
  const content = label.content;
  const labels = isArray(content) ? content : [content];
  const font = toFont(label.font);
  const lh = font.lineHeight;
  const x = calculateLabelXAlignment(element);
  const y = element.y + label.yPadding + (label.borderWidth / 2) + (lh / 2);
  ctx.font = font.string;
  ctx.textBaseline = 'middle';
  ctx.textAlign = label.textAlign;
  ctx.fillStyle = label.color;
  labels.forEach((l, i) => ctx.fillText(l, x, y + (i * lh)));
}

const alignEnumValues = ['left', 'right'];
const positionEnumValues = ['top', 'bottom'];
function calculateRect(x, y, size, options) {
  const {align, position, xAdjust, yAdjust} = options;
  const {width, height} = size;
  return {
    x: calculateByOptionValue({base: x, size: width}, xAdjust, align, alignEnumValues),
    y: calculateByOptionValue({base: y, size: height}, yAdjust, position, positionEnumValues),
    width,
    height
  };
}

function calculateByOptionValue(area, adjust, option, enumValues) {
  const {base, size} = area;
  if (option === enumValues[0]) {
    return base - size + adjust;
  } else if (option === enumValues[1]) {
    return base + adjust;
  }
  return base - size / 2 + adjust;
}


function calculateLabelXAlignment(element) {
  const {x, width, options} = element;
  const {textAlign, xPadding, borderWidth} = options;
  if (textAlign === 'start') {
    return x + xPadding + (borderWidth / 2);
  } else if (textAlign === 'end') {
    return x + width - xPadding - (borderWidth / 2);
  }
  return x + width / 2;
}