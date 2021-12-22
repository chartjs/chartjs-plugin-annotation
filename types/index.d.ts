import { ChartType, Plugin } from 'chart.js';
import { AnnotationPluginOptions, BoxAnnotationOptions, EllipseAnnotationOptions, LabelAnnotationOptions, LineAnnotationOptions, PointAnnotationOptions, PolygonAnnotationOptions } from './options';

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    annotation: AnnotationPluginOptions;
  }

  interface ElementOptionsByType<TType extends ChartType> {
    boxAnnotation: BoxAnnotationOptions;
    ellipseAnnotation: EllipseAnnotationOptions;
    labelAnnotation: LabelAnnotationOptions;
    lineAnnotation: LineAnnotationOptions;
    pointAnnotation: PointAnnotationOptions;
    polygonAnnotation: PolygonAnnotationOptions;
  }
}

declare const Annotation: Plugin;

export default Annotation;

export * from './element';
export * from './events';
export * from './label';
export * from './options';
