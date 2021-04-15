import { Color, FontSpec } from 'chart.js';
import { PartialEventContext } from './events';
import { DrawTime, Scriptable } from './options';

export interface LabelOptions {
	backgroundColor?: Scriptable<Color, PartialEventContext>,
	drawTime?: Scriptable<DrawTime, PartialEventContext>,
	font?: FontSpec
	color?: Scriptable<Color, PartialEventContext>,
	/**
	 * Padding of label to add left/right
	 * @default 6
	 */
	xPadding?: Scriptable<number, PartialEventContext>,
	/**
	 * Padding of label to add top/bottom
	 * @default 6
	 */
	yPadding?: Scriptable<number, PartialEventContext>,
	/**
	 * Corner radius of the label rectangle
	 * @default 6
	 */
	cornerRadius?: Scriptable<number, PartialEventContext>,

	/**
	 * Anchor position of label on line.
	 * @default 'center'
	 */
	position?: Scriptable<LabelPosition, PartialEventContext>,

	/**
	 * Text alignment when the content of the label is multi-line.
	 * @default 'center'
	 */
	textAlign?: Scriptable<LabelTextAlign, PartialEventContext>,

	/**
	 * Adjustment along x-axis (left-right) of label relative to above number (can be negative)
	 * For horizontal lines positioned left or right, negative values move
	 * the label toward the edge, and positive values toward the center.
	 * @default 0
	 */
	xAdjust?: Scriptable<number, PartialEventContext>,

	/**
	 * Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
	 * For vertical lines positioned top or bottom, negative values move
	 * the label toward the edge, and positive values toward the center.
	 * @default 0
	 */
	yAdjust?: Scriptable<number, PartialEventContext>,

	/**
	 * Whether the label is enabled and should be displayed
	 * @default true
	 */
	enabled?: Scriptable<boolean, PartialEventContext>,

	/**
	 * Text to display in label. Provide an array to display multiple lines
	 */
	content: Scriptable<string | string[] | HTMLImageElement | null, PartialEventContext>,

	/**
	 * Overrides the width of the image. Could be set in pixel by a number,
	 * or in percentage of current width of image by a string
	 */
	width: Scriptable<number | string, PartialEventContext>,

	/**
	 * Overrides the height of the image. Could be set in pixel by a number,
	 * or in percentage of current height of image by a string
	 */
	height: Scriptable<number | string, PartialEventContext>,

	/**
	 * Rotation of label, in degrees, or 'auto' to use the degrees of the line, default is 0
	 * @default 90
	 */
	rotation?: Scriptable<number | 'auto', PartialEventContext>
}

export type LabelPosition = 'start' | 'center' | 'end';

export type LabelTextAlign = 'start' | 'center' | 'end';
