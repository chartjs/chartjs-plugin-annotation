import {Element, defaults} from 'chart.js';
import {isArray, fontString} from 'chart.js/helpers';

const PI = Math.PI;
const HALF_PI = PI / 2;

const pointInLine = (p1, p2, t) => ({x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y)});
const interpolateX = (y, p1, p2) => pointInLine(p1, p2, Math.abs((y - p1.y) / (p2.y - p1.y))).x;
const interpolateY = (x, p1, p2) => pointInLine(p1, p2, Math.abs((x - p1.x) / (p2.x - p1.x))).y;

export default class LineAnnotation extends Element {
	intersects(x, y, epsilon) {
		epsilon = epsilon || 0.001;
		const me = this;
		const p1 = {x: me.x, y: me.y};
		const p2 = {x: me.x2, y: me.y2};
		const dy = interpolateY(x, p1, p2);
		const dx = interpolateX(y, p1, p2);
		return (
			(!isFinite(dy) || Math.abs(y - dy) < epsilon) &&
			(!isFinite(dx) || Math.abs(x - dx) < epsilon)
		);
	}

	labelIsVisible() {
		const label = this.options.label;
		return label && label.enabled && label.content;
	}

	isOnLabel(x, y) {
		const labelRect = this.labelRect || {};
		const w2 = labelRect.width / 2;
		const h2 = labelRect.height / 2;
		return this.labelIsVisible() &&
			x >= labelRect.x - w2 &&
			x <= labelRect.x + w2 &&
			y >= labelRect.y - h2 &&
			y <= labelRect.y + h2;
	}

	inRange(x, y) {
		const epsilon = this.options.borderWidth || 1;
		return this.intersects(x, y, epsilon) || this.isOnLabel(x, y);
	}

	getCenterPoint() {
		return {
			x: (this.x2 + this.x) / 2,
			y: (this.y2 + this.y) / 2
		};
	}

	draw(ctx) {
		const {x, y, x2, y2, options} = this;
		ctx.save();

		ctx.lineWidth = options.borderWidth;
		ctx.strokeStyle = options.borderColor;

		if (ctx.setLineDash) {
			ctx.setLineDash(options.borderDash);
		}
		ctx.lineDashOffset = options.borderDashOffset;

		// Draw
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x2, y2);
		ctx.stroke();

		if (this.labelIsVisible()) {
			drawLabel(ctx, this);
		}

		ctx.restore();
	}
}

LineAnnotation.id = 'lineAnnotation';
LineAnnotation.defaults = {
	display: true,
	borderDash: [],
	borderDashOffset: 0,
	label: {
		backgroundColor: 'rgba(0,0,0,0.8)',
		font: {
			family: defaults.font.family,
			size: defaults.font.size,
			style: 'bold',
			color: '#fff',
		},
		xPadding: 6,
		yPadding: 6,
		rotation: 0,
		cornerRadius: 6,
		position: 'center',
		xAdjust: 0,
		yAdjust: 0,
		enabled: false,
		content: null
	}
};

function drawLabel(ctx, line) {
	const label = line.options.label;

	ctx.font = fontString(
		label.font.size,
		label.font.style,
		label.font.family
	);
	ctx.textAlign = 'center';

	const {width, height} = measureLabel(ctx, label);
	const pos = calculateLabelPosition(line, width, height);
	line.labelRect = {x: pos.x, y: pos.y, width, height};

	ctx.translate(pos.x, pos.y);
	ctx.rotate(label.rotation * PI / 180);

	ctx.fillStyle = label.backgroundColor;
	roundedRect(ctx, -(width / 2), -(height / 2), width, height, label.cornerRadius);
	ctx.fill();

	ctx.fillStyle = label.font.color;
	if (isArray(label.content)) {
		let textYPosition = -(height / 2) + label.yPadding;
		for (let i = 0; i < label.content.length; i++) {
			ctx.textBaseline = 'top';
			ctx.fillText(
				label.content[i],
				-(width / 2) + (width / 2),
				textYPosition
			);

			textYPosition += label.font.size + label.yPadding;
		}
	} else {
		ctx.textBaseline = 'middle';
		ctx.fillText(label.content, 0, 0);
	}
}

const widthCache = new Map();
function measureLabel(ctx, label) {
	const content = label.content;
	const lines = isArray(content) ? content : [content];
	const count = lines.length;
	let width = 0;
	for (let i = 0; i < count; i++) {
		const text = lines[i];
		if (!widthCache.has(text)) {
			widthCache.set(text, ctx.measureText(text).width);
		}
		width = Math.max(width, widthCache.get(text));
	}
	width += 2 * label.xPadding;

	return {
		width,
		height: count * label.font.size + ((count + 1) * label.yPadding)
	};
}

function calculateLabelPosition(line, width, height) {
	const label = line.options.label;
	const {xPadding, xAdjust, yPadding, yAdjust} = label;
	const p1 = {x: line.x, y: line.y};
	const p2 = {x: line.x2, y: line.y2};
	let x, y, pt;

	switch (label.position) {
	case 'top':
		y = yPadding + yAdjust;
		x = interpolateX(y, p1, p2);
		break;
	case 'bottom':
		y = height - yPadding + yAdjust;
		x = interpolateX(y, p1, p2);
		break;
	case 'left':
		x = xPadding + xAdjust;
		y = interpolateY(x, p1, p2);
		break;
	case 'right':
		x = width - xPadding + xAdjust;
		y = interpolateY(x, p1, p2);
		break;
	default:
		pt = pointInLine(p1, p2, 0.5);
		x = pt.x + xAdjust;
		y = pt.y + yAdjust;
	}
	return {x, y};
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
function roundedRect(ctx, x, y, width, height, radius) {
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
