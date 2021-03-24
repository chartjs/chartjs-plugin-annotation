import { Color } from 'chart.js';
import { AnnotationEvents, EventContext } from './events';
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
  display?: boolean | ((context: EventContext) => boolean);
	borderColor?: Color,
	borderWidth?: number,
	borderDash?: [number, number],
	borderDashOffset?: number,
	drawTime?: DrawTime,
	endValue?: any,
	scaleID?: string,
	value?: any,
	xScaleID?: string,
	yScaleID?: string,
}

interface AnnotationCoordinates {
  xMax?: any,
  xMin?: any,
  yMax?: any,
  yMin?: any,
}

export interface LineAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
	label?: LabelOptions
}

export interface BoxAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
	backgroundColor?: Color,
	cornerRadius?: number
}

interface EllipseAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
	backgroundColor?: Color,
}

interface PointAnnotationOptions extends CoreAnnotationOptions {
	backgroundColor: Color,
	radius?: number,
	xValue?: any;
	yValue?: any;
}

export interface AnnotationPluginOptions extends AnnotationEvents {
	annotations: AnnotationOptions[]
	dblClickSpeed?: number,
	drawTime?: DrawTime,
}
