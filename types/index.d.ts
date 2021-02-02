import { Plugin } from 'chart.js';
import { AnnotationPluginOptions } from './options';

declare module 'chart.js' {
	interface PluginOptionsByType {
	  annotation: AnnotationPluginOptions;
	}
}

declare const Annotation: Plugin;

export default Annotation;

export * from './element';
export * from './events';
export * from './label';
export * from './options';
