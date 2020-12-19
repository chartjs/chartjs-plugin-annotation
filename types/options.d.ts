import { Color, DeepPartial } from "chart.js";
import { AnnotationEvents } from "./events";
import { LabelOptions } from "./label";

export type DrawTime = 'afterDraw' | 'afterDatasetsDraw' | 'beforeDatasetsDraw';
export type Mode = 'horizontal' | 'vertical';

export interface AnnotationTypeRegistry {
	line: LineAnnotationOptions
	box: BoxAnnotationOptions
}

export type AnnotationType = keyof AnnotationTypeRegistry;

export type AnnotationOptions<TYPE extends AnnotationType = AnnotationType> = DeepPartial<
	{ [key in TYPE]: { type: key } & AnnotationTypeRegistry[key] }[TYPE]
>;

export interface AnnotationElementOptions extends AnnotationEvents {
	borderColor?: Color,
	borderWidth?: number,
	drawTime?: DrawTime,
	endValue?: any,
	mode?: Mode,
	scaleID?: string,
	type?: AnnotationType,
	value?: any,
	xMax?: any,
	xMin?: any,
	xScaleID?: string,
	yMax?: any,
	yMin?: any,
	yScaleID?: string,
}

export interface LineAnnotationOptions extends AnnotationElementOptions {
	borderDash?: [number, number],
	borderDashOffset?: number,
	label?: LabelOptions
}

export interface BoxAnnotationOptions extends AnnotationElementOptions {
	backgroundColor?: Color,
}

export interface AnnotationPluginOptions extends AnnotationEvents {
	annotations: AnnotationOptions[]
	dblClickSpeed?: number,
	drawTime?: DrawTime,
}
