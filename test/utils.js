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
    r: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 1]
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
    r: {
      intersect: {
        true: [1, 1, 1, 1, 0, 0],
        false: [1, 1, 1, 1, 1, 1]
      }
    }
  }
}];
