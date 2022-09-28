import { Color, PointStyle, BorderRadius, CoreInteractionOptions } from 'chart.js';
import { AnnotationEvents, PartialEventContext } from './events';
import { LabelOptions, BoxLabelOptions, LabelTypeOptions } from './label';

export type DrawTime = 'afterDraw' | 'afterDatasetsDraw' | 'beforeDraw' | 'beforeDatasetsDraw';

export interface AnnotationTypeRegistry {
  box: BoxAnnotationOptions
  ellipse: EllipseAnnotationOptions
  label: LabelAnnotationOptions
  line: LineAnnotationOptions
  point: PointAnnotationOptions
  polygon: PolygonAnnotationOptions
}

export type AnnotationType = keyof AnnotationTypeRegistry;
export type AnnotationOptions<TYPE extends AnnotationType = AnnotationType> =
	{ [key in TYPE]: { type: key } & AnnotationTypeRegistry[key] }[TYPE]

export type Scriptable<T, TContext> = T | ((ctx: TContext, options: AnnotationOptions) => T);
export type ScaleValue = number | string;

interface ShadowOptions {
  backgroundShadowColor?: Scriptable<Color, PartialEventContext>,
  borderShadowColor?: Scriptable<Color, PartialEventContext>,
  shadowBlur?: Scriptable<number, PartialEventContext>,
  shadowOffsetX?: Scriptable<number, PartialEventContext>,
  shadowOffsetY?: Scriptable<number, PartialEventContext>
}

export interface CoreAnnotationOptions extends AnnotationEvents, ShadowOptions{
  adjustScaleRange?: Scriptable<boolean, PartialEventContext>,
  borderColor?: Scriptable<Color, PartialEventContext>,
  borderDash?: Scriptable<number[], PartialEventContext>,
  borderDashOffset?: Scriptable<number, PartialEventContext>,
  borderWidth?: Scriptable<number, PartialEventContext>,
  display?: Scriptable<boolean, PartialEventContext>,
  drawTime?: Scriptable<DrawTime, PartialEventContext>,
  id?: string,
  xMax?: Scriptable<ScaleValue, PartialEventContext>,
  xMin?: Scriptable<ScaleValue, PartialEventContext>,
  xScaleID?: Scriptable<string, PartialEventContext>,
  yMax?: Scriptable<ScaleValue, PartialEventContext>,
  yMin?: Scriptable<ScaleValue, PartialEventContext>,
  yScaleID?: Scriptable<string, PartialEventContext>,
  z?: Scriptable<number, PartialEventContext>
}

interface AnnotationPointCoordinates {
  xValue?: Scriptable<ScaleValue, PartialEventContext>,
  yValue?: Scriptable<ScaleValue, PartialEventContext>,
}

export interface ArrowHeadOptions extends ShadowOptions {
  backgroundColor?: Scriptable<Color, PartialEventContext>,
  borderColor?: Scriptable<Color, PartialEventContext>,
  borderDash?: Scriptable<number[], PartialEventContext>,
  borderDashOffset?: Scriptable<number, PartialEventContext>,
  borderWidth?: Scriptable<number, PartialEventContext>,
  display?: Scriptable<boolean, PartialEventContext>,
  fill?: Scriptable<boolean, PartialEventContext>,
  length?: Scriptable<number, PartialEventContext>,
  width?: Scriptable<number, PartialEventContext>,
}

export interface ArrowHeadsOptions extends ArrowHeadOptions{
  end?: ArrowHeadOptions,
  start?: ArrowHeadOptions,
}

export interface LineAnnotationOptions extends CoreAnnotationOptions {
  arrowHeads?: ArrowHeadsOptions,
  endValue?: Scriptable<number|string, PartialEventContext>,
  label?: LabelOptions,
  scaleID?: Scriptable<string, PartialEventContext>,
  value?: Scriptable<number|string, PartialEventContext>
}

export interface BoxAnnotationOptions extends CoreAnnotationOptions {
  backgroundColor?: Scriptable<Color, PartialEventContext>,
  /**
   * Border line cap style. See MDN.
   * @default 'butt'
   */
  borderCapStyle?: Scriptable<CanvasLineCap, PartialEventContext>,
  /**
   * Border line dash. See MDN.
   * @default []
   */
  borderDash?: Scriptable<number[], PartialEventContext>,
  /**
   * Border line dash offset. See MDN.
   * @default 0.0
   */
  borderDashOffset?: Scriptable<number, PartialEventContext>,
  /**
   * Border line join style. See MDN.
   * @default 'miter'
   */
  borderJoinStyle?: Scriptable<CanvasLineJoin, PartialEventContext>,
  borderRadius?: Scriptable<number | BorderRadius, PartialEventContext>,
  label?: BoxLabelOptions,
  rotation?: Scriptable<number, PartialEventContext>
}

export interface EllipseAnnotationOptions extends CoreAnnotationOptions {
  backgroundColor?: Scriptable<Color, PartialEventContext>,
  label?: BoxLabelOptions,
  rotation?: Scriptable<number, PartialEventContext>
}

export interface PointAnnotationOptions extends CoreAnnotationOptions, AnnotationPointCoordinates {
  backgroundColor: Scriptable<Color, PartialEventContext>,
  pointStyle?: Scriptable<PointStyle, PartialEventContext>,
  radius?: Scriptable<number, PartialEventContext>,
  rotation?: Scriptable<number, PartialEventContext>,
  xAdjust?: Scriptable<number, PartialEventContext>,
  yAdjust?: Scriptable<number, PartialEventContext>,
}

export interface LabelAnnotationOptions extends CoreAnnotationOptions, LabelTypeOptions, AnnotationPointCoordinates {
  rotation?: Scriptable<number, PartialEventContext>
}

interface PolygonAnnotationOptions extends CoreAnnotationOptions, AnnotationPointCoordinates {
  backgroundColor: Scriptable<Color, PartialEventContext>,
  borderCapStyle?: Scriptable<CanvasLineCap, PartialEventContext>,
  borderJoinStyle?: Scriptable<CanvasLineJoin, PartialEventContext>,
  point?: PointAnnotationOptions,
  radius?: Scriptable<number, PartialEventContext>,
  rotation?: Scriptable<number, PartialEventContext>,
  sides?: Scriptable<number, PartialEventContext>,
  xAdjust?: Scriptable<number, PartialEventContext>,
  yAdjust?: Scriptable<number, PartialEventContext>,
}

export interface AnnotationPluginOptions extends AnnotationEvents {
  animations?: Record<string, unknown>,
  annotations: AnnotationOptions[] | Record<string, AnnotationOptions>,
  clip?: boolean,
  common?: BoxAnnotationOptions | EllipseAnnotationOptions | LabelAnnotationOptions | LineAnnotationOptions | PointAnnotationOptions | PolygonAnnotationOptions,
  interaction?: CoreInteractionOptions
}
