import { Color, DeepPartial } from "chart.js";
import {AnnotationEvents, EventContext} from "./events";
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

export interface CoreAnnotationOptions extends AnnotationEvents {
  display?: boolean | ((context: EventContext) => boolean);
	borderColor?: Color,
	borderWidth?: number,
	drawTime?: DrawTime,
	endValue?: any,
	mode?: Mode,
	scaleID?: string,
	value?: any,
	xMax?: any,
	xMin?: any,
	xScaleID?: string,
	yMax?: any,
	yMin?: any,
	yScaleID?: string,
}

export interface LineAnnotationOptions extends CoreAnnotationOptions {
	borderDash?: [number, number],
	borderDashOffset?: number,
	label?: LabelOptions
}

export interface BoxAnnotationOptions extends CoreAnnotationOptions {
	backgroundColor?: Color,
}

export interface AnnotationPluginOptions extends AnnotationEvents {
	annotations: AnnotationOptions[]
	dblClickSpeed?: number,
	drawTime?: DrawTime,
}
