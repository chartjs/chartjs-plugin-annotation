import { AnnotationOptions } from './options';

export interface AnnotationElement {
  x: number,
  y: number,
  x2: number,
  y2: number,
  centerX: number,
  centerY: number,
  height: number,
  width: number,
  options: AnnotationOptions
}
