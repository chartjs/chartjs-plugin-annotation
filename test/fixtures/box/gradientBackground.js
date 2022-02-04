function translateBox(box) {
  const {width, height} = box;
  return {
    x: -width / 2,
    y: -height / 2,
    x2: width / 2,
    y2: height / 2,
    width,
    height
  };
}

function gradient({chart: {ctx}, element}) {
  // due to rotation
  const {x, x2, y, y2} = translateBox(element);
  const g = ctx.createLinearGradient(x, y, x2, y2);
  g.addColorStop(0, 'red');
  g.addColorStop(1, 'black');
  return g;
}

module.exports = {
  config: {
    type: 'bar',
    options: {
      scales: {
        x: {
          display: false,
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        },
        y: {
          display: false,
          min: 0,
          max: 25
        }
      },
      plugins: {
        annotation: {
          annotations: {
            box1: {
              type: 'box',
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              backgroundColor: gradient,
              borderColor: 'rgb(33, 101, 171)',
              borderRadius: {topLeft: 16, topRight: 8, bottomRight: 4},
              borderWidth: 5,
            },
            box2: {
              type: 'box',
              xMin: 'July',
              xMax: 'May',
              yMin: 11,
              yMax: 15,
              backgroundColor: gradient,
              borderWidth: 0,
              borderRadius: Infinity,
            },
            box3: {
              type: 'box',
              xMin: 0,
              xMax: 'May',
              yMin: 20,
              yMax: 16,
              backgroundColor: gradient,
              borderColor: 'rgb(171, 101, 33)',
              borderRadius: 4,
              borderWidth: 5,
            }
          }
        }
      }
    }
  }
};
