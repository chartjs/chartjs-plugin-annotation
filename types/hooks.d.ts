import { AnnotationElement } from './element';
import { PartialEventContext, EventContext } from './events';

export interface AnnotationHooks {
  beforeInit?(context: PartialEventContext): void,
  afterInit?(context: PartialEventContext, properties: AnnotationElement): void,
  beforeDraw?(context: EventContext): boolean,
  afterDraw?(context: EventContext): void
}

export interface AnnotationLabelHooks {
  beforeDrawLabel?(context: EventContext): boolean,
  afterDrawLabel?(context: EventContext): void
}
