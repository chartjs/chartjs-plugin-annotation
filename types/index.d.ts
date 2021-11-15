import { ChartType, Plugin } from 'chart.js';
import { AnnotationPluginOptions, BoxAnnotationOptions, EllipseAnnotationOptions, LineAnnotationOptions, PointAnnotationOptions } from './options';

declare module 'chart.js' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface PluginOptionsByType<TType extends ChartType> {
    annotation: AnnotationPluginOptions;
  }

  interface ElementOptionsByType<TType extends ChartType> {
    boxAnnotation: BoxAnnotationOptions;
    lineAnnotation: LineAnnotationOptions;
    ellipseAnnotation: EllipseAnnotationOptions;
    pointAnnotation: PointAnnotationOptions;
  }
}

declare const Annotation: Plugin;

export default Annotation;

export * from './element';
export * from './events';
export * from './label';
export * from './options';
