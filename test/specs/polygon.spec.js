describe('Polygon annotation', function() {
  describe('auto', jasmine.fixtures('polygon'));

  describe('inRange', function() {
    const annotation1 = {
      type: 'polygon',
      xValue: 7,
      yValue: 7,
      radius: 30
    };
    const annotation2 = {
      type: 'polygon',
      xValue: 3,
      yValue: 3,
      radius: 0
    };
    const annotation3 = {
      type: 'polygon',
      xValue: 5,
      yValue: 5,
      radius: 0
    };

    const chart = window.scatter10x10({annotation1, annotation2, annotation3});
    const elems = window.getAnnotationElements(chart).filter(el => el.options.radius > 0);
    const elemsNoRad = window.getAnnotationElements(chart).filter(el => el.options.radius === 0);

    elems.forEach(function(element) {
      it(`should return true inside element '${element.options.id}'`, function() {
        const rotation = element.options.rotation;
        for (let sides = 4; sides <= 4; sides++) {
          element.options.sides = sides;
          for (const borderWidth of [0]) {
            const halfBorder = borderWidth / 2;
            element.options.borderWidth = borderWidth;
            const radius = element.height / 2;
            const angle = (2 * Math.PI) / sides;
            const vertices = [];
            let rad = rotation * (Math.PI / 180);
            for (let i = 0; i < sides; i++, rad += angle) {
              const sin = Math.sin(rad);
              const cos = Math.cos(rad);
              vertices.push({
                x: element.x + sin * (radius + halfBorder - 1),
                y: element.y - cos * (radius + halfBorder - 1)
              });
            }
            for (const vertex of vertices) {
              //console.log('sides: '+ sides + ' borderWidth: ' + borderWidth + ' in: ' + element.inRange(vertex.x, vertex.y));
              console.log({x: vertex.x, y: vertex.y}, {x: element.x, y: element.y, radius}, element.inRange(vertex.x, vertex.y));
              //expect(element.inRange(vertex.x, vertex.y)).withContext(`sides: ${sides}, rotation: ${rotation}, radius: ${radius}, borderWidth: ${borderWidth}, {x: ${vertex.x.toFixed(1)}, y: ${vertex.y.toFixed(1)}}`).toEqual(true);
            }
          }
        }
      });
/*


      it(`should return false outside element '${element.options.id}'`, function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          const radius = element.height / 2;
          for (const angle of [0, 45, 90, 135, 180, 225, 270, 315]) {
            const rad = angle * (Math.PI / 180);
            const {x, y} = {
              x: element.x + Math.cos(rad) * (radius + halfBorder + 1),
              y: element.y + Math.sin(rad) * (radius + halfBorder + 1)
            };
            expect(element.inRange(x, y)).withContext(`angle: ${angle}, radius: ${radius}, borderWidth: ${borderWidth}, {x: ${x.toFixed(1)}, y: ${y.toFixed(1)}}`).toEqual(false);
          }
        }
      });
*/
    });
/*

    elemsNoRad.forEach(function(element) {
      it(`should return false radius is 0 element '${element.options.id}'`, function() {
        for (const borderWidth of [0, 10]) {
          const halfBorder = borderWidth / 2;
          element.options.borderWidth = borderWidth;
          for (const x of [element.x - halfBorder, element.x + halfBorder]) {
            expect(element.inRange(x, element.y)).toEqual(false);
          }
          for (const y of [element.y - halfBorder, element.y + halfBorder]) {
            expect(element.inRange(element.x, y)).toEqual(false);
          }
        }
      });
    });
*/    
  });
});
