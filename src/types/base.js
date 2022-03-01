import {Element} from 'chart.js';

export default class BaseAnnotation extends Element {

  getCenterPoint(useFinalPosition) {
    const {centerX, centerY} = this.getProps(['centerX', 'centerY'], useFinalPosition);
    return {x: centerX, y: centerY};
  }

}
