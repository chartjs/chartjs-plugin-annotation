import {Element} from 'chart.js';
import {scaleValue} from '../helpers';

export default class PointAnnotation extends Element {

	inRange(x, y) {
		return pointInCircle({x, y}, this);
	}

	getCenterPoint(useFinalPosition) {
		const {x, y} = this.getProps(['x', 'y'], useFinalPosition);
		return {x, y};
	}

	draw(ctx) {
		const {x, y, width, options} = this;

		ctx.save();

		ctx.lineWidth = options.borderWidth;
		ctx.strokeStyle = options.borderColor;
		ctx.fillStyle = options.backgroundColor;

		ctx.beginPath();
		ctx.arc(x, y, width / 2, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();

		ctx.restore();
	}

	resolveElementProperties(chart, options) {
		const xScale = chart.scales[options.xScaleID];
		const yScale = chart.scales[options.yScaleID];
		let x = chart.chartArea.width / 2;
		let y = chart.chartArea.height / 2;

		if (!xScale && !yScale) {
			return {options: {}};
		}

		if (xScale) {
			x = scaleValue(xScale, options.xValue, x);
		}

		if (yScale) {
			y = scaleValue(yScale, options.yValue, y);
		}

		return {
			x,
			y,
			x2: x + (options.radius * 2),
			y2: y + (options.radius * 2),
			width: options.radius * 2,
			height: options.radius * 2
		};
	}
}

PointAnnotation.id = 'pointAnnotation';

PointAnnotation.defaults = {
	display: true,
	borderWidth: 1,
	radius: 10
};

PointAnnotation.defaultRoutes = {
	borderColor: 'color',
	backgroundColor: 'color'
};

function pointInCircle(p, point) {
	const {width} = point;
	const center = point.getCenterPoint(true);
	const radius = width / 2;

	if (radius <= 0) {
		return false;
	}

	return (Math.pow(p.x - center.x, 2) + Math.pow(p.y - center.y, 2)) <= Math.pow(radius, 2);
}
