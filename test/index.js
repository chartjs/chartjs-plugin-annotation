import {acquireChart, addMatchers, releaseCharts, specsFromFixtures, triggerMouseEvent, afterEvent} from 'chartjs-test-utils';
import {testEvents, catchEnterEvent, notCatchEnterEvent, catchLeaveEvent, notCatchLeaveEvent, catchClickEvent, notCatchClickEvent} from './events';
import {createCanvas} from './utils';

window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.afterEvent = afterEvent;
window.triggerMouseEvent = triggerMouseEvent;
window.testEvents = testEvents;
window.catchEnterEvent = catchEnterEvent;
window.notCatchEnterEvent = notCatchEnterEvent;
window.catchLeaveEvent = catchLeaveEvent;
window.notCatchLeaveEvent = notCatchLeaveEvent;
window.catchClickEvent = catchClickEvent;
window.notCatchClickEvent = notCatchClickEvent;
window.createCanvas = createCanvas;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});

console.warn('Testing with chart.js v' + Chart.version);
