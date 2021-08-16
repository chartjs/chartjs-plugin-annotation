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
	enter?(context: EventContext, event: Event): void,
	leave?(context: EventContext, event: Event): void,
	click?(context: EventContext, event: Event): void,
	dblclick?(context: EventContext, event: Event): void,
}
