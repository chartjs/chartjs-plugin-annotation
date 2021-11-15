import {isArray, toFont} from 'chart.js/helpers';

const widthCache = new Map();
const toPercent = (s) => typeof s === 'string' && s.endsWith('%') && parseFloat(s) / 100;

export default class Label {

  constructor(element, options) {
    this.element = element;
    this.options = options || {};
  }

  isVisible() {
    return (this.options.display || this.options.enabled) && this.options.content;
  }

  draw(ctx) {
    const size = this.size(ctx);
    this.width = size.width;
    this.height = size.height;
    const content = this.options.content;
    if (content instanceof Image) {
      ctx.drawImage(content, this.x, this.y, this.width, this.height);
      return;
    }
    const labels = isArray(content) ? content : [content];
    const font = toFont(this.options.font);
    const lh = font.lineHeight;
    const x = calculateTextAlignment(this);
    const y = this.y + (lh / 2);
    ctx.font = font.string;
    ctx.textBaseline = 'middle';
    ctx.textAlign = this.options.textAlign;
    ctx.fillStyle = this.options.color;
    labels.forEach((l, i) => ctx.fillText(l, x, y + (i * lh)));
  }

  size(ctx) {
    const content = this.options.content;
    if (content instanceof Image) {
      return {
        width: getImageSize(content.width, this.options.width),
        height: getImageSize(content.height, this.options.height)
      };
    }
    const font = toFont(this.options.font);
    const lines = isArray(content) ? content : [content];
    const mapKey = lines.join() + font.string;
    if (!widthCache.has(mapKey)) {
      ctx.save();
      ctx.font = font.string;
      const count = lines.length;
      let width = 0;
      for (let i = 0; i < count; i++) {
        const text = lines[i];
        width = Math.max(width, ctx.measureText(text).width);
      }
      ctx.restore();
      const height = count * font.lineHeight;
      widthCache.set(mapKey, {width, height});
    }
    return widthCache.get(mapKey);
  }
}

function getImageSize(size, value) {
  if (typeof value === 'number') {
    return value;
  } else if (typeof value === 'string') {
    return toPercent(value) * size;
  }
  return size;
}

function calculateTextAlignment(label) {
  const {x, width, options} = label;
  const textAlign = options.textAlign;
  if (textAlign === 'center') {
    return x + width / 2;
  } else if (textAlign === 'end' || textAlign === 'right') {
    return x + width;
  }
  return x;
}
