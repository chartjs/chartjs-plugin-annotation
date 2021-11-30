import { Color } from 'chart.js';
import { AnnotationEvents, PartialEventContext } from './events';
import { LabelOptions, BoxLabelOptions, LabelTypeOptions } from './label';

export type DrawTime = 'afterDraw' | 'afterDatasetsDraw' | 'beforeDraw' | 'beforeDatasetsDraw';

export interface AnnotationTypeRegistry {
  box: BoxAnnotationOptions
  ellipse: EllipseAnnotationOptions
  label: LabelAnnotationOptions
  line: LineAnnotationOptions
  point: PointAnnotationOptions
}

export type AnnotationType = keyof AnnotationTypeRegistry;

export type AnnotationOptions<TYPE extends AnnotationType = AnnotationType> =
	{ [key in TYPE]: { type: key } & AnnotationTypeRegistry[key] }[TYPE]

export interface CoreAnnotationOptions extends AnnotationEvents {
  id?: string,
  display?: Scriptable<boolean, PartialEventContext>,
  adjustScaleRange?: Scriptable<boolean, PartialEventContext>,
  borderColor?: Scriptable<Color, PartialEventContext>,
  borderWidth?: Scriptable<number, PartialEventContext>,
  borderDash?: Scriptable<number[], PartialEventContext>,
  borderDashOffset?: Scriptable<number, PartialEventContext>,
  drawTime?: Scriptable<DrawTime, PartialEventContext>,
  endValue?: Scriptable<number|string, PartialEventContext>,
  scaleID?: Scriptable<string, PartialEventContext>,
  value?: Scriptable<number|string, PartialEventContext>,
  xScaleID?: Scriptable<string, PartialEventContext>,
  yScaleID?: Scriptable<string, PartialEventContext>,
}

export type Scriptable<T, TContext> = T | ((ctx: TContext, options: AnnotationOptions) => T);
export type ScaleValue = number | string;
interface AnnotationCoordinates {
  xMax?: Scriptable<ScaleValue, PartialEventContext>,
  xMin?: Scriptable<ScaleValue, PartialEventContext>,
  yMax?: Scriptable<ScaleValue, PartialEventContext>,
  yMin?: Scriptable<ScaleValue, PartialEventContext>,
}

export interface LineAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
  label?: LabelOptions
}

export interface BoxAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
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
  borderRadius?: Scriptable<number, PartialEventContext>,
  /**
   * @deprecated replaced by borderRadius
   * @todo remove at v2
   */
  cornerRadius?: Scriptable<number, PartialEventContext>,
  label?: BoxLabelOptions
}

export interface EllipseAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
  backgroundColor?: Scriptable<Color, PartialEventContext>,
}

export interface PointAnnotationOptions extends CoreAnnotationOptions {
  backgroundColor: Scriptable<Color, PartialEventContext>,
  radius?: Scriptable<number, PartialEventContext>,
  xValue?: Scriptable<ScaleValue, PartialEventContext>;
  yValue?: Scriptable<ScaleValue, PartialEventContext>;
}

export type CalloutPosition = 'left' | 'top' | 'bottom' | 'right' | 'auto';

export interface CalloutOptions {
  borderCapStyle?: Scriptable<CanvasLineCap, PartialEventContext>,
  borderColor?: Scriptable<Color, PartialEventContext>,
  borderDash?: Scriptable<number[], PartialEventContext>,
  borderDashOffset?: Scriptable<number, PartialEventContext>,
  borderJoinStyle?: Scriptable<CanvasLineJoin, PartialEventContext>,
  borderWidth?: Scriptable<number, PartialEventContext>,
  enabled?: Scriptable<boolean, PartialEventContext>,
  margin?: Scriptable<number, PartialEventContext>,
  position?: Scriptable<CalloutPosition, PartialEventContext>,
  side?: Scriptable<number, PartialEventContext>,
  start?: Scriptable<number | string, PartialEventContext>,
}

export interface LabelPointOptions {
  backgroundColor?: Scriptable<Color, PartialEventContext>,
  borderColor?: Scriptable<Color, PartialEventContext>,
  borderDash?: Scriptable<number[], PartialEventContext>,
  borderDashOffset?: Scriptable<number, PartialEventContext>,
  borderWidth?: Scriptable<number, PartialEventContext>,
  enabled?: Scriptable<boolean, PartialEventContext>,
  radius?: Scriptable<number, PartialEventContext>
}

export interface LabelAnnotationOptions extends CoreAnnotationOptions, LabelTypeOptions {
  xValue?: Scriptable<ScaleValue, PartialEventContext>;
  yValue?: Scriptable<ScaleValue, PartialEventContext>;
  callout?: CalloutOptions;
  point?: LabelPointOptions;
}

export interface AnnotationPluginOptions extends AnnotationEvents {
  annotations: AnnotationOptions[] | Record<string, AnnotationOptions>,
  dblClickSpeed?: Scriptable<number, PartialEventContext>,
  drawTime?: Scriptable<DrawTime, PartialEventContext>,
  animations: Record<string, unknown>,
}
