import { AnnotationOptions } from './options';

export interface AnnotationBoxModel {
  x: number,
  y: number,
  x2: number,
  y2: number,
  centerX: number,
  centerY: number,
  height: number,
  width: number,
  radius?: number
  // Used by polygon annotations' child point AnnotationElements
  bx?: number;
  by?: number;
}

export interface AnnotationElement extends AnnotationBoxModel {
  label?: AnnotationElement,
  options: AnnotationOptions,
  /**
   * Sub-elements: e.g., a box annotation's label, or a polygon's points
   */
  elements?: AnnotationElement[],
}
