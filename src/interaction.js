import {distanceBetweenPoints} from 'chart.js/helpers';

const interaction = {
  modes: {
    /**
     * Point mode returns all elements that hit test based on the event position
     * @param {Object} state - the state of the plugin
     * @param {ChartEvent} event - the event we are find things at
     * @return {Element[]} - elements that are found
     */
    point(state, event) {
      return getIntersectItems(state, event);
    },

    /**
     * Nearest mode returns the element closest to the event position
     * @param {Object} state - the state of the plugin
     * @param {ChartEvent} event - the event we are find things at
     * @param {options} options - interaction options to use
     * @return {Element[]} - elements that are found (only 1 element)
     */
    nearest(state, event, options) {
      return getNearestItem(state, event, options);
    },
  }
};

/**
 * Returns all elements that hit test based on the event position
 * @param {Object} state - the state of the plugin
 * @param {ChartEvent} event - the event we are find things at
 * @param {options} options - interaction options to use
 * @return {Element[]} - elements that are found
 */
export function getElements(state, event, options) {
  const mode = interaction.modes[options.mode] || interaction.modes.nearest;
  return mode(state, event, options);
}

function getIntersectItems(state, event) {
  return state.visibleElements.filter((element) => element.inRange(event.x, event.y, true));
}

function inRangeByAxis(element, event, axis) {
  if (axis === 'x') {
    return element.inXRange(event.x, event.y, true);
  } else if (axis === 'y') {
    return element.inYRange(event.x, event.y, true);
  }
  return element.inXRange(event.x, event.y, true) || element.inYRange(event.x, event.y, true);
}

function getPointByAxis(event, center, axis) {
  if (axis === 'x') {
    return {x: event.x, y: center.y};
  } else if (axis === 'y') {
    return {x: center.x, y: event.y};
  }
  return center;
}

function getNearestItem(state, event, options) {
  const axis = options.axis || 'xy';
  let minDistance = Number.POSITIVE_INFINITY;

  return state.visibleElements
    .filter((element) => options.intersect ? element.inRange(event.x, event.y, true) : inRangeByAxis(element, event, axis))
    .reduce((nearestItems, element) => {
      const center = element.getCenterPoint();
      const evenPoint = getPointByAxis(event, center, axis);
      const distance = distanceBetweenPoints(event, evenPoint);
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
    .slice(0, 1); // return only the top item;
}
