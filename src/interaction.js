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
      return state.visibleElements.filter((element) => element.inRange(event.x, event.y));
    },

    /**
     * Nearest mode returns the element closest to the event position
     * @param {Object} state - the state of the plugin
     * @param {ChartEvent} event - the event we are find things at
     * @param {Object} options - interaction options to use
     * @return {Element[]} - elements that are found (only 1 element)
     */
    nearest(state, event, options) {
      return getNearestItem(state, event, options);
    },
    /**
     * x mode returns the elements that hit-test at the current x coordinate
     * @param {Object} state - the state of the plugin
     * @param {ChartEvent} event - the event we are find things at
     * @param {Object} options - interaction options to use
     * @return {Element[]} - elements that are found
     */
    x(state, event, options) {
      return state.visibleElements.filter((element) => options.intersect ? element.inRange(event.x, event.y) : inRangeByAxis(element, event, 'x'));
    },

    /**
     * y mode returns the elements that hit-test at the current y coordinate
     * @param {Object} state - the state of the plugin
     * @param {ChartEvent} event - the event we are find things at
     * @param {Object} options - interaction options to use
     * @return {Element[]} - elements that are found
     */
    y(state, event, options) {
      return state.visibleElements.filter((element) => options.intersect ? element.inRange(event.x, event.y) : inRangeByAxis(element, event, 'y'));
    }
  }
};

/**
 * Returns all elements that hit test based on the event position
 * @param {Object} state - the state of the plugin
 * @param {ChartEvent} event - the event we are find things at
 * @param {Object} options - interaction options to use
 * @return {Element[]} - elements that are found
 */
export function getElements(state, event, options) {
  const mode = interaction.modes[options.mode] || interaction.modes.nearest;
  return mode(state, event, options);
}

function inRangeByAxis(element, event, axis) {
  if (axis !== 'x' && axis !== 'y') {
    return element.inRange(event.x, event.y, 'x', true) || element.inRange(event.x, event.y, 'y', true);
  }
  return element.inRange(event.x, event.y, axis, true);
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
  let minDistance = Number.POSITIVE_INFINITY;

  return state.visibleElements
    .filter((element) => options.intersect ? element.inRange(event.x, event.y) : inRangeByAxis(element, event, options.axis))
    .reduce((nearestItems, element) => {
      const center = element.getCenterPoint();
      const evenPoint = getPointByAxis(event, center, options.axis);
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
