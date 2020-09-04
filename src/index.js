import {Chart} from 'chart.js';
import Annotation from './annotation';
import BoxAnnotation from './types/box';
import LineAnnotation from './types/line';

Chart.register(Annotation, BoxAnnotation, LineAnnotation);

export default Annotation;
