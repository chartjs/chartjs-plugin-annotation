import {distanceBetweenPoints, callback as callHandler} from 'chart.js/helpers';

const clickHooks = ['click', 'dblclick'];
const moveHooks = ['enter', 'leave'];
export const eventHooks = clickHooks.concat(moveHooks);

export function updateListeners(chart, state, options) {
  const annotations = state.annotations || [];
  state.listened = false;
  state.moveListened = false;

  eventHooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.listened = true;
      state.listeners[hook] = options[hook];
    }
  });
  moveHooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.moveListened = true;
    }
  });

  if (!state.listened || !state.moveListened) {
    annotations.forEach(scope => {
      if (!state.listened) {
        clickHooks.forEach(hook => {
          if (typeof scope[hook] === 'function') {
            state.listened = true;
          }
        });
      }
      if (!state.moveListened) {
        moveHooks.forEach(hook => {
          if (typeof scope[hook] === 'function') {
            state.listened = true;
            state.moveListened = true;
          }
        });
      }
    });
  }
}

export function handleEvent(state, event, options) {
  if (state.listened) {
    switch (event.type) {
    case 'mousemove':
    case 'mouseout':
      handleMoveEvents(state, event);
      break;
    case 'click':
      handleClickEvents(state, event, options);
      break;
    default:
    }
  }
}

function handleMoveEvents(state, event) {
  if (!state.moveListened) {
    return;
  }

  let element;

  if (event.type === 'mousemove') {
    element = getNearestItem(state.elements, event);
  }

  const previous = state.hovered;
  state.hovered = element;

  dispatchMoveEvents(state, {previous, element}, event);
}

function dispatchMoveEvents(state, elements, event) {
  const {previous, element} = elements;
  if (previous && previous !== element) {
    dispatchEvent(previous.options.leave || state.listeners.leave, previous, event);
  }
  if (element && element !== previous) {
    dispatchEvent(element.options.enter || state.listeners.enter, element, event);
  }
}

function handleClickEvents(state, event, options) {
  const listeners = state.listeners;
  const element = getNearestItem(state.elements, event);
  if (element) {
    const elOpts = element.options;
    const dblclick = elOpts.dblclick || listeners.dblclick;
    const click = elOpts.click || listeners.click;
    if (element.clickTimeout) {
      // 2nd click before timeout, so its a double click
      clearTimeout(element.clickTimeout);
      delete element.clickTimeout;
      dispatchEvent(dblclick, element, event);
    } else if (dblclick) {
      // if there is a dblclick handler, wait for dblClickSpeed ms before deciding its a click
      element.clickTimeout = setTimeout(() => {
        delete element.clickTimeout;
        dispatchEvent(click, element, event);
      }, options.dblClickSpeed);
    } else {
      // no double click handler, just call the click handler directly
      dispatchEvent(click, element, event);
    }
  }
}

function dispatchEvent(handler, element, event) {
  callHandler(handler, [element.$context, event]);
}

function getNearestItem(elements, position) {
  let minDistance = Number.POSITIVE_INFINITY;

  return elements
    .filter((element) => element.options.display && element.inRange(position.x, position.y))
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
    .sort((a, b) => a._index - b._index)
    .slice(0, 1)[0]; // return only the top item
}
