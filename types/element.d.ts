import { AnnotationOptions } from './options';

export interface AnnotationElement {
  x: number,
  y: number,
  x2?: number,
  y2?: number,
  width: number,
  height: number,
  pointX?: number,
  pointY?: number,
  labelX?: number,
  labelY?: number,
  labelWidth?: number,
  labelHeight?: number,
  options: AnnotationOptions
}
