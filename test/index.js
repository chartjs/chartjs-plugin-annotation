import {addMatchers, releaseCharts, specsFromFixtures} from 'chartjs-test-utils';

window.devicePixelRatio = 1;
jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
	addMatchers();
});

afterEach(function() {
	releaseCharts();
});
