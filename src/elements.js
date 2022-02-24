import {Animations} from 'chart.js';
import {isObject, defined} from 'chart.js/helpers';
import {hooks} from './events';
import {annotationTypes, subElementTypes} from './types';

const directUpdater = {
  update: Object.assign
};
const allTypes = Object.assign({}, annotationTypes, subElementTypes);

/**
 * Resolve the annotation type, checking if is supported.
 * @param {string} [type=line] - annotation type
 * @param {Object} [typesMap=annotationTypes] - map of annotation types to be checked
 * @returns {string} resolved annotation type
 */
export function resolveType(type = 'line', typesMap = annotationTypes) {
  if (typesMap[type]) {
    return type;
  }
  console.warn(`Unknown annotation type: '${type}', defaulting to 'line'`);
  return 'line';
}

/**
 * Create or update all annotation elements, configured to the plugin.
 * @param {Chart} chart - the chart where the plugin is enabled
 * @param {Object} state - the state of the plugin
 * @param {Object} options - annotation options to use
 * @param {UpdateMode} mode - The update mode
 */
export function updateElements(chart, state, options, mode) {
  const animations = resolveAnimations(chart, options.animations, mode);

  const annotations = state.annotations;
  const elements = resyncElements(state.elements, annotations);

  for (let i = 0; i < annotations.length; i++) {
    const annotationOptions = annotations[i];
    const element = getOrCreateElement({elements, index: i}, annotationOptions.type, annotationTypes);
    const resolver = annotationOptions.setContext(getContext(chart, element, annotationOptions));
    const properties = element.resolveElementProperties(chart, resolver);

    properties.skip = toSkip(properties);

    if ('elements' in properties) {
      updateSubElements(element, properties, resolver, animations);
      // Remove the sub-element definitions from properties, so the actual elements
      // are not overwritten by their definitions
      delete properties.elements;
    }

    if (!defined(element.x)) {
      // If the element is newly created, assing the properties directly - to
      // make them readily awailable to any scriptable options. If we do not do this,
      // the properties retruned by `resolveElementProperties` are available only
      // after options resolution.
      Object.assign(element, properties);
    }

    properties.options = resolveAnnotationOptions(resolver, annotationTypes);

    animations.update(element, properties);
  }
}

function toSkip(properties) {
  return isNaN(properties.x) || isNaN(properties.y);
}

function resolveAnimations(chart, animOpts, mode) {
  if (mode === 'reset' || mode === 'none' || mode === 'resize') {
    return directUpdater;
  }
  return new Animations(chart, animOpts);
}

function updateSubElements(mainElement, {elements, initProperties}, resolver, animations) {
  const subElements = mainElement.elements || (mainElement.elements = []);
  subElements.length = elements.length;
  for (let i = 0; i < elements.length; i++) {
    const definition = elements[i];
    const properties = definition.properties;
    const subElement = getOrCreateElement({elements: subElements, index: i}, definition.type, allTypes, initProperties);
    const subResolver = resolver[definition.optionScope].override(definition);
    properties.options = resolveAnnotationOptions(subResolver, allTypes);
    properties.mainElement = mainElement;
    animations.update(subElement, properties);
  }
}

function getOrCreateElement({elements, index}, type, typesMap, initProperties) {
  const elementClass = typesMap[resolveType(type, typesMap)];
  let element = elements[index];
  if (!element || !(element instanceof elementClass)) {
    element = elements[index] = new elementClass();
    if (isObject(initProperties)) {
      Object.assign(element, initProperties);
    }
  }
  return element;
}

function resolveAnnotationOptions(resolver, typesMap) {
  const elementClass = typesMap[resolveType(resolver.type, typesMap)];
  const result = {};
  result.id = resolver.id;
  result.type = resolver.type;
  result.drawTime = resolver.drawTime;
  Object.assign(result,
    resolveObj(resolver, elementClass.defaults),
    resolveObj(resolver, elementClass.defaultRoutes || {}));
  for (const hook of hooks) {
    result[hook] = resolver[hook];
  }
  return result;
}

function resolveObj(resolver, defs) {
  const result = {};
  for (const prop of Object.keys(defs)) {
    const optDefs = defs[prop];
    const value = resolver[prop];
    result[prop] = isObject(optDefs) ? resolveObj(value, optDefs) : value;
  }
  return result;
}

function getContext(chart, element, annotation) {
  return element.$context || (element.$context = Object.assign(Object.create(chart.getContext()), {
    element,
    id: annotation.id,
    type: 'annotation'
  }));
}

function resyncElements(elements, annotations) {
  const count = annotations.length;
  const start = elements.length;

  if (start < count) {
    const add = count - start;
    elements.splice(start, 0, ...new Array(add));
  } else if (start > count) {
    elements.splice(count, start - count);
  }
  return elements;
}
