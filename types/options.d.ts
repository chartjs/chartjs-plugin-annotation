import { Chart, Color, DeepPartial, FontSpec } from "chart.js";

export interface AnnotationTypeRegistry {
	line: LineAnnotationOptions
	box: BoxAnnotationOptions
}

export type AnnotationType = keyof AnnotationTypeRegistry;

type DrawTime = 'afterDraw' | 'afterDatasetsDraw' | 'beforeDatasetsDraw';
type Mode = 'horizontal' | 'vertical';

export interface AnnotationElement {
	x: number,
	y: number,
	x2: number,
	y2: number,
	options: AnnotationElementOptions
}

export interface EventContext {
	chart: Chart,
	element: AnnotationElement
}

export interface AnnotationEvents {
	enter?(context: EventContext): void,
	leave?(context: EventContext): void,
	click?(context: EventContext): void,
	dblclick?(context: EventContext): void,
}

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

export interface LabelOptions {
	backgroundColor?: Color,
	font?: FontSpec
	/**
	 * Padding of label to add left/right, default below
	 * @default 6
	 */
	xPadding: number,
	/**
	 * Padding of label to add top/bottom, default below
	 * @default 6
	 */
	yPadding: number,
	/**
	 * Corner radius of the label rectangle
	 * @default 6
	 */
	cornerRadius: number,

	/**
	 * Anchor position of label on line.
	 * @default 'center'
	 */
	position: LabelPosition,

	/**
	 * Adjustment along x-axis (left-right) of label relative to above number (can be negative)
	 * For horizontal lines positioned left or right, negative values move
	 * the label toward the edge, and positive values toward the center.
	 * @default 0
	 */
	xAdjust: number,

	/**
	 * Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
	 * For vertical lines positioned top or bottom, negative values move
	 * the label toward the edge, and positive values toward the center.
	 * @default 0
	 */
	yAdjust: number,

	/**
	 * Whether the label is enabled and should be displayed
	 * @default true
	 */
	enabled: boolean,

	/**
	 * Text to display in label. Provide an array to display multiple lines
	 */
	content: string | string[]

	/**
	 * Rotation of label, in degrees, or 'auto' to use the degrees of the line, default is 0
	 * @default 90
	 */
	rotation: number
}

export type LabelPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';

export interface AnnotationPluginOptions extends AnnotationEvents {
	annotations: AnnotationOptions[]
	dblClickSpeed?: number,
	drawTime?: DrawTime,
}
