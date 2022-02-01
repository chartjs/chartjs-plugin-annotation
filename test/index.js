import {acquireChart, addMatchers, releaseCharts, specsFromFixtures, triggerMouseEvent, afterEvent} from 'chartjs-test-utils';
import {testEvents, eventPoint0, getCenterPoint} from './events';
import {createCanvas, getAnnotationElements, scatterChart, stringifyObject, interactionData} from './utils';
import * as helpers from '../src/helpers';

window.helpers = helpers;
window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.afterEvent = afterEvent;
window.triggerMouseEvent = triggerMouseEvent;
window.testEvents = testEvents;
window.eventPoint0 = eventPoint0;
window.getCenterPoint = getCenterPoint;
window.createCanvas = createCanvas;
window.getAnnotationElements = getAnnotationElements;
window.scatterChart = scatterChart;
window.stringifyObject = stringifyObject;
window.interactionData = interactionData;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

console.warn('Testing with chart.js v' + Chart.version);
