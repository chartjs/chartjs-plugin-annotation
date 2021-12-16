import { Chart, ChartType, Plugin, Color, PointStyle, BorderRadius } from 'chart.js';
import { AnnotationEvents, PartialEventContext } from './events';
import { LabelOptions, BoxLabelOptions, LabelTypeOptions } from './label';
import { AnnotationHooks, AnnotationLabelHooks } from './hooks';
import { AnnotationElement } from './element';

export type AnyObject = Record<string, unknown>;

export type DrawTime = 'afterDraw' | 'afterDatasetsDraw' | 'beforeDraw' | 'beforeDatasetsDraw';

export interface AnnotationTypeRegistry {
  box: BoxAnnotationOptions
  ellipse: EllipseAnnotationOptions
  label: LabelAnnotationOptions
  line: LineAnnotationOptions
  point: PointAnnotationOptions
  polygon: PolygonAnnotationOptions
}

export type AnnotationType = keyof AnnotationTypeRegistry;

export type AnnotationOptions<TYPE extends AnnotationType = AnnotationType> =
	{ [key in TYPE]: { type: key } & AnnotationTypeRegistry[key] }[TYPE]

export interface CoreAnnotationOptions extends AnnotationEvents, AnnotationHooks {
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

interface AnnotationPointCoordinates extends AnnotationCoordinates {
  xValue?: Scriptable<ScaleValue, PartialEventContext>,
  yValue?: Scriptable<ScaleValue, PartialEventContext>,
}

export interface LineAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates, AnnotationLabelHooks {
  label?: LabelOptions
}

export interface BoxAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates, AnnotationLabelHooks {
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
  borderRadius?: Scriptable<number | BorderRadius, PartialEventContext>,
  /**
   * @deprecated replaced by borderRadius
   * @todo remove at v2
   */
  cornerRadius?: Scriptable<number, PartialEventContext>,
  label?: BoxLabelOptions
}

export interface EllipseAnnotationOptions extends CoreAnnotationOptions, AnnotationCoordinates {
  backgroundColor?: Scriptable<Color, PartialEventContext>,
  rotation?: Scriptable<number, PartialEventContext>
}

export interface PointAnnotationOptions extends CoreAnnotationOptions, AnnotationPointCoordinates {
  backgroundColor: Scriptable<Color, PartialEventContext>,
  pointStyle?: Scriptable<PointStyle, PartialEventContext>,
  radius?: Scriptable<number, PartialEventContext>,
  rotation?: Scriptable<number, PartialEventContext>,
  xAdjust?: Scriptable<number, PartialEventContext>,
  yAdjust?: Scriptable<number, PartialEventContext>,
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

export interface LabelAnnotationOptions extends CoreAnnotationOptions, LabelTypeOptions, AnnotationPointCoordinates, AnnotationLabelHooks {
  callout?: CalloutOptions;
}

interface PolygonAnnotationOptions extends CoreAnnotationOptions, AnnotationPointCoordinates {
  backgroundColor: Scriptable<Color, PartialEventContext>,
  borderCapStyle?: Scriptable<CanvasLineCap, PartialEventContext>,
  borderJoinStyle?: Scriptable<CanvasLineJoin, PartialEventContext>,
  radius?: Scriptable<number, PartialEventContext>,
  rotation?: Scriptable<number, PartialEventContext>,
  sides?: Scriptable<number, PartialEventContext>,
  xAdjust?: Scriptable<number, PartialEventContext>,
  yAdjust?: Scriptable<number, PartialEventContext>,
}

export interface AnnotationPluginOptions extends AnnotationEvents {
  annotations: AnnotationOptions[] | Record<string, AnnotationOptions>,
  clip?: boolean,
  dblClickSpeed?: Scriptable<number, PartialEventContext>,
  drawTime?: Scriptable<DrawTime, PartialEventContext>,
  animations: Record<string, unknown>,
}

export interface AnnotationObserverPlugin<TType extends ChartType = ChartType, O = AnyObject> extends Plugin<TType, O> {
  /**
   * @desc Called before initializing an annotation.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {AnnotationElement} args.element - The element to initialize
   * @param {CoreAnnotationOptions} args.options - The element options
   * @param {object} options - The plugin options.
   */
  beforeAnnotationInit?(chart: Chart, args: { element: AnnotationElement, options: CoreAnnotationOptions }, options: O): void;
  /**
   * @desc Called after `chart` has been initialized and before the first update.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {object} args.element - The initialized element
   * @param {object} args.options - The element options
   * @param {object} args.properties - The proporties to apply to the element, after initialization
   * @param {object} options - The plugin options.
   */
  afterAnnotationInit?(chart: Chart, args: { element: AnnotationElement, options: CoreAnnotationOptions, properties: AnnotationElement }, options: O): void;
  /**
   * @desc Called before drawing the annotations.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {Array} args.elements - The elements to draw
   * @param {object} options - The plugin options.
   */
  beforeAnnotationsDraw?(chart: Chart, args: { elements: AnnotationElement[] }, options: O): void;
  /**
   * @desc Called after drawing the annotations.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {Array} args.elements - The elements to draw
   * @param {object} options - The plugin options.
   */
  afterAnnotationsDraw?(chart: Chart, args: { elements: AnnotationElement[] }, options: O, cancelable: false): void;
  /**
   * @desc Called before drawing annotation at every animation frame. If any plugin returns `false`,
   * the annotation drawing is cancelled.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {object} args.element - The element to draw
   * @param {object} options - The plugin options.
   * @returns {boolean} `false` to cancel the annotation drawing.
   */
  beforeAnnotationDraw?(chart: Chart, args: { element: AnnotationElement, cancelable: true }, options: O): boolean | void;
  /**
   * @desc Called after the annotation has been drawn. Note that this hook will not be called
   * if the drawing has been previously cancelled.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {object} args.element - The drawn element
   * @param {object} options - The plugin options.
   */
  afterAnnotationDraw?(chart: Chart, args: { element: AnnotationElement, cancelable: false }, options: O): void;
  /**
   * @desc Called before drawing annotation label at every animation frame. If any plugin returns `false`,
   * the annotation drawing is cancelled.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {object} args.element - The element which contains the label to draw
   * @param {object} options - The plugin options.
   * @returns {boolean} `false` to cancel the annotation label drawing.
   */
  beforeAnnotationLabelDraw?(chart: Chart, args: { element: AnnotationElement, cancelable: true }, options: O): boolean | void;
  /**
   * @desc Called after the annotation label has been drawn. Note that this hook will not be called
   * if the drawing has been previously cancelled.
   * @param {Chart} chart - The chart instance.
   * @param {object} args - The call arguments.
   * @param {object} args.element - The element which contains the drawn label
   * @param {object} options - The plugin options.
   */
  afterAnnotationLabelDraw?(chart: Chart, args: { element: AnnotationElement, cancelable: false }, options: O): void;
}
