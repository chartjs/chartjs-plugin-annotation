import { Chart } from 'chart.js';
import { AnnotationElement } from './element';

export interface EventContext {
	chart: Chart,
	element: AnnotationElement
}

export interface AnnotationEvents {
	enter?(context: EventContext): void,
	leave?(context: EventContext): void,
	click?(context: EventContext): void,
	dblclick?(context: EventContext): void,
}
