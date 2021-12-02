import {defaults} from 'chart.js';
import BoxAnnotation from './box';
import CustomAnnotation from './custom';
import EllipseAnnotation from './ellipse';
import LabelAnnotation from './label';
import LineAnnotation from './line';
import PointAnnotation from './point';
import PolygonAnnotation from './polygon';

export const annotationTypes = {
  box: BoxAnnotation,
  custom: CustomAnnotation,
  ellipse: EllipseAnnotation,
  label: LabelAnnotation,
  line: LineAnnotation,
  point: PointAnnotation,
  polygon: PolygonAnnotation
};

export {
  BoxAnnotation,
  CustomAnnotation,
  LineAnnotation,
  EllipseAnnotation,
  LabelAnnotation,
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
Object.keys(annotationTypes).forEach(key => {
  defaults.describe(`elements.${annotationTypes[key].id}`, {
    _fallback: 'plugins.annotation'
  });
});
