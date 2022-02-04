function gradient({chart: {ctx}, element}) {
  const g = ctx.createLinearGradient(element.x, element.y, element.x2, element.y2);
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
            ellipse1: {
              type: 'ellipse',
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              backgroundColor: gradient,
              borderColor: 'rgb(33, 101, 171)',
              borderWidth: 5
            },
            ellipse2: {
              type: 'ellipse',
              xMin: 'July',
              xMax: 'May',
              yMin: 11,
              yMax: 15,
              backgroundColor: gradient,
              borderWidth: 0
            },
            ellipse3: {
              type: 'ellipse',
              xMin: 0,
              xMax: 'May',
              yMin: 20,
              yMax: 16,
              backgroundColor: gradient,
              borderColor: 'rgb(171, 101, 33)',
              borderWidth: 5
            }
          }
        }
      }
    }
  }
};
