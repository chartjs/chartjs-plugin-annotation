module.exports = {
  tolerance: 0.0085,
  config: {
    type: 'scatter',
    plugins: [{
      id: 'myplugin',
      afterAnnotationDraw(chart, args) {
        const element = args.element;
        window.drawStar(chart.ctx, element.x + 10, element.y + 10, 10, 5, 3);
      }
    }],
    options: {
      scales: {
        x: {
          display: true,
          min: -10,
          max: 10
        },
        y: {
          display: true,
          min: -10,
          max: 10
        }
      },
      plugins: {
        legend: false,
        annotation: {
          drawTime: 'afterDraw',
          annotations: {
            ellipse1: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: 7,
              xMax: -2,
              yMax: 3,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2
            },
            ellipse2: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: 7,
              xMax: 9,
              yMax: 3,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2
            },
            ellipse3: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: -9,
              yMin: -7,
              xMax: -1,
              yMax: -3,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2,
              rotation: 45
            },
            ellipse4: {
              type: 'ellipse',
              xScaleID: 'x',
              yScaleID: 'y',
              xMin: 1,
              yMin: -1,
              xMax: 9,
              yMax: -9,
              backgroundColor: 'white',
              borderColor: 'red',
              borderWidth: 2
            }
          }
        }
      }
    }
  },
  options: {
    spriteText: true
  }
};
