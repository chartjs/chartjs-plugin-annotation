import {Element} from 'chart.js';

export default class BoxAnnotation extends Element {
	inRange(mouseX, mouseY, useFinalPosition) {
		const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);

		return mouseX >= x &&
			mouseX <= x + width &&
			mouseY >= y &&
			mouseY <= y + height;
	}

	getCenterPoint(useFinalPosition) {
		const {x, y, width, height} = this.getProps(['x', 'y', 'width', 'height'], useFinalPosition);
		return {
			x: x + width / 2,
			y: y + height / 2
		};
	}

	draw(ctx) {
		const {x, y, width, height, options} = this;

		ctx.save();

		ctx.lineWidth = options.borderWidth;
		ctx.strokeStyle = options.borderColor;
		ctx.fillStyle = options.backgroundColor;

		ctx.fillRect(x, y, width, height);
		ctx.strokeRect(x, y, width, height);

		ctx.restore();
	}
}

BoxAnnotation.id = 'boxAnnotation';

BoxAnnotation.defaults = {
	display: true,
	borderWidth: 1
};

BoxAnnotation.defaultRoutes = {
	borderColor: 'color',
	backgroundColor: 'color'
};
