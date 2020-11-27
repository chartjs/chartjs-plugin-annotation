import {Chart} from 'chart.js';
import Annotation from './annotation';
import BoxAnnotation from './types/box';
import LineAnnotation from './types/line';
import EllipseAnnotation from './types/ellipse';
import PointAnnotation from './types/point';

Chart.register(Annotation, BoxAnnotation, LineAnnotation, EllipseAnnotation, PointAnnotation);

export default Annotation;
