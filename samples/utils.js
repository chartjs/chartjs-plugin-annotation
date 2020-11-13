window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};

let seed = Date.now();

function rand(min, max) {
	min = min === undefined ? 0 : min;
	max = max === undefined ? 1 : max;
	seed = (seed * 9301 + 49297) % 233280;
	return min + (seed / 233280) * (max - min);
}

window.randomScalingFactor = function() {
	return Math.round(rand(-100, 100));
};
