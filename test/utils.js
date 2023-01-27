export function getQuadraticXY(t, sx, sy, cp1x, cp1y, ex, ey) {
  return {
    x: (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cp1x + t * t * ex,
    y: (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cp1y + t * t * ey
  };
}

export function getQuadraticAngle(t, sx, sy, cp1x, cp1y, ex, ey) {
  var dx = 2 * (1 - t) * (cp1x - sx) + 2 * t * (ex - cp1x);
  var dy = 2 * (1 - t) * (cp1y - sy) + 2 * t * (ey - cp1y);
  return -Math.atan2(dx, dy) + 0.5 * Math.PI;
}

export function createCanvas() {
  const canvas = document.createElement('canvas');
  canvas.width = 230;
  canvas.height = 210;
  const ctx = canvas.getContext('2d');
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 90, 150, 110);
  ctx.fillRect(95, 140, 40, 60);
  ctx.beginPath();
  ctx.moveTo(15, 90);
  ctx.lineTo(115, 10);
  ctx.lineTo(215, 90);
  ctx.closePath();
  ctx.stroke();
  return canvas;
}

// https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
export function drawStar(ctx, x, y, radius, spikes, inset) {
  ctx.save();
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - radius);
  for (let i = 0; i < spikes; i++) {
    ctx.rotate(Math.PI / spikes);
    ctx.lineTo(0, 0 - (radius * inset));
    ctx.rotate(Math.PI / spikes);
    ctx.lineTo(0, 0 - radius);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function getAnnotationElements(chart) {
  return window['chartjs-plugin-annotation']._getState(chart).elements;
}

export function scatterChart(xMax, yMax, annotations) {
  return window.acquireChart({
    type: 'scatter',
    options: {
      animation: false,
      scales: {
        x: {
          display: false,
          min: 0,
          max: xMax
        },
        y: {
          display: false,
          min: 0,
          max: yMax
        }
      },
      plugins: {
        legend: false,
        annotation: {
          annotations
        }
      }
    }
  });
}

function keepInf(key, value) {
  return value === Infinity ? 'Infinity' : value;
}

export function stringifyObject(obj) {
  return JSON.stringify(obj, keepInf).replaceAll('"', '').replaceAll(':', ': ').replaceAll(',', ', ');
}

export const interactionData = [{
  mode: 'point',
  axes: {
    xy: {
      intersect: {
        true: [1, 2, 2, 1, 0, 0],
        false: [1, 2, 2, 1, 0, 0]
      }
    },
    x: {
      intersect: {
        true: [1, 2, 2, 1, 0, 0],
        false: [1, 2, 2, 1, 0, 0]
      }
    },
    y: {
      intersect: {
        true: [1, 2, 2, 1, 0, 0],
        false: [1, 2, 2, 1, 0, 0]
      }
    },
    r: { // not supported, use xy
      intersect: {
        true: [1, 2, 2, 1, 0, 0],
        false: [1, 2, 2, 1, 0, 0]
      }
    }
  },
}, {
  mode: 'nearest',
  axes: {
    xy: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 1]
      }
    },
    x: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 0, 1]
      }
    },
    y: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 0]
      }
    },
    r: { // not supported, use xy
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 1]
      }
    }
  }
}, {
  mode: 'x',
  axes: {
    x: {
      intersect: {
        true: [1, 2, 2, 1, 0, 0],
        false: [1, 2, 2, 1, 0, 1]
      }
    }
  }
}, {
  mode: 'y',
  axes: {
    y: {
      intersect: {
        true: [1, 2, 2, 1, 0, 0],
        false: [2, 2, 2, 2, 2, 0]
      }
    }
  }
}, {
  mode: 'dataset', // not supported, use nearest
  axes: {
    xy: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 1]
      }
    },
    x: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 0, 1]
      }
    },
    y: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 0]
      }
    },
    r: { // not supported, use xy
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 1]
      }
    }
  }
}];
