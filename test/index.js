import {acquireChart, addMatchers, releaseCharts, specsFromFixtures, triggerMouseEvent, afterEvent} from 'chartjs-test-utils';
import {testEvents} from './events';
import {createCanvas, getAnnotationElements, scatter10x10, stringifyObject} from './utils';
import * as helpers from '../src/helpers';

window.helpers = helpers;
window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.afterEvent = afterEvent;
window.triggerMouseEvent = triggerMouseEvent;
window.testEvents = testEvents;
window.createCanvas = createCanvas;
window.getAnnotationElements = getAnnotationElements;
window.scatter10x10 = scatter10x10;
window.stringifyObject = stringifyObject;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

console.warn('Testing with chart.js v' + Chart.version);
