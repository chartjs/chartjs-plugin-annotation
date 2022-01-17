import {isFinite, valueOrDefault, defined} from 'chart.js/helpers';

export function adjustScaleRange(chart, scale, annotations) {
  const range = getScaleLimits(scale, annotations);
  let changed = changeScaleLimit(scale, range, 'min', 'suggestedMin');
  changed = changeScaleLimit(scale, range, 'max', 'suggestedMax') || changed;
  if (changed && typeof scale.handleTickRangeOptions === 'function') {
    scale.handleTickRangeOptions();
  }
}

export function verifyScaleOptions(annotations, scales) {
  for (const annotation of annotations) {
    verifyScaleIDs(annotation, scales);
  }
}

function changeScaleLimit(scale, range, limit, suggestedLimit) {
  if (isFinite(range[limit]) && !scaleLimitDefined(scale.options, limit, suggestedLimit)) {
    const changed = scale[limit] !== range[limit];
    scale[limit] = range[limit];
    return changed;
  }
}

function scaleLimitDefined(scaleOptions, limit, suggestedLimit) {
  return defined(scaleOptions[limit]) || defined(scaleOptions[suggestedLimit]);
}

function verifyScaleIDs(annotation, scales) {
  for (const key of ['scaleID', 'xScaleID', 'yScaleID']) {
    if (annotation[key] && !scales[annotation[key]]) {
      console.warn(`No scale found with id '${annotation[key]}' for annotation '${annotation.id}'`);
    }
  }
}

function getScaleLimits(scale, annotations) {
  const axis = scale.axis;
  const scaleID = scale.id;
  const scaleIDOption = axis + 'ScaleID';
  const limits = {
    min: valueOrDefault(scale.min, Number.NEGATIVE_INFINITY),
    max: valueOrDefault(scale.max, Number.POSITIVE_INFINITY)
  };
  for (const annotation of annotations) {
    if (annotation.scaleID === scaleID) {
      updateLimits(annotation, scale, ['value', 'endValue'], limits);
    } else if (annotation[scaleIDOption] === scaleID) {
      updateLimits(annotation, scale, [axis + 'Min', axis + 'Max', axis + 'Value'], limits);
    }
  }
  return limits;
}

function updateLimits(annotation, scale, props, limits) {
  for (const prop of props) {
    const raw = annotation[prop];
    if (defined(raw)) {
      const value = scale.parse(raw);
      limits.min = Math.min(limits.min, value);
      limits.max = Math.max(limits.max, value);
    }
  }
}
