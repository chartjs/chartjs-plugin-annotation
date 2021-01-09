import {acquireChart, releaseChart, addMatchers, releaseCharts, specsFromFixtures} from 'chartjs-test-utils';

window.devicePixelRatio = 1;
window.acquireChart = acquireChart;
window.releaseChart = releaseChart;

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
  addMatchers();
});

afterEach(function() {
  releaseCharts();
});
