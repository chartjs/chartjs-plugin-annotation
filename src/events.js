import {distanceBetweenPoints} from 'chart.js/helpers';

export default function handleEvent(event, elements) {
	const element = getNearestItem(elements, event);
	const native = event.native;
	const eventHandlers = [];

	if (native.type === 'mousemove') {
		addHoverEvents(eventHandlers, native, elements, element);
	} else if (element && detectDoubleClick(native, element)) {
		return;
	}

	// Dispatch the event to the usual handler, but only if we haven't substituted it
	if (element && eventHandlers.length === 0) {
		addEventHandler(eventHandlers, native, element);
	}

	if (eventHandlers.length > 0) {
		native.stopImmediatePropagation();
		native.preventDefault();
		eventHandlers.forEach((eventHandler) => {
			// [handler, event, element]
			eventHandler[0].call(eventHandler[2], eventHandler[1]);
		});
	}
}

function addHoverEvents(eventHandlers, event, elements, element) {
	if (element && !element.hovering) {
		['mouseenter', 'mouseover'].forEach((eventName) => {
			element.hovering = true;
			const hoverEvent = createMouseEvent(eventName, event);
			addEventHandler(eventHandlers, hoverEvent, element);
		});
	} else if (!element) {
		elements.forEach((el) => {
			if (el.hovering) {
				el.hovering = false;
				['mouseout', 'mouseleave'].forEach((eventName) => {
					const hoverEvent = createMouseEvent(eventName, event);
					addEventHandler(eventHandlers, hoverEvent, el);
				});
			}
		});
	}
}

function addEventHandler(eventHandlers, event, element) {
	const options = element.options || {};
	const eventHandlerName = getEventHandlerName(event.type);
	const handler = options[eventHandlerName];
	if (typeof handler === 'function') {
		eventHandlers.push([handler, event, element]);
	}
}

function detectDoubleClick(event, element, dblClickSpeed) {
	// Suppress duplicate click events during a double click
	// 1. click -> 2. click -> 3. dblclick
	//
	// 1: wait dblClickSpeed ms, then fire click
	// 2: cancel (1) if it is waiting then wait dblClickSpeed ms then fire click, else fire click immediately
	// 3: cancel (1) or (2) if waiting, then fire dblclick

	const options = element.options || {};
	if (event.type === 'click' && typeof options.onClick === 'function') {
		clearTimeout(element.clickTimeout);
		element.clickTimeout = setTimeout(() => {
			delete element.clickTimeout;
			options.onClick.call(element, event);
		}, dblClickSpeed);
		event.stopImmediatePropagation();
		event.preventDefault();
		return true;
	} else if (event.type === 'dblclick' && element.clickTimeout) {
		clearTimeout(element.clickTimeout);
		delete element.clickTimeout;
	}
}

function getEventHandlerName(eventName) {
	return 'on' + eventName[0].toUpperCase() + eventName.substring(1);
}

function createMouseEvent(type, previousEvent) {
	try {
		return new MouseEvent(type, previousEvent);
	} catch (exception) {
		try {
			const m = document.createEvent('MouseEvent');
			m.initMouseEvent(
				type,
				previousEvent.canBubble,
				previousEvent.cancelable,
				previousEvent.view,
				previousEvent.detail,
				previousEvent.screenX,
				previousEvent.screenY,
				previousEvent.clientX,
				previousEvent.clientY,
				previousEvent.ctrlKey,
				previousEvent.altKey,
				previousEvent.shiftKey,
				previousEvent.metaKey,
				previousEvent.button,
				previousEvent.relatedTarget
			);
			return m;
		} catch (exception2) {
			const e = document.createEvent('Event');
			e.initEvent(
				type,
				previousEvent.canBubble,
				previousEvent.cancelable
			);
			return e;
		}
	}
}

function getNearestItem(elements, position) {
	let minDistance = Number.POSITIVE_INFINITY;

	return elements
		.filter((element) => element.inRange(position.x, position.y))
		.reduce((nearestItems, element) => {
			const center = element.getCenterPoint();
			const distance = distanceBetweenPoints(position, center);

			if (distance < minDistance) {
				nearestItems = [element];
				minDistance = distance;
			} else if (distance === minDistance) {
				// Can have multiple items at the same distance in which case we sort by size
				nearestItems.push(element);
			}

			return nearestItems;
		}, [])
		.sort((a, b) => {
			// If there are multiple elements equally close,
			// sort them by size, then by index
			const sizeA = a.getArea();
			const sizeB = b.getArea();
			return (sizeA > sizeB || sizeA < sizeB) ? sizeA - sizeB : a._index - b._index;
		})
		.slice(0, 1)[0]; // return only the top item
}
