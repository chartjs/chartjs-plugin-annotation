import { Color, FontSpec } from 'chart.js';
import { AnnotationEvents, PartialEventContext } from './events';
import { LabelOptions, LabelTextAlign } from './label';

export type DrawTime = 'afterDraw' | 'afterDatasetsDraw' | 'beforeDraw' | 'beforeDatasetsDraw';

export interface AnnotationTypeRegistry {
  line: LineAnnotationOptions
  box: BoxAnnotationOptions
  ellipse: EllipseAnnotationOptions
  point: PointAnnotationOptions
  label: LabelAnnotationOptions
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
	borderDash?: Scriptable<[number, number], PartialEventContext>,
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
  borderRadius?: Scriptable<number, PartialEventContext>,
  /**
   * @deprecated replaced by borderRadius
   * @todo remove at v2
   */
  cornerRadius?: Scriptable<number, PartialEventContext>
}

interface EllipseAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
	backgroundColor?: Scriptable<Color, PartialEventContext>,
}

interface PointAnnotationOptions extends CoreAnnotationOptions {
	backgroundColor: Scriptable<Color, PartialEventContext>,
	radius?: Scriptable<number, PartialEventContext>,
	xValue?: Scriptable<ScaleValue, PartialEventContext>;
	yValue?: Scriptable<ScaleValue, PartialEventContext>;
}

export type LabelAnnotationPosition = 'top' | 'middle' | 'bottom';

export type LabelAnnotationAlign = 'left' | 'center' | 'right';

interface LabelAnnotationOptions extends CoreAnnotationOptions {
  align?: Scriptable<LabelAnnotationAlign, PartialEventContext>,
  backgroundColor?: Scriptable<Color, PartialEventContext>,
  borderRadius?: Scriptable<number, PartialEventContext>,
  color?: Scriptable<Color, PartialEventContext>,
  content: Scriptable<string | string[] | null, PartialEventContext>,
  font?: FontSpec
  position?: Scriptable<LabelAnnotationPosition, PartialEventContext>,
  textAlign?: Scriptable<LabelTextAlign, PartialEventContext>,
  xPadding?: Scriptable<number, PartialEventContext>,
  yPadding?: Scriptable<number, PartialEventContext>,
  xAdjust?: Scriptable<number, PartialEventContext>,
  yAdjust?: Scriptable<number, PartialEventContext>,
  xValue?: Scriptable<ScaleValue, PartialEventContext>;
  yValue?: Scriptable<ScaleValue, PartialEventContext>;
}

export interface AnnotationPluginOptions extends AnnotationEvents {
	annotations: AnnotationOptions[] | Record<string, AnnotationOptions>,
	dblClickSpeed?: Scriptable<number, PartialEventContext>,
  drawTime?: Scriptable<DrawTime, PartialEventContext>,
  animations: Record<string, unknown>,
}
