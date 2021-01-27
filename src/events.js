import {distanceBetweenPoints, callback as callHandler} from 'chart.js/helpers';

const clickHooks = ['click', 'dblclick'];
const moveHooks = ['enter', 'leave'];
const hooks = clickHooks.concat(moveHooks);

export function updateListeners(chart, state, options) {
  const annotations = options.annotations || [];
  state.listened = false;
  state.moveListened = false;

  hooks.forEach(hook => {
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

export function handleEvent(chart, state, event, options) {
  if (state.listened) {
    switch (event.type) {
    case 'mousemove':
    case 'mouseout':
      handleMoveEvents(chart, state, event);
      break;
    case 'click':
      handleClickEvents(chart, state, event, options);
      break;
    default:
    }
  }
}

function handleMoveEvents(chart, state, event) {
  if (!state.moveListened) {
    return;
  }

  let element;

  if (event.type === 'mousemove') {
    element = getNearestItem(state.elements, event);
  }

  const previous = state.hovered;
  state.hovered = element;

  dispatchMoveEvents(chart, state, previous, element);
}

function dispatchMoveEvents(chart, state, previous, element) {
  if (previous && previous !== element) {
    dispatchEvent(chart, state, previous.options.leave || state.listeners.leave, previous);
  }
  if (element && element !== previous) {
    dispatchEvent(chart, state, element.options.enter || state.listeners.enter, element);
  }
}

function handleClickEvents(chart, state, event, options) {
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
      dispatchEvent(chart, state, dblclick, element);
    } else if (dblclick) {
      // if there is a dblclick handler, wait for dblClickSpeed ms before deciding its a click
      element.clickTimeout = setTimeout(() => {
        delete element.clickTimeout;
        dispatchEvent(chart, state, click, element);
      }, options.dblClickSpeed);
    } else {
      // no double click handler, just call the click handler directly
      dispatchEvent(chart, state, click, element);
    }
  }
}

function dispatchEvent(chart, _state, handler, element) {
  callHandler(handler, [{chart, element}]);
}

function getNearestItem(elements, position) {
  let minDistance = Number.POSITIVE_INFINITY;

  return elements
    .filter((element) => element._display && element.inRange(position.x, position.y))
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
