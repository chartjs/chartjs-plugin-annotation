import {defined, callback} from 'chart.js/helpers';

const clickHooks = ['click', 'dblclick'];
const moveHooks = ['enter', 'leave'];
export const hooks = clickHooks.concat(moveHooks);

export function updateListeners(chart, state, options) {
  state.listened = false;
  state.moveListened = false;

  hooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.listened = true;
      state.listeners[hook] = options[hook];
    } else if (defined(state.listeners[hook])) {
      delete state.listeners[hook];
    }
  });
  moveHooks.forEach(hook => {
    if (typeof options[hook] === 'function') {
      state.moveListened = true;
    }
  });

  if (!state.listened || !state.moveListened) {
    state.annotations.forEach(scope => {
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

  let elements = [];

  if (event.type === 'mousemove') {
    elements = state.visibleElements.filter((element) => element.inRange(event.x, event.y));
  }

  const previous = state.hovered;
  state.hovered = elements;

  const context = {state, event};
  dispatchMoveEvents(context, 'leave', previous, elements);
  dispatchMoveEvents(context, 'enter', elements, previous);
}

function dispatchMoveEvents({state, event}, hook, elements, checkElements) {
  if (elements.length > 0) {
    for (const element of elements) {
      if (checkElements.indexOf(element) < 0) {
        dispatchEvent(element.options[hook] || state.listeners[hook], element, event);
      }
    }
  }
}

function handleClickEvents(state, event, options) {
  const listeners = state.listeners;
  const elements = state.visibleElements.filter((element) => element.inRange(event.x, event.y));
  for (const element of elements) {
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
  callback(handler, [element.$context, event]);
}
