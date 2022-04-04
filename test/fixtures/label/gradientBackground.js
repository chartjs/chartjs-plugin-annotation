function gradient({chart: {ctx}, element}) {
  const g = ctx.createLinearGradient(element.x, element.y, element.x + element.width, element.y + element.height);
  g.addColorStop(0, 'red');
  g.addColorStop(1, 'black');
  return g;
}

module.exports = {
  tolerance: 0.0060,
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
            label1: {
              type: 'label',
              xMin: 1.5,
              xMax: 3.5,
              yMin: 5,
              yMax: 10,
              content: 'Label on gradient',
              color: 'white',
              backgroundColor: gradient,
            },
            label2: {
              type: 'label',
              xMin: 'July',
              xMax: 'May',
              yMin: 11,
              yMax: 15,
              content: 'Label on gradient',
              color: 'white',
              backgroundColor: gradient
            },
            label3: {
              type: 'label',
              xMin: 0,
              xMax: 'May',
              yMin: 20,
              yMax: 16,
              content: 'Label on gradient',
              color: 'white',
              backgroundColor: gradient
            }
          }
        }
      }
    }
  }
};
