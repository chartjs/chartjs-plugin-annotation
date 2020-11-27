import {Element, defaults} from 'chart.js';
import {isArray, fontString, toRadians} from 'chart.js/helpers';
import {scaleValue, roundedRect} from '../helpers';

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

	resolveElementProperties(chart, options) { // eslint-disable-line class-methods-use-this
		const scale = chart.scales[options.scaleID];
		let {top: y, left: x, bottom: y2, right: x2} = chart.chartArea;
		let min, max;

		if (scale) {
			min = scaleValue(scale, options.value, NaN);
			max = scaleValue(scale, options.endValue, min);
			if (scale.isHorizontal()) {
				x = min;
				x2 = max;
			} else {
				y = min;
				y2 = max;
			}
		}
		return {
			x,
			y,
			x2,
			y2,
			width: x2 - x,
			height: y2 - y
		};
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

function calculateAutoRotation(line) {
	const {x, y, x2, y2} = line;
	let cathetusAdjacent, cathetusOpposite;
	if (line.options.mode === 'horizontal') {
		cathetusAdjacent = y2 > y ? x2 - x : -(x2 - x);
		cathetusOpposite = Math.abs(y - y2);
	} else {
		cathetusAdjacent = Math.abs(x - x2);
		cathetusOpposite = x2 > x ? y2 - y : -(y2 - y);
	}
	return Math.atan(cathetusOpposite / cathetusAdjacent);
}

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
	const rotation = label.rotation === 'auto' ? calculateAutoRotation(line) : toRadians(label.rotation);

	line.labelRect = {x: pos.x, y: pos.y, width, height};

	ctx.translate(pos.x, pos.y);
	ctx.rotate(rotation);

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
