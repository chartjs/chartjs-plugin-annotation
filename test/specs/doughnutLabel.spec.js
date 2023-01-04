describe('Doughnut label annotation', function() {
  describe('auto', jasmine.fixtures('doughnutLabel'));

  const rotated = window.helpers.rotated;

  describe('inRange', function() {
    for (const rotation of [0, 45, 90, 135, 180, 225, 270, 315]) {
      const annotation = {
        type: 'doughnutLabel',
        content: ['This is', 'my text'],
        position: 'center',
        rotation
      };

      const chart = window.acquireChart({
        type: 'doughnut',
        data: {
          labels: ['Data1', 'Data2', 'Data3', 'Data4'],
          datasets: [{
            data: [102, 200, 80, -55],
          }],
        },
        options: {
          animation: false,
          plugins: {
            legend: false,
            annotation: {
              annotations: {
                test: annotation
              }
            }
          }
        }
      });
      const element = window.getAnnotationElements(chart)[0];
      const center = element.getCenterPoint();

      it('should return true inside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          for (const x of [element.x - halfBorder, element.x + element.width / 2, element.x2 + halfBorder]) {
            for (const y of [element.y - halfBorder, element.y + element.height / 2, element.y2 + halfBorder]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(true);
            }
          }
        }
      });

      it('should return false outside element', function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;

          for (const x of [element.x - halfBorder - 1, element.x2 + halfBorder + 1]) {
            for (const y of [element.y, element.y + element.height / 2, element.y2]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
          for (const x of [element.x, element.x + element.width / 2, element.x2]) {
            for (const y of [element.y - halfBorder - 1, element.y2 + halfBorder + 1]) {
              const point = rotated({x, y}, center, rotation / 180 * Math.PI);
              expect(element.inRange(point.x, point.y)).toEqual(false);
            }
          }
        }
      });
    }
  });
});
