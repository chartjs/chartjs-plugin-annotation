import BoxAnnotation from './box';

export default class TriangleAnnotation extends BoxAnnotation {

	inRange(x, y) {
		return pointInTriangle({x, y}, this._points.apex1, this._points.apex2, this._points.apex3);
	}

	draw(ctx) {
		const {options} = this;
		this._points = calculateApexes(this);

		ctx.save();

		ctx.beginPath();

		ctx.lineWidth = options.borderWidth;
		ctx.strokeStyle = options.borderColor;
		ctx.fillStyle = options.backgroundColor;

		ctx.moveTo(this._points.apex1.x, this._points.apex1.y);
		ctx.lineTo(this._points.apex2.x, this._points.apex2.y);
		ctx.lineTo(this._points.apex3.x, this._points.apex3.y);

		ctx.fill();
		ctx.stroke();

		ctx.restore();
	}
}

TriangleAnnotation.id = 'triangleAnnotation';

TriangleAnnotation.defaults = {
	display: true,
	borderWidth: 1,
	orientation: 'top'
};

TriangleAnnotation.defaultRoutes = {
	borderColor: 'color',
	backgroundColor: 'color'
};

function calculateApexes(triangle) {
	const {x, y, width, height, options} = triangle;
	const center = triangle.getCenterPoint(true);
	const result = {};

	switch (options.orientation) {
	case 'bottom':
		result.apex1 = {x: center.x, y: y + height};
		result.apex2 = {x, y};
		result.apex3 = {x: x + width, y};
		break;
	case 'left':
		result.apex1 = {x, y: center.y};
		result.apex2 = {x: x + width, y};
		result.apex3 = {x: x + width, y: y + height};
		break;
	case 'right':
		result.apex1 = {x: x + width, y: center.y};
		result.apex2 = {x, y};
		result.apex3 = {x, y: y + height};
		break;
	case 'topLeft':
		result.apex1 = {x, y};
		result.apex2 = {x: x + width, y};
		result.apex3 = {x, y: y + height};
		break;
	case 'topRight':
		result.apex1 = {x, y};
		result.apex2 = {x: x + width, y};
		result.apex3 = {x: x + width, y: y + height};
		break;
	case 'bottomLeft':
		result.apex1 = {x, y};
		result.apex2 = {x, y: y + height};
		result.apex3 = {x: x + width, y: y + height};
		break;
	case 'bottomRight':
		result.apex1 = {x: x + width, y};
		result.apex2 = {x: x + width, y: y + height}
		result.apex3 = {x, y: y + height};
		break;
	default:
		// default is top
		result.apex1 = {x: center.x, y};
		result.apex2 = {x: x + width, y: y + height};
		result.apex3 = {x, y: y + height};
	}
	return result;
}

function pointInTriangle(p, p0, p1, p2) {
	// see https://en.wikipedia.org/wiki/Barycentric_coordinate_system 
	let A = 1 / 2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
	let sign = A < 0 ? -1 : 1;
	let s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
	let t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;

	return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}
