import { Plugin, ChartType } from 'chart.js';
import { AnnotationPluginOptions } from './options';

declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    annotation: AnnotationPluginOptions;
  }
}

declare const Annotation: Plugin;

export default Annotation;

export * from './element';
export * from './events';
export * from './label';
export * from './options';
