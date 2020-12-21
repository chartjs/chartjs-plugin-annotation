import {addMatchers, releaseCharts, specsFromFixtures} from 'chartjs-test-utils';

jasmine.fixtures = specsFromFixtures;

beforeEach(function() {
	addMatchers();
});

afterEach(function() {
	releaseCharts();
});
