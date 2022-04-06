import {defined, callback} from 'chart.js/helpers';
import {getElements} from './interaction';

const clickHooks = ['click'];
const moveHooks = ['enter', 'leave'];
export const hooks = clickHooks.concat(moveHooks);

export function updateListeners(chart, state, options) {
  state.listened = false;
  state.moveListened = false;
  state._getElements = getElements; // for testing

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
      handleMoveEvents(state, event, options);
      break;
    case 'click':
      handleClickEvents(state, event, options);
      break;
    default:
    }
  }
}

function handleMoveEvents(state, event, options) {
  if (!state.moveListened) {
    return;
  }

  let elements;

  if (event.type === 'mousemove') {
    elements = getElements(state, event, options.interaction);
  } else {
    elements = [];
  }

  const previous = state.hovered;
  state.hovered = elements;

  const context = {state, event};
  dispatchMoveEvents(context, 'leave', previous, elements);
  dispatchMoveEvents(context, 'enter', elements, previous);
}

function dispatchMoveEvents({state, event}, hook, elements, checkElements) {
  for (const element of elements) {
    if (checkElements.indexOf(element) < 0) {
      dispatchEvent(element.options[hook] || state.listeners[hook], element, event);
    }
  }
}

function handleClickEvents(state, event, options) {
  const listeners = state.listeners;
  const elements = getElements(state, event, options.interaction);
  for (const element of elements) {
    dispatchEvent(element.options.click || listeners.click, element, event);
  }
}

function dispatchEvent(handler, element, event) {
  callback(handler, [element.$context, event]);
}
