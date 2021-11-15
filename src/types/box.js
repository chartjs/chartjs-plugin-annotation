import {scaleValue} from '../helpers';
import LabelAnnotation from './label';
import Label from './labelItem';

export default class BoxAnnotation extends LabelAnnotation {

  draw(ctx) {
    super.drawBox(ctx);
  }

  drawLabel(ctx) {
    const {x, y, width, height, options} = this;
    const labelOpts = options.label;
    // copies borderWidth to label options
    labelOpts.borderWidth = options.borderWidth;
    const label = this.label = new Label(this, labelOpts);
    if (label.isVisible()) {
      ctx.save();
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      ctx.clip();
      const labelSize = label.size(ctx);
      label.x = calculateX(this, labelSize);
      label.y = calculateY(this, labelSize);
      label.draw(ctx);
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
    align: 'center',
    color: 'black',
    content: null,
    drawTime: undefined,
    enabled: false,
    font: {
      family: undefined,
      lineHeight: undefined,
      size: undefined,
      style: undefined,
      weight: 'bold'
    },
    position: 'center',
    textAlign: 'start',
    xAdjust: 0,
    xPadding: 6,
    yAdjust: 0,
    yPadding: 6,
  }

};

BoxAnnotation.defaultRoutes = {
  borderColor: 'color',
  backgroundColor: 'color'
};

function calculateX(box, labelSize) {
  const {x, x2, width, label} = box;
  const {align, xPadding, xAdjust, borderWidth} = label.options;
  const margin = xPadding + (borderWidth / 2) + xAdjust;
  if (align === 'left') {
    return x + margin;
  } else if (align === 'right') {
    return x2 - labelSize.width - margin;
  }
  return x + (width - labelSize.width) / 2;
}

function calculateY(box, labelSize) {
  const {y, y2, height, label} = box;
  const {position, yPadding, borderWidth} = label.options;
  const margin = yPadding + (borderWidth / 2) + yAdjust;
  if (position === 'start') {
    return y + margin;
  } else if (position === 'end') {
    return y2 - labelSize.height - margin;
  }
  return y + (height - labelSize.height) / 2;
}
