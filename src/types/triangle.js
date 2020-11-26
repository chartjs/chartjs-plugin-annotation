import BoxAnnotation from './box';
import {inTriangle} from '../helpers';

export default class TriangleAnnotation extends BoxAnnotation {

	inRange(x, y) {
		return inTriangle({x, y}, this._vertices.a, this._vertices.b, this._vertices.c);
	}

	draw(ctx) {
		const {options} = this;
		this._vertices = calculateVertices(this);

		ctx.save();

		ctx.beginPath();

		ctx.lineWidth = options.borderWidth;
		ctx.strokeStyle = options.borderColor;
		ctx.fillStyle = options.backgroundColor;

		ctx.moveTo(this._vertices.a.x, this._vertices.a.y);
		ctx.lineTo(this._vertices.b.x, this._vertices.b.y);
		ctx.lineTo(this._vertices.c.x, this._vertices.c.y);
		ctx.lineTo(this._vertices.a.x, this._vertices.a.y);

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

function calculateVertices(triangle) {
	const {x, y, width, height, options} = triangle;
	const center = triangle.getCenterPoint(true);
	const result = {};

	switch (options.orientation) {
	case 'bottom':
		result.a = {x: center.x, y: y + height};
		result.b = {x, y};
		result.c = {x: x + width, y};
		break;
	case 'left':
		result.a = {x, y: center.y};
		result.b = {x: x + width, y};
		result.c = {x: x + width, y: y + height};
		break;
	case 'right':
		result.a = {x: x + width, y: center.y};
		result.b = {x, y};
		result.c = {x, y: y + height};
		break;
	case 'topLeft':
		result.a = {x, y};
		result.b = {x: x + width, y};
		result.c = {x, y: y + height};
		break;
	case 'topRight':
		result.a = {x, y};
		result.b = {x: x + width, y};
		result.c = {x: x + width, y: y + height};
		break;
	case 'bottomLeft':
		result.a = {x, y};
		result.b = {x, y: y + height};
		result.c = {x: x + width, y: y + height};
		break;
	case 'bottomRight':
		result.a = {x: x + width, y};
		result.b = {x: x + width, y: y + height};
		result.c = {x, y: y + height};
		break;
	default:
		// default is top
		result.a = {x: center.x, y};
		result.b = {x: x + width, y: y + height};
		result.c = {x, y: y + height};
	}
	return result;
}
