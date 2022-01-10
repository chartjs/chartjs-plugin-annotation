export const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

export function clampAll(obj, from, to) {
  for (const key of Object.keys(obj)) {
    obj[key] = clamp(obj[key], from, to);
  }
  return obj;
}

export function inPointRange(point, center, radius, borderWidth) {
  if (!point || !center || radius <= 0) {
    return false;
  }
  const hBorderWidth = borderWidth / 2 || 0;
  return (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius + hBorderWidth, 2);
}

export function inBoxRange(mouseX, mouseY, {x, y, width, height}, borderWidth) {
  const hBorderWidth = borderWidth / 2 || 0;
  return mouseX >= x - hBorderWidth &&
         mouseX <= x + width + hBorderWidth &&
         mouseY >= y - hBorderWidth &&
         mouseY <= y + height + hBorderWidth;
}

export function getElementCenterPoint(element, useFinalPosition) {
  const {x, y} = element.getProps(['x', 'y'], useFinalPosition);
  return {x, y};
}
