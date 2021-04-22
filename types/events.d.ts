import { Chart } from 'chart.js';
import { AnnotationElement } from './element';

export interface EventContext {
	chart: Chart,
	element: AnnotationElement
}

/**
 * Some scriptable options may be called with during the chart's initial
 * display, when the element isn't fully initialized.
 */
export interface PartialEventContext {
  chart: Chart,
  element?: Partial<AnnotationElement>,
}

export interface AnnotationEvents {
	enter?(context: EventContext): void,
	leave?(context: EventContext): void,
	click?(context: EventContext): void,
	dblclick?(context: EventContext): void,
}
