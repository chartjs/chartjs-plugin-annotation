import {defaults} from 'chart.js';
import BoxAnnotation from './box';
import DoughnutLabelAnnotation from './doughnutLabel';
import LineAnnotation from './line';
import EllipseAnnotation from './ellipse';
import LabelAnnotation from './label';
import PointAnnotation from './point';
import PolygonAnnotation from './polygon';

export const annotationTypes = {
  box: BoxAnnotation,
  doughnutLabel: DoughnutLabelAnnotation,
  ellipse: EllipseAnnotation,
  label: LabelAnnotation,
  line: LineAnnotation,
  point: PointAnnotation,
  polygon: PolygonAnnotation
};

export {
  BoxAnnotation,
  DoughnutLabelAnnotation,
  EllipseAnnotation,
  LabelAnnotation,
  LineAnnotation,
  PointAnnotation,
  PolygonAnnotation
};


Object.keys(annotationTypes).forEach(key => {
  defaults.describe(`elements.${annotationTypes[key].id}`, {
    _fallback: 'plugins.annotation.common'
  });
});
