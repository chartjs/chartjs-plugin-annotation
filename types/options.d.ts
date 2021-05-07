import { Color } from 'chart.js';
import { AnnotationEvents, PartialEventContext } from './events';
import { LabelOptions } from './label';

export type DrawTime = 'afterDraw' | 'afterDatasetsDraw' | 'beforeDraw' | 'beforeDatasetsDraw';

export interface AnnotationTypeRegistry {
	line: LineAnnotationOptions
	box: BoxAnnotationOptions
  ellipse: EllipseAnnotationOptions
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

export interface AnnotationPluginOptions extends AnnotationEvents {
	annotations: AnnotationOptions[] | Record<string, AnnotationOptions>,
	dblClickSpeed?: Scriptable<number, PartialEventContext>,
	drawTime?: Scriptable<DrawTime, PartialEventContext>,
}
