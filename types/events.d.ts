import { Chart, ChartEvent } from 'chart.js';
import { AnnotationElement } from './element';

export interface EventContext {
  chart: Chart,
  element: AnnotationElement,
  id: string,
  type: string
}

/**
 * Some scriptable options may be called with during the chart's initial
 * display, when the element isn't fully initialized.
 */
export interface PartialEventContext {
  chart: Chart,
  element?: Partial<AnnotationElement>,
  id?: string,
  type?: string
}

export interface AnnotationEvents {
  enter?(context: EventContext, event: ChartEvent): void,
  leave?(context: EventContext, event: ChartEvent): void,
  click?(context: EventContext, event: ChartEvent): void,
  dblclick?(context: EventContext, event: ChartEvent): void,
}
