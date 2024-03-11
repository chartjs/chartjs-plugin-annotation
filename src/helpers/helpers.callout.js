import {setBorderStyle} from './helpers.canvas';
import {rotated} from './helpers.geometric';
import {getSize} from './helpers.options';
import {toRadians, distanceBetweenPoints} from 'chart.js/helpers';

const positions = ['left', 'bottom', 'top', 'right'];

/**
 * @typedef { import('../../types/element').AnnotationElement } AnnotationElement
 */

/**
 * Drawa the callout component for labels.
 * @param {CanvasRenderingContext2D} ctx - chart canvas context
 * @param {AnnotationElement} element - the label element
 */
export function drawCallout(ctx, element) {
  const {pointX, pointY, options} = element;
  const callout = options.callout;
  const calloutPosition = callout && callout.display && resolveCalloutPosition(element, callout);
  if (!calloutPosition || isPointInRange(element, callout, calloutPosition)) {
    return;
  }

  ctx.save();
  ctx.beginPath();
  const stroke = setBorderStyle(ctx, callout);
  if (!stroke) {
    return ctx.restore();
  }
  const {separatorStart, separatorEnd} = getCalloutSeparatorCoord(element, calloutPosition);
  const {sideStart, sideEnd} = getCalloutSideCoord(element, calloutPosition, separatorStart);
  if (callout.margin > 0 || options.borderWidth === 0) {
    ctx.moveTo(separatorStart.x, separatorStart.y);
    ctx.lineTo(separatorEnd.x, separatorEnd.y);
  }
  ctx.moveTo(sideStart.x, sideStart.y);
  ctx.lineTo(sideEnd.x, sideEnd.y);
  const rotatedPoint = rotated({x: pointX, y: pointY}, element.getCenterPoint(), toRadians(-element.rotation));
  ctx.lineTo(rotatedPoint.x, rotatedPoint.y);
  ctx.stroke();
  ctx.restore();
}

function getCalloutSeparatorCoord(element, position) {
  const {x, y, x2, y2} = element;
  const adjust = getCalloutSeparatorAdjust(element, position);
  let separatorStart, separatorEnd;
  if (position === 'left' || position === 'right') {
    separatorStart = {x: x + adjust, y};
    separatorEnd = {x: separatorStart.x, y: y2};
  } else {
    //  position 'top' or 'bottom'
    separatorStart = {x, y: y + adjust};
    separatorEnd = {x: x2, y: separatorStart.y};
  }
  return {separatorStart, separatorEnd};
}

function getCalloutSeparatorAdjust(element, position) {
  const {width, height, options} = element;
  const adjust = options.callout.margin + options.borderWidth / 2;
  if (position === 'right') {
    return width + adjust;
  } else if (position === 'bottom') {
    return height + adjust;
  }
  return -adjust;
}

function getCalloutSideCoord(element, position, separatorStart) {
  const {y, width, height, options} = element;
  const start = options.callout.start;
  const side = getCalloutSideAdjust(position, options.callout);
  let sideStart, sideEnd;
  if (position === 'left' || position === 'right') {
    sideStart = {x: separatorStart.x, y: y + getSize(height, start)};
    sideEnd = {x: sideStart.x + side, y: sideStart.y};
  } else {
    //  position 'top' or 'bottom'
    sideStart = {x: separatorStart.x + getSize(width, start), y: separatorStart.y};
    sideEnd = {x: sideStart.x, y: sideStart.y + side};
  }
  return {sideStart, sideEnd};
}

function getCalloutSideAdjust(position, options) {
  const side = options.side;
  if (position === 'left' || position === 'top') {
    return -side;
  }
  return side;
}

function resolveCalloutPosition(element, options) {
  const position = options.position;
  if (positions.includes(position)) {
    return position;
  }
  return resolveCalloutAutoPosition(element, options);
}

function resolveCalloutAutoPosition(element, options) {
  const {x, y, x2, y2, width, height, pointX, pointY, centerX, centerY, rotation} = element;
  const center = {x: centerX, y: centerY};
  const start = options.start;
  const xAdjust = getSize(width, start);
  const yAdjust = getSize(height, start);
  const xPoints = [x, x + xAdjust, x + xAdjust, x2];
  const yPoints = [y + yAdjust, y2, y, y2];
  const result = [];
  for (let index = 0; index < 4; index++) {
    const rotatedPoint = rotated({x: xPoints[index], y: yPoints[index]}, center, toRadians(rotation));
    result.push({
      position: positions[index],
      distance: distanceBetweenPoints(rotatedPoint, {x: pointX, y: pointY})
    });
  }
  return result.sort((a, b) => a.distance - b.distance)[0].position;
}

function isPointInRange(element, callout, position) {
  const {pointX, pointY} = element;
  const margin = callout.margin;
  let x = pointX;
  let y = pointY;
  if (position === 'left') {
    x += margin;
  } else if (position === 'right') {
    x -= margin;
  } else if (position === 'top') {
    y += margin;
  } else if (position === 'bottom') {
    y -= margin;
  }
  return element.inRange(x, y);
}
