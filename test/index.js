import {acquireChart, addMatchers, releaseCharts, specsFromFixtures, triggerMouseEvent, afterEvent} from 'chartjs-test-utils';
import {testEvents} from './events';
import {testHooks} from './hooks';
import {createCanvas} from './utils';

window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.afterEvent = afterEvent;
window.triggerMouseEvent = triggerMouseEvent;
window.testEvents = testEvents;
window.testHooks = testHooks;
window.createCanvas = createCanvas;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

console.warn('Testing with chart.js v' + Chart.version);
