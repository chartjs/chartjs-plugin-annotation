import { Color, FontSpec } from 'chart.js';
import { PartialEventContext } from './events';
import { DrawTime, Scriptable } from './options';

export interface BoxLabelOptions {
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
	 * Anchor position of label on line.
	 * @default 'center'
	 */
	position?: Scriptable<BoxLabelPosition, PartialEventContext>,

	/**
	 * Text alignment when the content of the label is multi-line.
	 * @default 'center'
	 */
	align?: Scriptable<BoxLabelAlign, PartialEventContext>,

	/**
	 * Whether the label is enabled and should be displayed
	 * @default true
	 */
	enabled?: Scriptable<boolean, PartialEventContext>,

	/**
	 * Text to display in label. Provide an array to display multiple lines
	 */
	content: Scriptable<string | string[] | null, PartialEventContext>
}

export type BoxLabelPosition = 'top' | 'middle' | 'bottom';

export type BoxLabelAlign = 'left' | 'center' | 'right';
