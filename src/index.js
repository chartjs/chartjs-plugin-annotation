import {Chart} from 'chart.js';
import Annotation from './annotation';
import BoxAnnotation from './types/box';
import LineAnnotation from './types/line';
import EllipseAnnotation from './types/ellipse';
import TriangleAnnotation from './types/triangle';
import PointAnnotation from './types/point';

Chart.register(Annotation, BoxAnnotation, EllipseAnnotation, TriangleAnnotation, PointAnnotation);

export default Annotation;
