import {Element} from 'chart.js';
import {getChartRect, getRectCenterPoint, inBoxRange} from '../helpers';

export default class CustomAnnotation extends Element {

  inRange(mouseX, mouseY, useFinalPosition) {
    return inBoxRange(mouseX, mouseY, this.getProps(['x', 'y', 'width', 'height'], useFinalPosition));
  }

  getCenterPoint(useFinalPosition) {
    return getRectCenterPoint(this, useFinalPosition);
  }

  draw(ctx) {
    const {x, y, width, height, options} = this;

    if (typeof options.draw !== 'function') {
      throw new Error('No draw function defined for CustomAnnotation');
    }

    ctx.save();
    options.draw(ctx, {x, y, width, height}, options, this._chart);
    ctx.restore();
  }

  resolveElementProperties(chart, options) {
    this._chart = chart;
    return getChartRect(chart, options);
  }
}

CustomAnnotation.id = 'customAnnotation';

CustomAnnotation.defaults = {
  adjustScaleRange: true,
  display: true,
  draw: undefined,
  xScaleID: 'x',
  xMin: undefined,
  xMax: undefined,
  yScaleID: 'y',
  yMin: undefined,
  yMax: undefined,
};

CustomAnnotation.descriptors = {
  _indexable: false,
  _scriptable: (prop) => !['draw', 'enter', 'click', 'dblclick', 'leave'].includes(prop),
};

CustomAnnotation.defaultRoutes = {
  color: 'color',
  borderColor: 'color',
  backgroundColor: 'color'
};
