import {isFinite} from 'chart.js/helpers';

const PI = Math.PI;
const HALF_PI = PI / 2;

export function scaleValue(scale, value, fallback) {
	value = scale.parse(value);
	return isFinite(value) ? scale.getPixelForValue(value) : fallback;
}

/**
 * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
 * given size (width, height) and the same `radius` for all corners.
 * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
 * @param {number} x - The x axis of the coordinate for the rectangle starting point.
 * @param {number} y - The y axis of the coordinate for the rectangle starting point.
 * @param {number} width - The rectangle's width.
 * @param {number} height - The rectangle's height.
 * @param {number} radius - The rounded amount (in pixels) for the four corners.
 * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
 */
export function roundedRect(ctx, x, y, width, height, radius) {
	if (radius) {
		const r = Math.min(radius, height / 2, width / 2);
		const left = x + r;
		const top = y + r;
		const right = x + width - r;
		const bottom = y + height - r;

		ctx.moveTo(x, top);
		if (left < right && top < bottom) {
			ctx.arc(left, top, r, -PI, -HALF_PI);
			ctx.arc(right, top, r, -HALF_PI, 0);
			ctx.arc(right, bottom, r, 0, HALF_PI);
			ctx.arc(left, bottom, r, HALF_PI, PI);
		} else if (left < right) {
			ctx.moveTo(left, y);
			ctx.arc(right, top, r, -HALF_PI, HALF_PI);
			ctx.arc(left, top, r, HALF_PI, PI + HALF_PI);
		} else if (top < bottom) {
			ctx.arc(left, top, r, -PI, 0);
			ctx.arc(left, bottom, r, 0, PI);
		} else {
			ctx.arc(left, top, r, -PI, PI);
		}
		ctx.closePath();
		ctx.moveTo(x, y);
	} else {
		ctx.rect(x, y, width, height);
	}
}

export function inTriangle(point, a, b, c) {
	// see https://en.wikipedia.org/wiki/Barycentric_coordinate_system
	const A = 1 / 2 * (-b.y * c.x + a.y * (-b.x + c.x) + a.x * (b.y - c.y) + b.x * c.y);
	const sign = A < 0 ? -1 : 1;
	const s = (a.y * c.x - a.x * c.y + (c.y - a.y) * point.x + (a.x - c.x) * point.y) * sign;
	const t = (a.x * b.y - a.y * b.x + (a.y - b.y) * point.x + (b.x - a.x) * point.y) * sign;

	return s > 0 && t > 0 && (s + t) < 2 * A * sign;
}
