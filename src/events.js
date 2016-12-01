var helpers = require('./helpers.js');

module.exports = function(Chart) {
	var chartHelpers = Chart.helpers;

	var dblClickSpeed = Chart.Annotation.dblClickSpeed || 350; // ms

	function getEventHandlerName(eventName) {
		return 'on' + eventName[0].toUpperCase() + eventName.substring(1);
	}

	function createMouseEvent(type, previousEvent) {
		try {
			return new MouseEvent(type, previousEvent);
		} catch (exception) {
			try {
				var m = document.createEvent('MouseEvent');
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
				var e = document.createEvent('Event');
				e.initEvent(
					type,
					previousEvent.canBubble,
					previousEvent.cancelable
				);
				return e;
			}
		}
	}

	function collapseHoverEvents(events) {
		var hover = false;
		var filteredEvents = events.filter(function(eventName) {
			switch (eventName) {
				case 'mouseenter':
				case 'mouseover':
				case 'mouseout':
				case 'mouseleave':
					hover = true;
					return false;

				default:
					return true;
			}
		});
		if (hover && filteredEvents.indexOf('mousemove') === -1) {
			filteredEvents.push('mousemove');
		}
		return filteredEvents;
	}

	function dispatcher(e) {
		var position = chartHelpers.getRelativePosition(e, this.chart);
		var element = helpers.getNearestItems(this.annotations, position);
		var events = collapseHoverEvents(this.options.annotation.events);
		var eventHandlers = [];
		var eventHandlerName = getEventHandlerName(e.type);
		var options = (element || {}).options;

		// Detect hover events
		if (e.type === 'mousemove') {
			if (element && !element.hovering) {
				// hover started
				['mouseenter', 'mouseover'].forEach(function(eventName) {
					var eventHandlerName = getEventHandlerName(eventName);
					var hoverEvent = createMouseEvent(eventName, e); // recreate the event to match the handler
					element.hovering = true;
					if (typeof options[eventHandlerName] === 'function') {
						eventHandlers.push([ options[eventHandlerName], hoverEvent, element ]);
					}
				});
			} else if (!element) {
				// hover ended
				this.annotations.forEach(function(element) {
					if (element.hovering) {
						element.hovering = false;
						var options = element.options;
						['mouseout', 'mouseleave'].forEach(function(eventName) {
							var eventHandlerName = getEventHandlerName(eventName);
							var hoverEvent = createMouseEvent(eventName, e); // recreate the event to match the handler
							if (typeof options[eventHandlerName] === 'function') {
								eventHandlers.push([ options[eventHandlerName], hoverEvent, element ]);
							}
						});
					}
				});
			}
		}

		// Suppress duplicate click events during a double click
		// 1. click -> 2. click -> 3. dblclick
		//
		// 1: wait dblClickSpeed ms, then fire click
		// 2: cancel (1) if it is waiting then wait dblClickSpeed ms then fire click, else fire click immediately
		// 3: cancel (1) or (2) if waiting, then fire dblclick 
		if (element && events.indexOf('dblclick') > -1 && typeof options.onDblclick === 'function') {
			if (e.type === 'click' && typeof options.onClick === 'function') {
				clearTimeout(element.clickTimeout);
				element.clickTimeout = setTimeout(function() {
					delete element.clickTimeout;
					options.onClick.call(element, e);
				}, dblClickSpeed);
				e.stopImmediatePropagation();
				e.preventDefault();
				return;
			} else if (e.type === 'dblclick' && element.clickTimeout) {
				clearTimeout(element.clickTimeout);
				delete element.clickTimeout;
			}
		}

		// Dispatch the event to the usual handler, but only if we haven't substituted it
		if (element && typeof options[eventHandlerName] === 'function' && eventHandlers.length === 0) {
			eventHandlers.push([ options[eventHandlerName], e, element ]);
		}

		if (eventHandlers.length > 0) {
			e.stopImmediatePropagation();
			e.preventDefault();
			eventHandlers.forEach(function(eventHandler) {
				// [handler, event, element]
				eventHandler[0].call(eventHandler[2], eventHandler[1]);
			});
		}
	}

	return {
		dispatcher: dispatcher,
		collapseHoverEvents: collapseHoverEvents
	};
};
