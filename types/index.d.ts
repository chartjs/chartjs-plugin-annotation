import { Plugin } from 'chart.js';
import { AnnotationPluginOptions } from './options';

declare module 'chart.js' {
	interface PluginOptions {
	  annotation: AnnotationPluginOptions;
	}
}

declare const Annotation: Plugin;

export { Annotation };
