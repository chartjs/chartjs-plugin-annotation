import {isFinite, valueOrDefault} from 'chart.js/helpers';

export function adjustScaleRange(chart, scale, annotations) {
  const range = getScaleLimits(scale, annotations);
  let changed = false;
  if (isFinite(range.min) &&
		typeof scale.options.min === 'undefined' &&
		typeof scale.options.suggestedMin === 'undefined') {
    changed = scale.min !== range.min;
    scale.min = range.min;
  }
  if (isFinite(range.max) &&
		typeof scale.options.max === 'undefined' &&
		typeof scale.options.suggestedMax === 'undefined') {
    changed = scale.max !== range.max;
    scale.max = range.max;
  }
  if (changed && typeof scale.handleTickRangeOptions === 'function') {
    scale.handleTickRangeOptions();
  }
}

export function verifyScaleOptions(annotations, scales) {
  for (const annotation of annotations) {
    for (const key of ['scaleID', 'xScaleID', 'yScaleID']) {
      if (annotation[key] && !scales[annotation[key]]) {
        console.warn(`No scale found with id '${annotation[key]}' for annotation '${annotation.id}'`);
      }
    }
  }
}

function getScaleLimits(scale, annotations) {
  const axis = scale.axis;
  const scaleID = scale.id;
  const scaleIDOption = axis + 'ScaleID';
  let min = valueOrDefault(scale.min, Number.NEGATIVE_INFINITY);
  let max = valueOrDefault(scale.max, Number.POSITIVE_INFINITY);
  for (const annotation of annotations) {
    if (annotation.scaleID === scaleID) {
      for (const prop of ['value', 'endValue']) {
        const raw = annotation[prop];
        if (raw) {
          const value = scale.parse(raw);
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
    } else if (annotation[scaleIDOption] === scaleID) {
      for (const prop of [axis + 'Min', axis + 'Max', axis + 'Value']) {
        const raw = annotation[prop];
        if (raw) {
          const value = scale.parse(raw);
          min = Math.min(min, value);
          max = Math.max(max, value);
        }
      }
    }
  }
  return {min, max};
}
