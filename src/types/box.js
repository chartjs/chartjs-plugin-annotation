import {Element} from 'chart.js';
import {addRoundedRectPath, toTRBLCorners, valueOrDefault, isArray, toFont} from 'chart.js/helpers';
import {clampAll, scaleValue} from '../helpers';

export default class BoxAnnotation extends Element {
  inRange(mouseX, mouseY, useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);

    return mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
  }

  getCenterPoint(useFinalPosition) {
    const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
    return {
      x: x + width / 2,
      y: y + height / 2
    };
  }

  draw(ctx) {
    const {x, y, width, height, options} = this;

    ctx.save();

    ctx.lineWidth = options.borderWidth;
    ctx.strokeStyle = options.borderColor;
    ctx.fillStyle = options.backgroundColor;

    ctx.setLineDash(options.borderDash);
    ctx.lineDashOffset = options.borderDashOffset;

    ctx.beginPath();
    addRoundedRectPath(ctx, {
      x, y, w: width, h: height,
      // TODO: v2 remove support for cornerRadius
      radius: clampAll(toTRBLCorners(valueOrDefault(options.cornerRadius, options.borderRadius)), 0, Math.min(width, height) / 2)
    });
    ctx.closePath();
    ctx.fill();

    // If no border, don't draw it
    if (options.borderWidth) {
      ctx.stroke();
    }

    ctx.restore();
  }

  drawLabel(ctx) {
    const {x, y, width, height, options} = this;
    const label = options.label;
    if (label && label.enabled && label.content) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.clip();
      drawLabel(ctx, this);
      ctx.restore();
    }
  }

  resolveElementProperties(chart, options) {
    const xScale = chart.scales[options.xScaleID];
    const yScale = chart.scales[options.yScaleID];
    let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
    let min, max;

    if (!xScale && !yScale) {
      return {options: {}};
    }

    if (xScale) {
      min = scaleValue(xScale, options.xMin, x);
      max = scaleValue(xScale, options.xMax, x2);
      x = Math.min(min, max);
      x2 = Math.max(min, max);
    }

    if (yScale) {
      min = scaleValue(yScale, options.yMin, y2);
      max = scaleValue(yScale, options.yMax, y);
      y = Math.min(min, max);
      y2 = Math.max(min, max);
    }

    return {
      x,
      y,
      x2,
      y2,
      width: x2 - x,
      height: y2 - y
    };
  }
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
  display: true,
  adjustScaleRange: true,
  borderDash: [],
  borderDashOffset: 0,
  borderWidth: 1,
  borderRadius: 0,
  xScaleID: 'x',
  xMin: undefined,
  xMax: undefined,
  yScaleID: 'y',
  yMin: undefined,
  yMax: undefined,
  label: {
    enabled: false,
    content: null,
    drawTime: undefined,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: 'bold'
    },
    color: 'black',
    position: 'middle',
    textAlign: 'center',
    xPadding: 6,
    yPadding: 6,
  }

};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function drawLabel(ctx, box) {
  const label = box.options.label;
  const content = label.content;
  const labels = isArray(content) ? content : [content];
  const font = toFont(label.font);
  const lh = font.lineHeight;
  const xyPoint = calculateXYLabel(box, labels, lh);
  ctx.font = font.string;
  ctx.textAlign = label.textAlign;
  ctx.textBaseline = label.position;
  ctx.fillStyle = label.color;
  labels.forEach((l, i) => ctx.fillText(l, xyPoint.x, xyPoint.y + i * lh));
}

function calculateXYLabel(box, labels, lineHeight) {
  const {y, height, options} = box;
  const labelsOpts = options.label;
  const borderWidth = options.borderWidth;
  const {textAlign, position, xPadding, yPadding} = labelsOpts;
  let lblX, lblY;
  lblX = calculateX(box, textAlign, xPadding, borderWidth);
  if (position === 'top') {
    lblY = y + yPadding + borderWidth;
  } else if (position === 'bottom') {
    lblY = y + height - yPadding - borderWidth - (labels.length - 1) * lineHeight;
  } else {
    lblY = y + height / 2 - (labels.length - 1) * lineHeight / 2;
  }
  return {x: lblX, y: lblY};
}

function calculateX(box, align, padding, borderWidth) {
  if (align === 'left') {
    return box.x + padding + borderWidth;
  } else if (align === 'right') {
    return box.x + box.width - padding - borderWidth;
  }
  return box.x + box.width / 2;
}
