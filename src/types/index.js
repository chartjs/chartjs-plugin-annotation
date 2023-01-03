import {defaults} from 'chart.js';
import {isObject} from 'chart.js/helpers';
import BoxAnnotation from './box';
import DoughnutLabelAnnotation from './doughnutLabel';
import LineAnnotation from './line';
import EllipseAnnotation from './ellipse';
import LabelAnnotation from './label';
import PointAnnotation from './point';
import PolygonAnnotation from './polygon';

export const filterTypes = key => (isObject(key) ? key.type : key) !== 'doughnutLabel';

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

/**
 * Register fallback for annotation elements
 * For example lineAnnotation options would be looked through:
 * - the annotation object (options.plugins.annotation.annotations[id])
 * - element options (options.elements.lineAnnotation)
 * - element defaults (defaults.elements.lineAnnotation)
 * - annotation plugin defaults (defaults.plugins.annotation, this is what we are registering here)
 */
Object.keys(annotationTypes).filter(filterTypes).forEach(key => {
  defaults.describe(`elements.${annotationTypes[key].id}`, {
    _fallback: 'plugins.annotation.common'
  });
});
