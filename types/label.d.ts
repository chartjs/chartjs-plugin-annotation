import { Color, FontSpec } from 'chart.js';
import { DrawTime } from './options';

export interface LabelOptions {
	backgroundColor?: Color,
	drawTime?: DrawTime,
	font?: FontSpec
	color?: Color,
	/**
	 * Padding of label to add left/right
	 * @default 6
	 */
	xPadding?: number,
	/**
	 * Padding of label to add top/bottom
	 * @default 6
	 */
	yPadding?: number,
	/**
	 * Corner radius of the label rectangle
	 * @default 6
	 */
	cornerRadius?: number,

	/**
	 * Anchor position of label on line.
	 * @default 'center'
	 */
	position?: LabelPosition,

	/**
	 * Adjustment along x-axis (left-right) of label relative to above number (can be negative)
	 * For horizontal lines positioned left or right, negative values move
	 * the label toward the edge, and positive values toward the center.
	 * @default 0
	 */
	xAdjust?: number,

	/**
	 * Adjustment along y-axis (top-bottom) of label relative to above number (can be negative)
	 * For vertical lines positioned top or bottom, negative values move
	 * the label toward the edge, and positive values toward the center.
	 * @default 0
	 */
	yAdjust?: number,

	/**
	 * Whether the label is enabled and should be displayed
	 * @default true
	 */
	enabled?: boolean,

	/**
	 * Text to display in label. Provide an array to display multiple lines
	 */
	content: string | string[] | HTMLImageElement | null,

	/**
	 * Overrides the width of the image. Could be set in pixel by a number,
	 * or in percentage of current width of image by a string
	 */
	width: number | string,

	/**
	 * Overrides the height of the image. Could be set in pixel by a number,
	 * or in percentage of current height of image by a string
	 */
	height: number | string,

	/**
	 * Rotation of label, in degrees, or 'auto' to use the degrees of the line, default is 0
	 * @default 90
	 */
	rotation?: number | 'auto'
}

export type LabelPosition = 'top' | 'bottom' | 'left' | 'right' | 'center';
