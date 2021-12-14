export const clamp = (x, from, to) => Math.min(to, Math.max(from, x));

export function clampAll(obj, from, to) {
  for (const key of Object.keys(obj)) {
    obj[key] = clamp(obj[key], from, to);
  }
  return obj;
}

export function inPointRange(point, center, radius) {
  if (!point || !center || radius <= 0) {
    return false;
  }
  return (Math.pow(point.x - center.x, 2) + Math.pow(point.y - center.y, 2)) <= Math.pow(radius, 2);
}

export function inBoxRange(mouseX, mouseY, {x, y, width, height}) {
  return mouseX >= x &&
         mouseX <= x + width &&
         mouseY >= y &&
         mouseY <= y + height;
}

export function getElementCenterPoint(element, useFinalPosition) {
  const {x, y} = element.getProps(['x', 'y'], useFinalPosition);
  return {x, y};
}

export function requireVersion(min, ver) {
  const parts = ver.split('.');
  let i = 0;
  for (const req of min.split('.')) {
    const act = parts[i++];
    if (parseInt(req, 10) < parseInt(act, 10)) {
      break;
    }
    if (req > act || (act.length > req.length && act.substr(0, req.length) === req)) {
      throw new Error(`Chart.js v${ver} is not supported. v${min} or newer is required.`);
    }
  }
}
